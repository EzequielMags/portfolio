import { useRef, useState, type PointerEvent } from 'react';
import { fullName, profile } from '../content/profile';
import styles from './Hero.module.css';

type Mode = 'design' | 'code';

const HANDLE_DELAYS = [650, 710, 770, 830];
// Inclinação máxima do cartão, em graus, quando o mouse chega à borda.
const MAX_TILT_X = 8;
const MAX_TILT_Y = 14;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Frente do cartão: o nome como uma camada selecionada. Ao passar o mouse,
// as camadas (fundo, caixa, nome, etiqueta e medida) se separam em profundidade.
function DesignFace() {
  return (
    <div className={styles.designFace}>
      <span className={styles.plate} />
      <div className={`${styles.selection} a-box`} style={{ animationDelay: '450ms' }}>
        <span className={styles.tagLayer}>
          <span className={`${styles.layerTag} a-tag`} style={{ animationDelay: '850ms' }}>
            Hero / Nome
          </span>
        </span>
        {HANDLE_DELAYS.map((delay, index) => (
          <span
            key={delay}
            className={`${styles.handle} ${styles[`handle${index}`]} a-pop`}
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
        <div className={styles.nameLayer}>
          <p className={`${styles.name} a-up`}>
            {profile.firstName}
            <br />
            {profile.lastName}
          </p>
        </div>
      </div>
      <div className={styles.measure}>
        <span className={`${styles.measureLine} a-grow`} style={{ animationDelay: '1000ms' }} />
        <span className={`${styles.measureLabel} a-fade`} style={{ animationDelay: '1300ms' }}>
          48
        </span>
      </div>
    </div>
  );
}

// Verso do cartão: o mesmo topo escrito como componente React.
function CodeFace({ active }: { active: boolean }) {
  const str = (value: string) => <span className={styles.str}>"{value}"</span>;
  const lines = [
    <span className={styles.tag}>&lt;Hero</span>,
    <>  nome={str(fullName)}</>,
    <>  papel={str(profile.role)}</>,
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
    <div className={styles.codeView}>
      <pre className={styles.code}>
        {/* A key muda a cada virada, então as linhas aparecem de novo uma a uma. */}
        <code key={active ? 'active' : 'idle'}>
          {lines.map((line, index) => (
            <span
              key={index}
              className={`${styles.codeLine} a-line`}
              style={{ animationDelay: `${(active ? 350 : 0) + index * 80}ms` }}
            >
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
  const [exploded, setExploded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const setTilt = (rx: number, ry: number) => {
    cardRef.current?.style.setProperty('--rx', `${rx}deg`);
    cardRef.current?.style.setProperty('--ry', `${ry}deg`);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || mode !== 'design' || prefersReducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt(-y * MAX_TILT_X * 2, x * MAX_TILT_Y * 2);
    if (!exploded) setExploded(true);
  };

  const resetTilt = () => {
    setTilt(0, 0);
    setExploded(false);
  };

  const changeMode = (next: Mode) => {
    resetTilt();
    setMode(next);
  };

  return (
    <section id="topo" className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        {fullName}
      </h1>

      <div className={styles.controls}>
        <div role="group" aria-label="Como ver o cabeçalho" className={styles.toggle}>
          <button type="button" aria-pressed={mode === 'design'} onClick={() => changeMode('design')}>
            Design
          </button>
          <button type="button" aria-pressed={mode === 'code'} onClick={() => changeMode('code')}>
            Código
          </button>
        </div>
        {mode === 'design' && (
          <p className={`muted ${styles.hint}`} aria-hidden="true">
            Passe o mouse no nome para ver as camadas
          </p>
        )}
      </div>

      <div
        className={`${styles.stage} ${exploded ? styles.exploded : ''}`}
        data-mode={mode}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div ref={cardRef} className={styles.card}>
          <div className={`${styles.face} ${styles.front}`} aria-hidden="true" inert={mode !== 'design'}>
            <DesignFace />
          </div>
          <div className={`${styles.face} ${styles.back}`} aria-hidden={mode !== 'code'} inert={mode !== 'code'}>
            <CodeFace active={mode === 'code'} />
          </div>
        </div>
      </div>

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
