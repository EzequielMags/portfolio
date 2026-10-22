import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Contact } from '../components/Contact';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Journey } from '../components/Journey';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { fullName, profile } from '../content/profile';

export function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = `${fullName}, ${profile.role.toLowerCase()}`;
  }, []);

  // Ao voltar de outra página para "/#projetos", rola até a seção.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
