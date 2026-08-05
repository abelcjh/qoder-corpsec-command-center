import type { SendLog } from '../types';

export type ProofFreshness = 'current' | 'expiring' | 'stale';

export interface ReviewerProofPacket {
  packetId: string;
  freshness: ProofFreshness;
  statusLabel: string;
  ageDays: number;
  evidenceFields: string[];
  authorityControls: string[];
  exportNote: string;
  chainIndex?: number;
  previousPacketId?: string;
  chainHead?: string;
}

function fnv1a32(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

export function buildProofPacket(log: SendLog, now = new Date()): ReviewerProofPacket {
  const proofTime = new Date(log.sentAt ?? log.scheduledRunAt).getTime();
  const ageDays = Math.max(0, Math.floor((now.getTime() - proofTime) / 86_400_000));
  const cadenceHint: ProofFreshness = log.status === 'failed' ? 'stale' : ageDays > 45 ? 'stale' : ageDays > 21 ? 'expiring' : 'current';
  const canonical = [
    log.id,
    log.jobId,
    log.companyId,
    log.contactId ?? '',
    log.scheduledRunAt,
    log.sentAt ?? '',
    log.senderStaffId ?? '',
    log.senderEmail ?? '',
    log.recipient,
    log.channel,
    log.status,
    log.evidenceType,
    log.providerMessageId ?? '',
    log.messageSnapshot,
  ].join('|');

  return {
    packetId: `proof-${fnv1a32(canonical)}`,
    freshness: cadenceHint,
    statusLabel: cadenceHint === 'current' ? 'Current proof' : cadenceHint === 'expiring' ? 'Expiring proof' : 'Stale / needs review',
    ageDays,
    evidenceFields: [
      'company_id',
      'job_id',
      'scheduled_run_at',
      'sent_at',
      'sender',
      'recipient',
      'channel',
      'status',
      'evidence_type',
      'provider_message_id',
      'message_snapshot',
    ],
    authorityControls: [
      log.senderStaffId ? 'staff_identity_present' : 'staff_identity_pending',
      log.fixtureMarked ? 'fixture_safe_no_external_send' : 'live_send_requires_staff_review',
      log.status === 'failed' ? 'needs_human_review' : 'policy_allows_reviewer_export',
      'deterministic_rule_authority',
      'no_secret_payload_export',
    ],
    exportNote: 'Reviewer-safe packet: deterministic ID is derived from non-secret proof fields; real client secrets and provider credentials are never included.',
  };
}

function getProofTime(log: SendLog): string {
  return log.sentAt ?? log.scheduledRunAt;
}

export function buildProofPacketChain(logs: SendLog[], now = new Date()): ReviewerProofPacket[] {
  const sortedLogs = [...logs].sort((a, b) => {
    const byTime = getProofTime(a).localeCompare(getProofTime(b));
    return byTime === 0 ? a.id.localeCompare(b.id) : byTime;
  });

  let previousPacketId = 'GENESIS';
  let chainHead = 'proof-chain-genesis';

  return sortedLogs.map((log, index) => {
    const packet = buildProofPacket(log, now);
    chainHead = `chain-${fnv1a32([chainHead, previousPacketId, packet.packetId, index].join('|'))}`;
    const chainedPacket: ReviewerProofPacket = {
      ...packet,
      chainIndex: index + 1,
      previousPacketId,
      chainHead,
      exportNote:
        `${packet.exportNote} Packet chain links are deterministic reviewer checks over sorted proof rows, so missing or reordered rows produce a different chain head without exposing secrets.`,
    };
    previousPacketId = packet.packetId;
    return chainedPacket;
  });
}

export function summarizeProofPackets(logs: SendLog[], now = new Date()) {
  const packets = buildProofPacketChain(logs, now);
  return {
    current: packets.filter((p) => p.freshness === 'current').length,
    expiring: packets.filter((p) => p.freshness === 'expiring').length,
    stale: packets.filter((p) => p.freshness === 'stale').length,
    chainHead: packets.length > 0 ? packets[packets.length - 1].chainHead : 'proof-chain-empty',
    packets,
  };
}
