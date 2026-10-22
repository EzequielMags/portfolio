import { useEffect } from 'react';

// Acende a grade de pontos do fundo ao redor do mouse (ver body::after em global.css).
// Só reage a mouse: no toque o fundo fica parado.
export function useCanvasSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${event.clientX}px`);
        root.style.setProperty('--my', `${event.clientY}px`);
        root.style.setProperty('--spotlight', '1');
      });
    };

    const handleLeave = () => root.style.setProperty('--spotlight', '0');

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerleave', handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', handleLeave);
    };
  }, []);
}
