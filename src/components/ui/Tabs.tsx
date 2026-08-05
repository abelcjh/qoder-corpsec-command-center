import { cn } from '../../lib/utils';
import { ReactNode, useState, createContext, useContext } from 'react';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export function Tabs({ defaultValue, value, onValueChange, children }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;
  return (
    <TabsContext.Provider value={{ value: active, onChange: onValueChange ?? setInternal }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('inline-flex items-center gap-1 rounded-lg border border-brand-border bg-brand-card p-1', className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger must be inside Tabs');
  const active = ctx.value === value;
  return (
    <button
      onClick={() => ctx.onChange(value)}
      className={cn(
        'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        active ? 'bg-brand-surface text-brand-text' : 'text-brand-muted hover:text-brand-text'
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsContent must be inside Tabs');
  if (ctx.value !== value) return null;
  return <div className="animate-fade-in">{children}</div>;
}
