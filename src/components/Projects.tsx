import { Link } from 'react-router-dom';
import { allReposUrl, projects, type Project } from '../content/projects';
import { MessageDemo } from './MessageDemo';
import { StatusBadge } from './StatusBadge';
import styles from './Projects.module.css';

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className={styles.links}>
      {project.caseStudyPath && (
        <Link to={project.caseStudyPath} className="text-link">
          Ver estudo de caso
        </Link>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} className="text-link">
          Código no GitHub
        </a>
      )}
      {project.privateRepo && <span className={`muted ${styles.private}`}>Repositório privado</span>}
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className={styles.featured}>
      <div className={styles.featuredVisual}>
        <MessageDemo trigger="scroll" />
      </div>
      <div className={styles.featuredBody}>
        <div className={styles.titleRow}>
          <h3 className={styles.featuredTitle}>{project.name}</h3>
          {project.status && <StatusBadge label={project.status} />}
        </div>
        <p className="muted">{project.summary}</p>
        <dl className={styles.facts}>
          {project.role && (
            <>
              <dt>Meu papel</dt>
              <dd>{project.role}</dd>
            </>
          )}
          <dt>Stack</dt>
          <dd>{project.stack.join(', ')}</dd>
          {project.team && (
            <>
              <dt>Equipe</dt>
              <dd>{project.team}</dd>
            </>
          )}
        </dl>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className={styles.row}>
      <div className={styles.rowMain}>
        <div className={styles.titleRow}>
          <h3 className={styles.rowTitle}>{project.name}</h3>
          {project.status && <StatusBadge label={project.status} />}
        </div>
        <p className={`muted ${styles.rowSummary}`}>{project.summary}</p>
        {project.image && (
          <figure className={styles.figure}>
            <img
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="muted">{project.image.caption}</figcaption>
          </figure>
        )}
      </div>
      <div className={styles.rowSide}>
        <span>{project.stack.join(', ')}</span>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section id="projetos" className="section" aria-labelledby="projetos-title">
      <div className="container section-inner">
        <h2 id="projetos-title" className="section-title">
          Projetos
        </h2>
        {featured.map((project) => (
          <FeaturedProject key={project.name} project={project} />
        ))}
        {others.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
        <a href={allReposUrl} className={`text-link ${styles.allRepos}`}>
          Ver todos os repositórios
        </a>
      </div>
    </section>
  );
}
