export interface DatosCotizacion {
  nombre: string;
  servicio: string;
  voltaje?: string;
  marca?: string;
  zona?: string;
}

/** Deja solo dígitos del número (quita +, espacios y guiones). */
export function limpiarNumero(numero: string): string {
  return numero.replace(/\D/g, '');
}

export function buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${limpiarNumero(number)}?text=${encodeURIComponent(message)}`;
}

export function buildQuoteMessage(d: DatosCotizacion): string {
  const linea = (v?: string) => (v && v.trim() ? v.trim() : 'No especificado');
  return [
    'Hola, quiero solicitar una cotización.',
    `Nombre: ${d.nombre.trim()}`,
    `Servicio: ${d.servicio.trim()}`,
    `Voltaje: ${linea(d.voltaje)}`,
    `Marca: ${linea(d.marca)}`,
    `Zona: ${linea(d.zona)}`,
  ].join('\n');
}
