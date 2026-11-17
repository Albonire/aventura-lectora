// crayon drawing that goes behind the diploma, on the screen, on paper and in the pdf (the same file for all three).
// It is already mixed with the cream of the page (see scripts/preparar_imagenes.mjs), so the text can be read over it.
import fondo from '../assets/ilustraciones/diploma_fondo.jpg';

// Astro gives an object with the address; plain Vite (the tests) gives the address itself
export const diploma_fondo_url: string = typeof fondo === 'string' ? fondo : (fondo as { src: string }).src;
export const DIPLOMA_FONDO_ANCHO = 1024;
export const DIPLOMA_FONDO_ALTO = 765;
