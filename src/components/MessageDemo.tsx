import { useEffect, useState } from 'react';
import { prefersReducedMotion, useInView } from '../hooks/useInView';
import styles from './MessageDemo.module.css';

interface MessageDemoProps {
  layout?: 'stack' | 'row';
}

const LABEL = 'Exemplo: a mensagem “Gastei R$ 50 no Uber” vira uma despesa de 50 reais na categoria transporte';
const MESSAGE = 'Gastei R$ 50 no Uber';
const JSON_LINES = 5;

const TYPE_MS = 45;
const PROCESS_MS = 450;
const LINE_MS = 220;

// Mini-demo do FinancerAI: a mensagem é digitada, a IA "processa" e o JSON aparece campo por campo.
export function MessageDemo({ layout = 'stack' }: MessageDemoProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [run, setRun] = useState(0);
  const [typed, setTyped] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setTyped(MESSAGE.length);
      setProcessing(true);
      setLines(JSON_LINES);
      return;
    }

    setTyped(0);
    setProcessing(false);
    setLines(0);

    const timers: number[] = [];
    const at = (ms: number, action: () => void) => timers.push(window.setTimeout(action, ms));

    for (let i = 1; i <= MESSAGE.length; i += 1) at(300 + i * TYPE_MS, () => setTyped(i));
    const typedAt = 300 + MESSAGE.length * TYPE_MS;
    at(typedAt + 200, () => setProcessing(true));
    for (let i = 1; i <= JSON_LINES; i += 1) at(typedAt + 200 + PROCESS_MS + i * LINE_MS, () => setLines(i));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, run]);

  const typing = typed < MESSAGE.length;
  const finished = lines === JSON_LINES;
  const lineClass = (index: number) => `${styles.jsonLine} ${index < lines ? styles.shown : ''}`;

  return (
    <div ref={ref} className={styles.demo}>
      <div role="img" aria-label={LABEL} className={`${styles.visual} ${styles[layout]}`}>
        <p className={styles.bubble}>
          {MESSAGE.slice(0, typed)}
          {inView && typing && <span className={styles.caret} />}
          {/* O resto da frase fica invisível para o balão não mudar de tamanho enquanto digita */}
          <span className={styles.ghost}>{MESSAGE.slice(typed)}</span>
        </p>
        <span className={`${styles.connector} ${processing ? styles.connected : ''}`} />
        <pre className={styles.json}>
          <code>
            <span className={lineClass(0)}>{'{'}</span>
            <span className={lineClass(1)}>
              {'  '}
              <span className={styles.key}>"type"</span>: <span className={styles.str}>"expense"</span>,
            </span>
            <span className={lineClass(2)}>
              {'  '}
              <span className={styles.key}>"amount"</span>: 50,
            </span>
            <span className={lineClass(3)}>
              {'  '}
              <span className={styles.key}>"category"</span>: <span className={styles.str}>"transport"</span>
            </span>
            <span className={lineClass(4)}>{'}'}</span>
          </code>
        </pre>
      </div>
      {finished && (
        <button type="button" className={styles.replay} onClick={() => setRun((value) => value + 1)}>
          Ver de novo
        </button>
      )}
    </div>
  );
}
