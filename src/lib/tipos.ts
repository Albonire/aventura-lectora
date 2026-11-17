// shared data shapes for the activity json files (src/data/actividades/unidad_N.json)

export interface Opcion {
  id: string;
  texto: string;
}

export interface Pregunta {
  id: string;
  // short label of what the question trains ("Idea principal", "Verifico")
  nivel: string;
  pregunta: string;
  opciones: Opcion[];
  correcta: string;
  // shown when the answer is right
  retro: string;
  // graded hints of Sofía, shown after each wrong try
  pistas?: string[];
}

export interface ItemClasificar {
  id: string;
  texto: string;
  caja: string;
  // hint of Sofía when the card is in the wrong box
  pista?: string;
}

export interface CajaClasificar {
  id: string;
  titulo: string;
  descripcion?: string;
}

// the family story of mission 2 ("Cuéntame, abuelo"), kept in localStorage under "abuelo"
export interface RelatoFamiliar {
  quien: string;
  trama: string;
  ensenanza: string;
  // true when the story came on the paper sheet and was typed in the classroom the next day
  en_papel?: boolean;
  guardado?: boolean;
}

// the argument tower of the final challenge, kept in localStorage under "torre"
export interface TorreGuardada {
  situacion: string;
  // chosen sentence starter of each field
  iniciadores: Record<string, string>;
  // what the student wrote after the starter
  textos: Record<string, string>;
  chequeo: string[];
}
