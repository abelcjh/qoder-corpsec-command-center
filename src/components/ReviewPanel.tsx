import type { ReviewSummary } from '../types';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  review: ReviewSummary;
}

export default function ReviewPanel({ review }: Props) {
  return (
    <section className="card review-panel">
      <h2 className="card-title">
        <ShieldCheck size={18} /> Human Secretary Review
      </h2>
      <div className="review-header">
        <div className="review-meta">
          <span className="review-label">Reviewer:</span>
          <span className="review-value">{review.reviewer}</span>
        </div>
        <div className="review-meta">
          <span className="review-label">Reviewed:</span>
          <span className="review-value">{new Date(review.reviewedAt).toLocaleDateString()}</span>
        </div>
        <div className="review-meta">
          <span className="review-label">Status:</span>
          {review.approved ? (
            <span className="review-status approved"><ShieldCheck size={14} /> Approved</span>
          ) : (
            <span className="review-status pending-review"><AlertCircle size={14} /> Pending Approval</span>
          )}
        </div>
      </div>

      <div className="review-findings">
        <h3>Findings</h3>
        <ul>
          {review.findings.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="review-notes">
        <h3>Notes</h3>
        <p>{review.notes}</p>
      </div>

      <div className="review-disclaimer">
        <p>This system provides operational workflow assistance only. It does not constitute legal advice. A qualified company secretary or professional must review and approve all compliance actions before lodgement.</p>
      </div>
    </section>
  );
}
