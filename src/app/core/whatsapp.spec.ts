import { buildQuoteMessage, buildWhatsAppUrl, limpiarNumero } from './whatsapp';
import { SITE } from '../config/site.config';

describe('whatsapp', () => {
  it('arma la URL con el número y el mensaje codificado', () => {
    expect(buildWhatsAppUrl('521234567890', 'Hola mundo')).toBe(
      'https://wa.me/521234567890?text=Hola%20mundo',
    );
  });

  it('limpia el número de símbolos', () => {
    expect(limpiarNumero('+52 (123) 456-7890')).toBe('521234567890');
  });

  it('codifica acentos, &, saltos de línea y emojis de forma reversible', () => {
    const msg = 'Instalación & reparación\nñandú 😀';
    const url = buildWhatsAppUrl('521', msg);
    const texto = url.split('?text=')[1];
    expect(texto).not.toMatch(/[&\n ]/);
    expect(decodeURIComponent(texto)).toBe(msg);
  });

  it('incluye todos los datos del formulario en el mensaje', () => {
    const m = buildQuoteMessage({
      nombre: ' Ana ',
      servicio: 'Instalación',
      voltaje: '220V',
      marca: 'LG',
      zona: 'Centro',
    });
    expect(m).toContain('Nombre: Ana');
    expect(m).toContain('Servicio: Instalación');
    expect(m).toContain('Voltaje: 220V');
    expect(m).toContain('Marca: LG');
    expect(m).toContain('Zona: Centro');
  });

  it('usa "No especificado" en campos opcionales vacíos', () => {
    const m = buildQuoteMessage({ nombre: 'Ana', servicio: 'Mantenimiento', zona: '  ' });
    expect(m).toContain('Voltaje: No especificado');
    expect(m).toContain('Zona: No especificado');
  });

  it('el mensaje genérico del sitio genera un enlace con el número configurado', () => {
    const url = buildWhatsAppUrl(SITE.whatsapp, SITE.mensajeGenerico);
    expect(url.startsWith(`https://wa.me/${SITE.whatsapp}?text=`)).toBe(true);
  });
});
