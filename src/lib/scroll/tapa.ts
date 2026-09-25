// P1: the closed book opens with the scroll. The cover swings open on its left edge (the spine)
// while the book slides so that the open spread ends up centered. Pinned for 90 % of the screen height.
// Only on wide screens: below 768px the cover and the two pages stay as plain stacked pages.
import { crear_patron, gsap, ScrollTrigger } from './base';

const apertura = document.querySelector<HTMLElement>('[data-apertura]');

if (apertura) {
  const libro = apertura.querySelector<HTMLElement>('[data-libro]');
  const cubierta = apertura.querySelector<HTMLElement>('[data-cubierta]');
  const indicio = apertura.querySelector<HTMLElement>('[data-indicio]');
  const paginas = Array.from(apertura.querySelectorAll<HTMLElement>('.pagina'));

  if (libro && cubierta) {
    crear_patron(({ escritorio }) => {
      if (!escritorio) return;
      apertura.classList.add('apertura-activa');

      // if the text of a page does not fit in the book (very short screens), keep the plain pages
      const desborda = paginas.some((p) => p.scrollHeight > p.clientHeight + 2);
      if (desborda || window.innerHeight < 560) {
        apertura.classList.remove('apertura-activa');
        return;
      }

      const linea = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: apertura,
          start: 'top top',
          end: '+=90%',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });
      // closed: the cover (right half of the book) is centered. Open: the spread is centered.
      linea.fromTo(libro, { x: () => -cubierta.offsetWidth / 2 }, { x: 0, duration: 1 }, 0);
      linea.fromTo(cubierta, { rotateY: 0 }, { rotateY: -180, duration: 1 }, 0);
      if (indicio) linea.to(indicio, { opacity: 0, duration: 0.15 }, 0);

      return () => {
        linea.scrollTrigger?.kill();
        linea.kill();
        gsap.set([libro, cubierta, indicio].filter(Boolean), { clearProps: 'all' });
        apertura.classList.remove('apertura-activa');
        ScrollTrigger.refresh();
      };
    });
  }
}
