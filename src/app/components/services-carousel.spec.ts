import { TestBed } from '@angular/core/testing';
import { ServicesCarousel } from './services-carousel';
import { SERVICIOS } from '../data/services';

async function crear() {
  await TestBed.configureTestingModule({ imports: [ServicesCarousel] }).compileComponents();
  const fixture = TestBed.createComponent(ServicesCarousel);
  await fixture.whenStable();
  const el = fixture.nativeElement as HTMLElement;
  const pista = el.querySelector<HTMLElement>('.track')!;
  const anterior = el.querySelector<HTMLButtonElement>('.nav-btn--prev')!;
  const siguiente = el.querySelector<HTMLButtonElement>('.nav-btn--next')!;
  return { fixture, pista, anterior, siguiente };
}

function medidas(pista: HTMLElement, m: { scrollLeft: number; clientWidth: number; scrollWidth: number }) {
  for (const [k, v] of Object.entries(m)) Object.defineProperty(pista, k, { value: v, configurable: true });
  pista.dispatchEvent(new Event('scroll'));
}

describe('ServicesCarousel', () => {
  it('muestra todos los servicios sin precios', async () => {
    const { pista } = await crear();
    expect(pista.querySelectorAll('.card').length).toBe(SERVICIOS.length);
    expect(pista.textContent).not.toMatch(/\$|Desde|precio/i);
  });

  it('en el inicio deshabilita "anterior" y en el final deshabilita "siguiente"', async () => {
    const { fixture, pista, anterior, siguiente } = await crear();

    medidas(pista, { scrollLeft: 0, clientWidth: 300, scrollWidth: 1000 });
    await fixture.whenStable();
    expect(anterior.getAttribute('aria-disabled')).toBe('true');
    expect(siguiente.getAttribute('aria-disabled')).toBe('false');

    medidas(pista, { scrollLeft: 700, clientWidth: 300, scrollWidth: 1000 });
    await fixture.whenStable();
    expect(anterior.getAttribute('aria-disabled')).toBe('false');
    expect(siguiente.getAttribute('aria-disabled')).toBe('true');
  });

  it('si todo cabe en pantalla, ambos botones quedan deshabilitados', async () => {
    const { fixture, pista, anterior, siguiente } = await crear();
    medidas(pista, { scrollLeft: 0, clientWidth: 1200, scrollWidth: 1200 });
    await fixture.whenStable();
    expect(anterior.getAttribute('aria-disabled')).toBe('true');
    expect(siguiente.getAttribute('aria-disabled')).toBe('true');
  });

  it('las flechas del teclado y los botones desplazan la pista', async () => {
    const { fixture, pista, siguiente, anterior } = await crear();
    const desplazar = vi.fn();
    pista.scrollBy = desplazar as unknown as typeof pista.scrollBy;
    medidas(pista, { scrollLeft: 300, clientWidth: 300, scrollWidth: 1000 });
    await fixture.whenStable();

    pista.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    expect(desplazar.mock.calls[0][0].left).toBeGreaterThan(0);

    pista.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true }));
    expect(desplazar.mock.calls[1][0].left).toBeLessThan(0);

    siguiente.click();
    anterior.click();
    expect(desplazar).toHaveBeenCalledTimes(4);
  });

  it('en los extremos los botones no desplazan y conservan el foco', async () => {
    const { fixture, pista, siguiente } = await crear();
    const desplazar = vi.fn();
    pista.scrollBy = desplazar as unknown as typeof pista.scrollBy;
    medidas(pista, { scrollLeft: 700, clientWidth: 300, scrollWidth: 1000 });
    await fixture.whenStable();

    siguiente.focus();
    siguiente.click();
    expect(desplazar).not.toHaveBeenCalled();
    expect(siguiente.getAttribute('aria-disabled')).toBe('true');
    expect(document.activeElement).toBe(siguiente);
  });
});
