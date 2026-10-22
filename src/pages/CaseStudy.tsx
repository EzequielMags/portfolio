import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Copy } from '../components/Copy';
import { Header } from '../components/Header';
import { MessageDemo } from '../components/MessageDemo';
import { StatusBadge } from '../components/StatusBadge';
import { financerAiCase as project } from '../content/financerai';
import { fullName } from '../content/profile';
import styles from './CaseStudy.module.css';

export function CaseStudy() {
  useEffect(() => {
    document.title = `${project.name}, estudo de caso | ${fullName}`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header variant="page" />
      <main id="conteudo" className={`container ${styles.page}`}>
        <StatusBadge label={project.status} className="a-fade" />
        <h1 className={`${styles.title} a-up`} style={{ animationDelay: '100ms' }}>
          {project.name}
        </h1>
        <p className={`muted ${styles.lead} a-up`} style={{ animationDelay: '250ms' }}>
          {project.lead}
        </p>

        <dl className={styles.facts}>
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          <div>
            <dt>Código</dt>
            <dd>
              <a href={project.repoUrl}>GitHub</a>
            </dd>
          </div>
        </dl>

        <div className={styles.demo}>
          <MessageDemo trigger="load" layout="row" />
        </div>

        <section className={styles.block} aria-labelledby="problema">
          <h2 id="problema" className={styles.blockTitle}>
            O problema
          </h2>
          <p className={styles.blockText}>{project.problem}</p>
        </section>

        <section className={styles.block} aria-labelledby="como-funciona">
          <h2 id="como-funciona" className={styles.blockTitle}>
            Como funciona
          </h2>
          <ol className={`${styles.blockText} ${styles.steps}`}>
            {project.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.block} aria-labelledby="minha-parte">
          <h2 id="minha-parte" className={styles.blockTitle}>
            Minha parte
          </h2>
          <p className={styles.blockText}>{project.myPart}</p>
        </section>

        <section className={styles.block} aria-labelledby="onde-esta">
          <h2 id="onde-esta" className={styles.blockTitle}>
            Onde está hoje
          </h2>
          <div className={styles.blockText}>
            <p>{project.statusText}</p>
            <Copy text={project.statusDetail} className={styles.note} />
          </div>
        </section>

        <section className={styles.block} aria-labelledby="aprendi">
          <h2 id="aprendi" className={styles.blockTitle}>
            O que aprendi
          </h2>
          <Copy text={project.learnings} className={styles.blockText} />
        </section>

        <nav aria-label="Outros projetos" className={styles.next}>
          <Link to="/#projetos">Todos os projetos</Link>
          <a href={project.next.href}>{project.next.label}</a>
        </nav>
      </main>
    </>
  );
}
