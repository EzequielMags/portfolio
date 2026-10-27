import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Copy } from '../components/Copy';
import { Header } from '../components/Header';
import { MessageDemo } from '../components/MessageDemo';
import { PipelineDemo } from '../components/PipelineDemo';
import { StatusBadge } from '../components/StatusBadge';
import { findCaseStudy, type CaseStudySection } from '../content/caseStudies';
import { fullName } from '../content/profile';
import { NotFound } from './NotFound';
import styles from './CaseStudy.module.css';

function SectionBody({ section }: { section: CaseStudySection }) {
  return (
    <div className={styles.blockText}>
      {section.paragraphs?.map((text) => <Copy key={text} text={text} className={styles.paragraph} />)}
      {section.list && (
        <ul className={styles.list}>
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.steps && (
        <ol className={styles.steps}>
          {section.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

export function CaseStudy() {
  const { slug } = useParams();
  const project = findCaseStudy(slug);

  useEffect(() => {
    if (!project) return;
    document.title = `${project.name}, estudo de caso | ${fullName}`;
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return <NotFound />;

  return (
    <>
      <Header variant="page" />
      <main id="conteudo" className={`container ${styles.page}`}>
        {project.status && <StatusBadge label={project.status} className="a-fade" />}
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
            <dd>{project.repoUrl ? <a href={project.repoUrl}>GitHub</a> : 'Repositório privado'}</dd>
          </div>
        </dl>

        <div className={styles.demo}>
          {project.visual === 'pipeline' ? <PipelineDemo /> : <MessageDemo layout="row" />}
        </div>

        {project.sections.map((section) => (
          <section key={section.id} className={styles.block} aria-labelledby={section.id}>
            <h2 id={section.id} className={styles.blockTitle}>
              {section.title}
            </h2>
            <SectionBody section={section} />
          </section>
        ))}

        <nav aria-label="Outros projetos" className={styles.next}>
          <Link to="/#projetos">Todos os projetos</Link>
          {project.next.internal ? (
            <Link to={project.next.href}>{project.next.label}</Link>
          ) : (
            <a href={project.next.href}>{project.next.label}</a>
          )}
        </nav>
      </main>
    </>
  );
}
