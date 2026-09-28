/**
 * Configuración del negocio: único lugar para cambiar nombre, WhatsApp,
 * horarios, zona de servicio y marcas. Todos los enlaces a WhatsApp leen de aquí.
 */
export const SITE = {
  nombre: 'Ing. Jonathan Perez',
  eslogan: 'Servicios técnicos: electricidad y climas',
  /** Solo dígitos, con lada de país (México: 52). Tomado de la imagen de referencia del cliente. */
  whatsapp: '528282942684',
  /** Texto visible del número. */
  whatsappVisible: '828 294 2684',
  /** PLACEHOLDER: confirmar horarios reales. */
  horarios: [
    { dias: 'Lunes a viernes', horas: '9:00 a 18:00' },
    { dias: 'Sábado', horas: '9:00 a 14:00' },
    { dias: 'Domingo', horas: 'Cerrado' },
  ],
  zona: 'Ciudad de ejemplo y alrededores (PLACEHOLDER: escribe tu zona de servicio)',
  marcas: ['Mirage', 'LG', 'Samsung', 'Carrier', 'York', 'Trane', 'Daikin', 'Hisense'],
  mensajeGenerico: 'Hola, me gustaría solicitar una cotización de servicio para mi clima.',
} as const;
