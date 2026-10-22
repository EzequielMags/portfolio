import { skillGroups, softSkills } from '../content/skills';
import { Copy } from './Copy';
import styles from './Skills.module.css';

export function Skills() {
  return (
    <section id="competencias" className={`section ${styles.skills}`} aria-labelledby="competencias-title">
      <div className="container section-inner">
        <h2 id="competencias-title" className="section-title">
          Competências
        </h2>
        <div className={styles.groups}>
          {skillGroups.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <p className={styles.items}>{group.items.join(', ')}</p>
              <Copy text={group.usedIn} className={`muted ${styles.usedIn}`} />
            </div>
          ))}
        </div>
        <div className={styles.soft}>
          <h3 className={styles.groupTitle}>Como eu trabalho</h3>
          <Copy text={softSkills} className={styles.softText} />
        </div>
      </div>
    </section>
  );
}
