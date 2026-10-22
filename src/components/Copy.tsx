import type { ElementType } from 'react';

const PLACEHOLDER = /^\[.*\]$/;

export function isPlaceholder(text: string) {
  return PLACEHOLDER.test(text.trim());
}

interface CopyProps {
  text: string;
  as?: ElementType;
  className?: string;
}

// Renderiza um texto do conteúdo; se for um placeholder ("[...]"), aplica o destaque rosa.
export function Copy({ text, as: Tag = 'p', className }: CopyProps) {
  const classes = [className, isPlaceholder(text) ? 'placeholder' : undefined].filter(Boolean).join(' ');
  return <Tag className={classes || undefined}>{text}</Tag>;
}
