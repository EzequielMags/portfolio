import { useEffect, useState } from 'react';
import { prefersReducedMotion, useInView } from '../hooks/useInView';
import styles from './PipelineDemo.module.css';

// Etapas do funil oficial da Ayni, na ordem em que o lead avança.
const STAGES = [
  { label: 'Novo lead' },
  { label: 'Atendimento IA', ai: true },
  { label: 'Entendimento' },
  { label: 'Agendamento' },
  { label: 'Reunião' },
  { label: 'Proposta enviada', human: true },
  { label: 'Proposta aceita' },
  { label: 'Contrato', human: true },
  { label: 'Fechado' },
];

const LAST = STAGES.length - 1;
const STEP_MS = 600;
// Etapas que pedem aprovação humana ficam mais tempo em destaque.
const HUMAN_PAUSE_MS = 1300;

export function PipelineDemo() {
  const [ref, inView] = useInView<HTMLElement>();
  const [run, setRun] = useState(0);
  // -1: ainda não começou; LAST: o lead chegou em Fechado.
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setStep(LAST);
      return;
    }

    let current = 0;
    let timer = 0;
    setStep(0);
    const advance = () => {
      const wait = STAGES[current].human ? HUMAN_PAUSE_MS : STEP_MS;
      timer = window.setTimeout(() => {
        current += 1;
        setStep(current);
        if (current < LAST) advance();
      }, wait);
    };
    advance();
    return () => window.clearTimeout(timer);
  }, [inView, run]);

  const finished = step === LAST;

  return (
    <figure ref={ref} className={styles.demo}>
      <ol className={styles.stages} aria-label="Etapas do funil de vendas da Ayni">
        {STAGES.map((stage, index) => {
          const state = index < step ? styles.passed : index === step ? styles.current : '';
          const closed = finished && index === LAST;
          return (
            <li key={stage.label} className={`${styles.stage} ${state} ${closed ? styles.done : ''}`}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.label}>{stage.label}</span>
              {stage.ai && <span className={`${styles.aiTag} ${index === step ? styles.pulse : ''}`}>IA</span>}
              {stage.human && index === step && !finished && (
                <span className={styles.humanTag}>aprovação humana</span>
              )}
            </li>
          );
        })}
      </ol>
      <div className={styles.footer}>
        <figcaption className={`muted ${styles.caption}`}>
          Funil de vendas da Ayni, do primeiro contato ao contrato. A IA faz o primeiro atendimento; preço, proposta e
          contrato passam por aprovação humana.
        </figcaption>
        {finished && (
          <button type="button" className={styles.replay} onClick={() => setRun((value) => value + 1)}>
            Ver de novo
          </button>
        )}
      </div>
    </figure>
  );
}
