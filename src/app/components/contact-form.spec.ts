import { TestBed } from '@angular/core/testing';
import { ContactForm } from './contact-form';
import { SITE } from '../config/site.config';
import { SERVICIOS } from '../data/services';

async function crear() {
  await TestBed.configureTestingModule({ imports: [ContactForm] }).compileComponents();
  const fixture = TestBed.createComponent(ContactForm);
  await fixture.whenStable();
  const el = fixture.nativeElement as HTMLElement;
  return { fixture, el };
}

function escribir(el: HTMLElement, id: string, valor: string, evento: 'input' | 'change') {
  const campo = el.querySelector<HTMLInputElement | HTMLSelectElement>(`#${id}`)!;
  campo.value = valor;
  campo.dispatchEvent(new Event(evento));
}

function enviar(el: HTMLElement) {
  el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
}

describe('ContactForm', () => {
  let abrir: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    abrir = vi.spyOn(window, 'open').mockReturnValue(null);
  });

  afterEach(() => abrir.mockRestore());

  it('formulario válido: abre wa.me en pestaña nueva con todos los datos', async () => {
    const { fixture, el } = await crear();
    escribir(el, 'nombre', 'María Pérez', 'input');
    escribir(el, 'servicio', SERVICIOS[0].nombre, 'change');
    escribir(el, 'voltaje', '220V', 'change');
    escribir(el, 'zona', 'Col. Centro & Norte', 'input');
    enviar(el);
    await fixture.whenStable();

    expect(abrir).toHaveBeenCalledTimes(1);
    const [url, destino, opciones] = abrir.mock.calls[0] as [string, string, string];
    expect(url.startsWith(`https://wa.me/${SITE.whatsapp}?text=`)).toBe(true);
    const texto = decodeURIComponent(url.split('?text=')[1]);
    expect(texto).toContain('María Pérez');
    expect(texto).toContain(SERVICIOS[0].nombre);
    expect(texto).toContain('Col. Centro & Norte');
    expect(destino).toBe('_blank');
    expect(opciones).toBe('noopener');
  });

  it('formulario incompleto: no abre WhatsApp y muestra errores junto a los campos', async () => {
    const { fixture, el } = await crear();
    enviar(el);
    await fixture.whenStable();

    expect(abrir).not.toHaveBeenCalled();
    expect(el.querySelector('#err-nombre')?.textContent).toContain('nombre');
    expect(el.querySelector('#err-servicio')?.textContent).toContain('servicio');
  });

  it('con solo el servicio elegido sigue bloqueado por el nombre', async () => {
    const { fixture, el } = await crear();
    escribir(el, 'servicio', SERVICIOS[0].nombre, 'change');
    enviar(el);
    await fixture.whenStable();

    expect(abrir).not.toHaveBeenCalled();
    expect(el.querySelector('#err-nombre')).toBeTruthy();
    expect(el.querySelector('#err-servicio')).toBeNull();
  });
});
