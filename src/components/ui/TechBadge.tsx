interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return <span className="tech-chip">{name}</span>;
}

export function TechBadgeList({
  stack,
  max = 3,
}: {
  stack: string[];
  max?: number;
}) {
  const visible = stack.slice(0, max);
  const overflow = stack.length - max;

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((name) => (
        <TechBadge key={name} name={name} />
      ))}
      {overflow > 0 && (
        <span className="tech-chip" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-tertiary)", borderColor: "var(--surface-border)" }}>
          +{overflow}
        </span>
      )}
    </div>
  );
}
