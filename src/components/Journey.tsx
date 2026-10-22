import { journey } from '../content/journey';
import { Copy } from './Copy';
import { StatusBadge } from './StatusBadge';
import styles from './Journey.module.css';

export function Journey() {
  return (
    <section id="trajetoria" className="section" aria-labelledby="trajetoria-title">
      <div className="container section-inner">
        <h2 id="trajetoria-title" className="section-title">
          Trajetória
        </h2>
        <ol className={styles.timeline}>
          {journey.map((item) => (
            <li key={item.title} className={styles.item}>
              <span className={item.current ? styles.dotCurrent : styles.dot} aria-hidden="true" />
              <p className={`muted ${styles.period}`}>{item.period}</p>
              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{item.title}</h3>
                  {item.status && <StatusBadge label={item.status} />}
                </div>
                <p className={styles.place}>{item.place}</p>
                {item.description && <Copy text={item.description} className={`muted ${styles.description}`} />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
