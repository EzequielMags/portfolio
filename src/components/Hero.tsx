import { useState } from 'react';
import { fullName, profile } from '../content/profile';
import styles from './Hero.module.css';

type Mode = 'design' | 'code';

const HANDLE_DELAYS = [650, 710, 770, 830];

function DesignView() {
  return (
    <div className={styles.designView}>
      <div className={`${styles.selection} a-box`} style={{ animationDelay: '450ms' }}>
        <span className={`${styles.layerTag} a-tag`} aria-hidden="true" style={{ animationDelay: '850ms' }}>
          Hero / Nome
        </span>
        {HANDLE_DELAYS.map((delay, index) => (
          <span
            key={delay}
            className={`${styles.handle} ${styles[`handle${index}`]} a-pop`}
            aria-hidden="true"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
        <h1 id="hero-title" className={`${styles.name} a-up`}>
          {profile.firstName}
          <br />
          {profile.lastName}
        </h1>
      </div>
      <div className={styles.measure} aria-hidden="true">
        <span className={`${styles.measureLine} a-grow`} style={{ animationDelay: '1000ms' }} />
        <span className={`${styles.measureLabel} a-fade`} style={{ animationDelay: '1300ms' }}>
          48
        </span>
      </div>
    </div>
  );
}

function CodeView() {
  const str = (value: string) => <span className={styles.str}>"{value}"</span>;
  const lines = [
    <span className={styles.tag}>&lt;Hero</span>,
    <>  nome={str(fullName)}</>,
    <>  papel={str(profile.role)}</>,
    <>  busca={str(profile.lookingFor)}</>,
    <>
      {'  stack={['}
      {profile.heroStack.map((item, index) => (
        <span key={item}>
          {index > 0 && ', '}
          {str(item)}
        </span>
      ))}
      {']}'}
    </>,
    <span className={styles.tag}>/&gt;</span>,
  ];

  return (
    <div className={`${styles.codeView} a-fade`}>
      <h1 id="hero-title" className="sr-only">
        {fullName}
      </h1>
      <pre className={styles.code}>
        <code>
          {lines.map((line, index) => (
            <span key={index} className={`${styles.codeLine} a-line`} style={{ animationDelay: `${index * 80}ms` }}>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function Hero() {
  const [mode, setMode] = useState<Mode>('design');

  return (
    <section id="topo" className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div role="group" aria-label="Como ver o cabeçalho" className={styles.toggle}>
        <button type="button" aria-pressed={mode === 'design'} onClick={() => setMode('design')}>
          Design
        </button>
        <button type="button" aria-pressed={mode === 'code'} onClick={() => setMode('code')}>
          Código
        </button>
      </div>

      {mode === 'design' ? <DesignView /> : <CodeView />}

      <p className={`${styles.role} a-up`} style={{ animationDelay: '1150ms' }}>
        {profile.role}
      </p>
      <p className={`${styles.summary} a-up`} style={{ animationDelay: '1280ms' }}>
        {profile.summary}
      </p>
      <div className={`${styles.actions} a-up`} style={{ animationDelay: '1400ms' }}>
        <a href="#projetos" className="button button-primary">
          Ver projetos
        </a>
        {profile.resumeUrl ? (
          <a href={profile.resumeUrl} className="button button-secondary" download>
            Baixar currículo (PDF)
          </a>
        ) : (
          <span className={`placeholder ${styles.resumePlaceholder}`}>[Baixar currículo (PDF): adicionar o arquivo]</span>
        )}
      </div>
    </section>
  );
}
