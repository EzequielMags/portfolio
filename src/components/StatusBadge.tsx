import styles from './StatusBadge.module.css';

export function StatusBadge({ label, className }: { label: string; className?: string }) {
  return <span className={[styles.badge, className].filter(Boolean).join(' ')}>{label}</span>;
}
