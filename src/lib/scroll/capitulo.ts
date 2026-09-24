// P2: chapter opening. Paper layers move at different speeds and the big number is revealed with a mask.
import { crear_patron, gsap, ScrollTrigger } from './base';

const seccion = document.querySelector<HTMLElement>('[data-capitulo]');

if (seccion) {
  crear_patron(({ escritorio }) => {
    const capas = Array.from(seccion.querySelectorAll<HTMLElement>('[data-capa]'));
    const numero = seccion.querySelector<HTMLElement>('[data-numero]');
    const indicio = seccion.querySelector<HTMLElement>('[data-indicio]');
    const velocidades = [10, 24, 40];

    if (numero) {
      gsap.fromTo(
        numero,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out', clearProps: 'clipPath' },
      );
    }

    const linea = gsap.timeline({
      scrollTrigger: {
        trigger: seccion,
        start: 'top top',
        end: escritorio ? '+=80%' : 'bottom top',
        scrub: 0.4,
        pin: escritorio,
        pinSpacing: true,
      },
      defaults: { ease: 'none' },
    });
    capas.forEach((capa, i) => linea.to(capa, { yPercent: velocidades[i] ?? 0 }, 0));
    if (indicio) linea.to(indicio, { opacity: 0, duration: 0.25 }, 0);

    return () => {
      linea.scrollTrigger?.kill();
      linea.kill();
      gsap.set([...capas, numero, indicio].filter(Boolean), { clearProps: 'all' });
      ScrollTrigger.refresh();
    };
  });
}
