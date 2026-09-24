// P5: horizontal path. On wide screens the section is pinned and the stations slide sideways.
import { crear_patron, gsap, saltar_a_ancla, ScrollTrigger } from './base';

const bloque = document.querySelector<HTMLElement>('[data-sendero]');

if (bloque) {
  const escenario = bloque.querySelector<HTMLElement>('[data-escenario]');
  const pista = bloque.querySelector<HTMLElement>('[data-pista]');
  const estaciones = Array.from(bloque.querySelectorAll<HTMLElement>('[data-estacion]'));

  if (escenario && pista && estaciones.length) {
    crear_patron(({ escritorio }) => {
      if (!escritorio) return;
      bloque.classList.add('sendero-activo');

      const distancia = () => {
        // the end padding of an overflowing flex row is not part of scrollWidth in every browser
        const relleno = parseFloat(getComputedStyle(pista).paddingRight) || 0;
        return Math.max(0, pista.scrollWidth + relleno - window.innerWidth + 24);
      };
      const movimiento = gsap.to(pista, {
        x: () => -distancia(),
        ease: 'none',
        scrollTrigger: {
          trigger: escenario,
          start: 'top top',
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      const disparador = movimiento.scrollTrigger as ScrollTrigger;

      const ir_a = (id: string) => {
        const i = estaciones.findIndex((e) => e.id === id);
        if (i < 0) return false;
        saltar_a_ancla(disparador, i, estaciones.length);
        return true;
      };
      const al_clic = (e: Event) => {
        const enlace = (e.target as HTMLElement).closest<HTMLAnchorElement>(
          'a[href^="#estacion-"]',
        );
        if (enlace && ir_a(enlace.getAttribute('href')!.slice(1))) e.preventDefault();
      };
      document.addEventListener('click', al_clic);
      // a link that arrives with the hash already set
      if (location.hash.startsWith('#estacion-'))
        requestAnimationFrame(() => ir_a(location.hash.slice(1)));

      return () => {
        document.removeEventListener('click', al_clic);
        disparador.kill();
        movimiento.kill();
        gsap.set(pista, { clearProps: 'all' });
        bloque.classList.remove('sendero-activo');
        ScrollTrigger.refresh();
      };
    });
  }
}
