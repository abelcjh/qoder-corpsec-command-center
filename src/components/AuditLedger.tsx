import type { AuditLedgerEntry } from '../types';
import { ScrollText } from 'lucide-react';

interface Props {
  entries: AuditLedgerEntry[];
}

export default function AuditLedger({ entries }: Props) {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <section className="card audit-ledger">
      <h2 className="card-title">
        <ScrollText size={18} /> Proof / Audit Ledger
      </h2>
      <div className="ledger-table">
        <div className="ledger-header">
          <span className="ledger-col col-time">Timestamp</span>
          <span className="ledger-col col-actor">Actor</span>
          <span className="ledger-col col-action">Action</span>
          <span className="ledger-col col-detail">Detail</span>
        </div>
        {sorted.map((entry, i) => (
          <div key={i} className="ledger-row">
            <span className="ledger-col col-time mono">
              {new Date(entry.timestamp).toLocaleString()}
            </span>
            <span className="ledger-col col-actor">{entry.actor}</span>
            <span className="ledger-col col-action">
              <span className={`action-tag tag-${entry.action.toLowerCase()}`}>{entry.action}</span>
            </span>
            <span className="ledger-col col-detail">{entry.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
