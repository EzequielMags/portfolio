import { fullName, profile } from '../content/profile';
import styles from './Contact.module.css';

export function Contact() {
  const { contact } = profile;

  return (
    <section id="contato" className={`section ${styles.contact}`} aria-labelledby="contato-title">
      <div className="container section-inner">
        <h2 id="contato-title" className="section-title">
          Contato
        </h2>
        <p className={`muted ${styles.intro}`}>{contact.intro}</p>
        <ul className={styles.links}>
          <li>
            <a href={`mailto:${contact.email}`} className={styles.email}>
              {contact.email}
            </a>
          </li>
          <li>
            <a href={contact.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={contact.github}>GitHub</a>
          </li>
          {profile.resumeUrl && (
            <li>
              <a href={profile.resumeUrl} download>
                Currículo (PDF)
              </a>
            </li>
          )}
        </ul>
        <p className={`muted ${styles.footer}`}>
          © {new Date().getFullYear()} {fullName}
        </p>
      </div>
    </section>
  );
}
