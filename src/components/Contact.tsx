import { useEffect, useState, type ReactNode } from 'react';
import { fullName, profile } from '../content/profile';
import styles from './Contact.module.css';

type CopyState = 'idle' | 'copied' | 'failed';

// Ícones em traço, herdando a cor do texto.
const ICONS: Record<string, ReactNode> = {
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  resume: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M12 12v6m-3-3 3 3 3-3" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

interface ContactCardProps {
  icon: keyof typeof ICONS;
  label: string;
  value: string;
  valueId?: string;
  href: string;
  download?: boolean;
  children?: ReactNode;
}

// O link cobre o cartão inteiro; ações extras (como copiar) ficam por cima dele.
function ContactCard({ icon, label, value, valueId, href, download, children }: ContactCardProps) {
  return (
    <li className={styles.card}>
      <Icon name={icon} />
      <div className={styles.cardText}>
        <a href={href} download={download} className={styles.cardLink}>
          {label}
        </a>
        <span id={valueId} className={styles.value}>
          {value}
        </span>
      </div>
      {children}
    </li>
  );
}

// Método antigo de cópia, para navegadores ou contextos sem a Clipboard API.
function copyWithSelection(text: string) {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand('copy');
  field.remove();
  return ok;
}

function selectText(element: Element | null) {
  if (!element) return;
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function CopyEmailButton({ email, valueId }: { email: string; valueId: string }) {
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timer = window.setTimeout(() => setState('idle'), 3000);
    return () => window.clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
      return;
    } catch {
      // segue para o método antigo
    }
    if (copyWithSelection(email)) {
      setState('copied');
      return;
    }
    // Sem acesso à área de transferência: deixa o e-mail selecionado para o Ctrl+C.
    selectText(document.getElementById(valueId));
    setState('failed');
  };

  const label = state === 'copied' ? 'Copiado' : state === 'failed' ? 'Use Ctrl+C' : 'Copiar';

  return (
    <>
      <button type="button" className={styles.copy} onClick={copy} aria-label={`Copiar o e-mail ${email}`}>
        {label}
      </button>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' && 'E-mail copiado.'}
        {state === 'failed' && 'Não foi possível copiar. O e-mail ficou selecionado; use Ctrl+C.'}
      </span>
    </>
  );
}

export function Contact() {
  const { contact } = profile;
  const linkedinHandle = contact.linkedin.replace(/^https?:\/\/(www\.)?/, '');
  const githubHandle = contact.github.replace(/^https?:\/\/(www\.)?/, '');

  return (
    <section id="contato" className={`section ${styles.contact}`} aria-labelledby="contato-title">
      <div className="container section-inner">
        <h2 id="contato-title" className="section-title">
          Contato
        </h2>
        <p className={`muted ${styles.intro}`}>{contact.intro}</p>
        <ul className={styles.cards}>
          <ContactCard
            icon="email"
            label="E-mail"
            value={contact.email}
            valueId="contato-email"
            href={`mailto:${contact.email}`}
          >
            <CopyEmailButton email={contact.email} valueId="contato-email" />
          </ContactCard>
          <ContactCard icon="linkedin" label="LinkedIn" value={linkedinHandle} href={contact.linkedin} />
          <ContactCard icon="github" label="GitHub" value={githubHandle} href={contact.github} />
          {profile.resumeUrl && (
            <ContactCard icon="resume" label="Currículo" value="Baixar em PDF" href={profile.resumeUrl} download />
          )}
        </ul>
        <p className={`muted ${styles.footer}`}>
          © {new Date().getFullYear()} {fullName}
        </p>
      </div>
    </section>
  );
}
