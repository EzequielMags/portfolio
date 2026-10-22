import { Link } from 'react-router-dom';
import { fullName } from '../content/profile';
import styles from './Header.module.css';

const SECTIONS = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'competencias', label: 'Competências' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'contato', label: 'Contato' },
];

interface HeaderProps {
  variant?: 'home' | 'page';
}

export function Header({ variant = 'home' }: HeaderProps) {
  return (
    <header className={`container ${styles.header}`}>
      <Link to="/" className={styles.brand}>
        {fullName}
      </Link>
      {variant === 'home' ? (
        <nav aria-label="Seções">
          <ul className={styles.nav}>
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a className={styles.navLink} href={`#${section.id}`}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <Link to="/#projetos" className={styles.navLink}>
          Voltar para projetos
        </Link>
      )}
    </header>
  );
}
