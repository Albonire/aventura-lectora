// P6: three nested lenses. Scrolling goes one level deeper each time, like going down through the lupas.
import { crear_patron, gsap, saltar_a_ancla, ScrollTrigger } from './base';

const bloque = document.querySelector<HTMLElement>('[data-lupas]');

if (bloque) {
  const escenario = bloque.querySelector<HTMLElement>('[data-escenario]');
  const lentes = Array.from(bloque.querySelectorAll<HTMLElement>('[data-lente]'));

  if (escenario && lentes.length === 3) {
    crear_patron(({ escritorio }) => {
      if (!escritorio) return;
      bloque.classList.add('lupas-activo');
      const [l1, l2, l3] = lentes;

      gsap.set([l2, l3], { scale: 0.55, opacity: 0 });
      const linea = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: escenario,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });
      linea
        .to({}, { duration: 0.35 })
        .to(l1, { scale: 2.6, opacity: 0, duration: 1 })
        .fromTo(l2, { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, '<0.25')
        .to({}, { duration: 0.5 })
        .to(l2, { scale: 2.6, opacity: 0, duration: 1 })
        .fromTo(l3, { scale: 0.55, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, '<0.25')
        .to({}, { duration: 0.35 });
      const disparador = linea.scrollTrigger as ScrollTrigger;

      // anchors to a lens land on the point of the pin where that lens is fully shown
      const ir_a = (id: string) => {
        const i = lentes.findIndex((l) => l.id === id);
        if (i < 0) return false;
        saltar_a_ancla(disparador, i, lentes.length);
        return true;
      };
      const al_clic = (e: Event) => {
        const enlace = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#lupa-"]');
        if (enlace && ir_a(enlace.getAttribute('href')!.slice(1))) e.preventDefault();
      };
      document.addEventListener('click', al_clic);

      return () => {
        document.removeEventListener('click', al_clic);
        disparador.kill();
        linea.kill();
        gsap.set(lentes, { clearProps: 'all' });
        bloque.classList.remove('lupas-activo');
        ScrollTrigger.refresh();
      };
    });
  }
}
