import { Route, Routes } from 'react-router-dom';
import { useCanvasSpotlight } from './hooks/useCanvasSpotlight';
import { CaseStudy } from './pages/CaseStudy';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export function App() {
  useCanvasSpotlight();

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos/financerai" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
