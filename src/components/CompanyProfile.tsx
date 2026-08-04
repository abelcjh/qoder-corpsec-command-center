import type { Company } from '../types';
import { Building2, MapPin, Users, FileText } from 'lucide-react';

interface Props {
  company: Company;
}

export default function CompanyProfile({ company }: Props) {
  return (
    <section className="card company-profile">
      <h2 className="card-title">
        <Building2 size={18} /> Company Profile
      </h2>
      <div className="profile-grid">
        <div className="profile-item">
          <span className="profile-label">Name</span>
          <span className="profile-value">{company.name}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Reg. No.</span>
          <span className="profile-value mono">{company.registrationNo}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">Incorporated</span>
          <span className="profile-value">{company.incorporationDate}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">SSM State</span>
          <span className="profile-value">{company.ssmState}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">FY End</span>
          <span className="profile-value">{company.financialYearEnd}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label">SIC Codes</span>
          <span className="profile-value mono">{company.sicCodes.join(', ')}</span>
        </div>
        <div className="profile-item full">
          <span className="profile-label"><MapPin size={14} /> Address</span>
          <span className="profile-value small">{company.registeredAddress}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label"><Users size={14} /> Directors</span>
          <span className="profile-value">{company.directors.join(', ')}</span>
        </div>
        <div className="profile-item">
          <span className="profile-label"><FileText size={14} /> Secretary</span>
          <span className="profile-value">{company.companySecretary}</span>
        </div>
      </div>
    </section>
  );
}
