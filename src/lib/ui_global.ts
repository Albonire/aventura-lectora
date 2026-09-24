// global behavior shared by every page: settings switches, menu, case states, fore-edge, resume link
import { leer, guardar } from './almacen';
import { leer_progreso, estado_de, guardar_lugar, marcar_visitado } from './progreso';

export interface Ajustes {
  movimiento: boolean;
  letra_grande: boolean;
  voz: boolean;
}

const html = document.documentElement;

function ajustes_iniciales(): Ajustes {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const guardados = leer<Partial<Ajustes>>('ajustes', {});
  return {
    movimiento: typeof guardados.movimiento === 'boolean' ? guardados.movimiento : !reduce,
    letra_grande: guardados.letra_grande === true,
    voz: guardados.voz === true,
  };
}

let ajustes = ajustes_iniciales();

function aplicar(a: Ajustes) {
  if (a.movimiento) html.removeAttribute('data-movimiento');
  else html.setAttribute('data-movimiento', 'no');
  if (a.letra_grande) html.setAttribute('data-letra', 'grande');
  else html.removeAttribute('data-letra');
  if (a.voz) html.setAttribute('data-voz', 'si');
  else html.removeAttribute('data-voz');
  document.querySelectorAll<HTMLElement>('[data-ajuste]').forEach((boton) => {
    const clave = boton.dataset.ajuste as keyof Ajustes;
    boton.setAttribute('aria-checked', String(a[clave]));
  });
}

function iniciar_interruptores() {
  aplicar(ajustes);
  document.querySelectorAll<HTMLElement>('[data-ajuste]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const clave = boton.dataset.ajuste as keyof Ajustes;
      ajustes = { ...ajustes, [clave]: !ajustes[clave] };
      guardar('ajustes', ajustes);
      aplicar(ajustes);
      document.dispatchEvent(new CustomEvent('ajustes:cambio', { detail: ajustes }));
    });
  });
}

function iniciar_menu() {
  const menu = document.querySelector<HTMLDetailsElement>('[data-menu]');
  if (!menu) return;
  const resumen = menu.querySelector('summary');
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) {
      menu.open = false;
      resumen?.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (menu.open && e.target instanceof Node && !menu.contains(e.target)) menu.open = false;
  });
  menu.addEventListener('focusout', (e) => {
    const destino = e.relatedTarget;
    if (menu.open && destino instanceof Node && !menu.contains(destino)) menu.open = false;
  });
}

const TEXTO_ESTADO = { sin_empezar: '', en_curso: 'En curso', resuelto: 'Resuelto' } as const;

function pintar_estados() {
  const progreso = leer_progreso();
  document.querySelectorAll<HTMLElement>('a[data-caso]').forEach((enlace) => {
    const caso = Number(enlace.dataset.caso);
    const estado = estado_de(caso, progreso);
    enlace.dataset.estado = estado;
    const etiqueta = enlace.querySelector<HTMLElement>('.estado-etiqueta');
    if (etiqueta) etiqueta.textContent = TEXTO_ESTADO[estado];
    const lector = enlace.querySelector<HTMLElement>('.estado-texto');
    if (lector)
      lector.textContent = TEXTO_ESTADO[estado] ? `, ${TEXTO_ESTADO[estado].toLowerCase()}` : '';
  });
  const seguir = document.querySelector<HTMLAnchorElement>('[data-seguir]');
  if (seguir && progreso.ultimo) {
    seguir.href = `${progreso.ultimo.ruta}#${progreso.ultimo.seccion}`;
    seguir.hidden = false;
  }
}

function iniciar_canto() {
  const canto = document.querySelector<HTMLElement>('[data-canto]');
  if (!canto) return;
  let cuadro = 0;
  const actualizar = () => {
    cuadro = 0;
    const maximo = document.documentElement.scrollHeight - window.innerHeight;
    const p = maximo > 0 ? Math.min(1, Math.max(0, window.scrollY / maximo)) : 0;
    canto.style.setProperty('--p', p.toFixed(4));
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!cuadro) cuadro = requestAnimationFrame(actualizar);
    },
    { passive: true },
  );
  window.addEventListener('resize', actualizar, { passive: true });
  actualizar();
}

function recordar_lugar() {
  const match = location.pathname.match(/^\/unidad\/(\d)\/?$/);
  if (!match) return;
  const caso = Number(match[1]);
  marcar_visitado(caso);
  pintar_estados();
  const secciones = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
  if (!secciones.length || !('IntersectionObserver' in window)) return;
  let pendiente = 0;
  const observador = new IntersectionObserver(
    (entradas) => {
      const visible = entradas
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      window.clearTimeout(pendiente);
      pendiente = window.setTimeout(() => {
        guardar_lugar(location.pathname, (visible.target as HTMLElement).id);
      }, 1200);
    },
    { threshold: [0.35, 0.6] },
  );
  secciones.forEach((s) => observador.observe(s));
}

document.addEventListener('progreso:cambio', pintar_estados);
iniciar_interruptores();
iniciar_menu();
pintar_estados();
iniciar_canto();
recordar_lugar();
