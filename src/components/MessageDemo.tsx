import styles from './MessageDemo.module.css';

interface MessageDemoProps {
  // "scroll": anima ao entrar na tela (destaque na home); "load": anima ao abrir a página.
  trigger: 'scroll' | 'load';
  layout?: 'stack' | 'row';
}

const LABEL = 'Exemplo: a mensagem “Gastei R$ 50 no Uber” vira uma despesa de 50 reais na categoria transporte';

export function MessageDemo({ trigger, layout = 'stack' }: MessageDemoProps) {
  const onScroll = trigger === 'scroll';
  const bubbleAnim = onScroll ? 'v-bubble' : 'a-up';
  const lineAnim = onScroll ? 'v-line' : layout === 'row' ? 'a-growx' : 'a-grow';
  const jsonAnim = onScroll ? 'v-json' : 'a-up';
  const delay = (ms: number) => (onScroll ? undefined : { animationDelay: `${ms}ms` });

  return (
    <div role="img" aria-label={LABEL} className={`${styles.demo} ${styles[layout]}`}>
      <p className={`${styles.bubble} ${bubbleAnim}`} style={delay(550)}>
        Gastei R$ 50 no Uber
      </p>
      <span className={`${styles.connector} ${lineAnim}`} style={delay(950)} />
      <pre className={`${styles.json} ${jsonAnim}`} style={delay(1200)}>
        <code>
          {'{\n  '}
          <span className={styles.key}>"type"</span>: <span className={styles.str}>"expense"</span>
          {',\n  '}
          <span className={styles.key}>"amount"</span>: 50{',\n  '}
          <span className={styles.key}>"category"</span>: <span className={styles.str}>"transport"</span>
          {'\n}'}
        </code>
      </pre>
    </div>
  );
}
