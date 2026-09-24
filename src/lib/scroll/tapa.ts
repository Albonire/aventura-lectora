// P1: the cover of the book swings open on its left edge while the student scrolls,
// and the title page appears underneath. Pinned for 120 % of the screen height.
import { crear_patron, gsap, ScrollTrigger } from './base';

const apertura = document.querySelector<HTMLElement>('[data-apertura]');

if (apertura) {
  const cubierta = apertura.querySelector<HTMLElement>('[data-cubierta]');
  const portadilla = apertura.querySelector<HTMLElement>('[data-portadilla]');
  const indicio = apertura.querySelector<HTMLElement>('[data-indicio]');

  if (cubierta && portadilla) {
    crear_patron(() => {
      // on very short screens the title page does not fit in one screen: keep the plain stacked pages
      const contenido = portadilla.querySelector<HTMLElement>('.contenedor');
      if (contenido && contenido.offsetHeight > window.innerHeight - 48) return;
      apertura.classList.add('apertura-activa');

      const linea = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: apertura,
          start: 'top top',
          end: '+=120%',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });
      linea.fromTo(cubierta, { rotateY: 0 }, { rotateY: -170, duration: 1 });
      if (indicio) linea.to(indicio, { opacity: 0, duration: 0.15 }, 0);

      return () => {
        linea.scrollTrigger?.kill();
        linea.kill();
        gsap.set([cubierta, indicio].filter(Boolean), { clearProps: 'all' });
        apertura.classList.remove('apertura-activa');
        ScrollTrigger.refresh();
      };
    });
  }
}
