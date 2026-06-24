interface SectionLabelProps {
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function SectionLabel({ children, action }: SectionLabelProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#556677]">
        {children}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
