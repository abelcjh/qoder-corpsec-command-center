import { useState } from 'react';
import type { StaffUser } from '../../types';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Select } from '../ui/Select';
import { Shield } from 'lucide-react';

export interface LoginScreenProps {
  staffUsers: StaffUser[];
  onLogin: (email: string) => void;
}

export function LoginScreen({ staffUsers, onLogin }: LoginScreenProps) {
  const [selected, setSelected] = useState(staffUsers[0]?.email ?? '');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = staffUsers.some((u) => u.email === selected && u.active);
    if (!ok) {
      setError(true);
      return;
    }
    setError(false);
    onLogin(selected);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-brand-bg to-ink-950">
      <Card className="w-full max-w-md shadow-glow">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-crimson-600">
            <Shield className="text-white" size={28} />
          </div>
          <CardTitle className="text-xl">CorpSec Command Center</CardTitle>
          <CardDescription>Malaysia-first corporate-secretarial compliance cockpit</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-text">Log in as staff</label>
              <Select value={selected} onChange={(e) => setSelected(e.target.value)}>
                {staffUsers.map((u) => (
                  <option key={u.id} value={u.email}>
                    {u.fullName} ({u.department}) {u.role === 'admin' ? '— Admin' : ''}
                  </option>
                ))}
              </Select>
            </div>
            {error && (
              <p className="text-sm text-crimson-400">Selected user is not active. Please choose another.</p>
            )}
            <Button type="submit" className="w-full" size="lg">
              Enter Command Center
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-brand-muted">
            Demo mode: no Supabase credentials required.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
