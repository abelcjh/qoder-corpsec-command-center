import type { SendLog } from '../types';

export type ProofFreshness = 'current' | 'expiring' | 'stale';

export interface ReviewerProofPacket {
  packetId: string;
  freshness: ProofFreshness;
  statusLabel: string;
  ageDays: number;
  evidenceFields: string[];
  exportNote: string;
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
    exportNote: 'Reviewer-safe packet: deterministic ID is derived from non-secret proof fields; real client secrets and provider credentials are never included.',
  };
}

export function summarizeProofPackets(logs: SendLog[], now = new Date()) {
  const packets = logs.map((log) => buildProofPacket(log, now));
  return {
    current: packets.filter((p) => p.freshness === 'current').length,
    expiring: packets.filter((p) => p.freshness === 'expiring').length,
    stale: packets.filter((p) => p.freshness === 'stale').length,
    packets,
  };
}
