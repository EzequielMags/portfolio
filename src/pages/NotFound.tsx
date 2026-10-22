import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { fullName } from '../content/profile';

export function NotFound() {
  useEffect(() => {
    document.title = `Página não encontrada | ${fullName}`;
  }, []);

  return (
    <>
      <Header variant="page" />
      <main id="conteudo" className="container section-inner">
        <h1 className="section-title">Página não encontrada</h1>
        <p className="muted" style={{ marginTop: 16, fontSize: 19 }}>
          O endereço pode ter mudado. Volte para o início para ver os projetos.
        </p>
        <Link to="/" className="button button-primary" style={{ marginTop: 32 }}>
          Ir para o início
        </Link>
      </main>
    </>
  );
}
