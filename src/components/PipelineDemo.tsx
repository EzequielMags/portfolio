import styles from './PipelineDemo.module.css';

// Etapas do funil oficial da Ayni, na ordem em que o lead avança.
const STAGES = [
  { label: 'Novo lead' },
  { label: 'Atendimento IA', ai: true },
  { label: 'Entendimento' },
  { label: 'Agendamento' },
  { label: 'Reunião' },
  { label: 'Proposta enviada' },
  { label: 'Proposta aceita' },
  { label: 'Contrato' },
  { label: 'Fechado', done: true },
];

export function PipelineDemo() {
  return (
    <figure className={styles.demo}>
      <ol className={styles.stages} aria-label="Etapas do funil de vendas da Ayni">
        {STAGES.map((stage, index) => (
          <li
            key={stage.label}
            className={`${styles.stage} ${stage.done ? styles.done : ''} v-step`}
            style={{ animationRange: `entry ${5 + index * 4}% cover ${22 + index * 4}%` }}
          >
            <span className={styles.index} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={styles.label}>{stage.label}</span>
            {stage.ai && <span className={styles.aiTag}>IA</span>}
          </li>
        ))}
      </ol>
      <figcaption className={`muted ${styles.caption}`}>
        Funil de vendas da Ayni, do primeiro contato ao contrato. A IA faz o primeiro atendimento; preço, proposta e
        contrato passam por aprovação humana.
      </figcaption>
    </figure>
  );
}
