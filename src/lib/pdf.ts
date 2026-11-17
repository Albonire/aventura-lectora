// pdf of the diploma (certificate), made in the browser. jspdf is loaded only when the student presses the button.
import { autoras, sitio } from '../config/sitio';

const CREMA: [number, number, number] = [250, 246, 238];
const TINTA: [number, number, number] = [30, 41, 59];
const PIEDRA: [number, number, number] = [71, 85, 105];
const SOL: [number, number, number] = [250, 204, 21];
const CORAL: [number, number, number] = [253, 164, 175];

// standard pdf fonts only cover latin-1, so anything else is simplified
export function limpiar(texto: string): string {
  const comillas_simples = new RegExp(`[${String.fromCharCode(0x2018, 0x2019)}]`, 'g');
  const comillas_dobles = new RegExp(`[${String.fromCharCode(0x201c, 0x201d, 0xab, 0xbb)}]`, 'g');
  const rayas = new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`, 'g');
  const puntos = new RegExp(String.fromCharCode(0x2026), 'g');
  return Array.from(
    texto
      .replace(comillas_simples, "'")
      .replace(comillas_dobles, '"')
      .replace(rayas, '-')
      .replace(puntos, '...'),
  )
    .filter((c) => {
      const codigo = c.charCodeAt(0);
      return c === '\n' || (codigo >= 0x20 && codigo <= 0x7e) || (codigo >= 0xa1 && codigo <= 0xff);
    })
    .join('');
}

export function nombre_archivo(base: string): string {
  return (
    Array.from(base.normalize('NFD'))
      .filter((c) => c.charCodeAt(0) < 0x300 || c.charCodeAt(0) > 0x36f)
      .join('')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') + '.pdf'
  );
}

export async function descargar_certificado(nombre: string) {
  const { jsPDF: JsPDF } = await import('jspdf');
  const doc = new JsPDF({ orientation: 'l', unit: 'mm', format: 'letter' });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  doc.setFillColor(...CREMA);
  doc.rect(0, 0, w, h, 'F');
  doc.setDrawColor(...TINTA);
  doc.setLineWidth(1.2);
  doc.roundedRect(12, 12, w - 24, h - 24, 8, 8, 'S');
  doc.setFillColor(...SOL);
  doc.roundedRect(12, 12, w - 24, 16, 8, 8, 'FD');

  doc.setTextColor(...TINTA);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(limpiar(`${sitio.nombre_curso}: ${sitio.subtitulo}`), w / 2, 22.5, { align: 'center' });

  doc.setFontSize(30);
  doc.text('Diploma de Detective Lector', w / 2, 52, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.text(limpiar(`${sitio.institucion} (${sitio.municipio_corto})`), w / 2, 62, {
    align: 'center',
  });
  doc.text('Se otorga a', w / 2, 80, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text(limpiar(nombre) || '(escribe tu nombre)', w / 2, 96, { align: 'center' });
  doc.setLineWidth(0.5);
  doc.line(w / 2 - 80, 100, w / 2 + 80, 100);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  const cuerpo = doc.splitTextToSize(
    limpiar(
      'por resolver las tres misiones de lectura y el reto final, leer con calma, descubrir pistas escondidas, revisar antes de compartir y decir lo que piensa con razones.',
    ),
    190,
  );
  doc.text(cuerpo, w / 2, 114, { align: 'center' });

  // signatures of the two teachers
  doc.setDrawColor(...TINTA);
  doc.setLineWidth(0.4);
  const firmas = [w / 2 - 62, w / 2 + 62];
  autoras.forEach((autora, i) => {
    const x = firmas[i] ?? w / 2;
    doc.line(x - 45, h - 44, x + 45, h - 44);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...TINTA);
    doc.text(limpiar(autora), x, h - 38, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...PIEDRA);
    doc.text('Profesora de quinto grado', x, h - 33, { align: 'center' });
  });

  doc.setFontSize(10);
  doc.setTextColor(...PIEDRA);
  const fecha = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(limpiar(`${sitio.municipio_corto}, ${fecha}`), w / 2, h - 22, { align: 'center' });

  // stamp
  const cx = w - 40;
  const cy = 52;
  doc.setDrawColor(...TINTA);
  doc.setLineWidth(0.8);
  doc.setFillColor(...CORAL);
  doc.circle(cx, cy, 15, 'FD');
  doc.setFillColor(...CREMA);
  doc.circle(cx, cy, 11, 'FD');
  doc.setTextColor(...TINTA);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('DETECTIVE', cx, cy - 0.5, { align: 'center' });
  doc.text('LECTOR', cx, cy + 3.5, { align: 'center' });

  doc.save(nombre_archivo('diploma_detective_lector'));
}
