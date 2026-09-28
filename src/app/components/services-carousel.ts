import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { SERVICIOS } from '../data/services';
import { SITE } from '../config/site.config';
import { buildWhatsAppUrl } from '../core/whatsapp';

@Component({
  selector: 'app-services-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:resize)': 'actualizar()' },
  template: `
    <section class="section" id="servicios" aria-labelledby="servicios-titulo">
      <div class="container">
        <h2 id="servicios-titulo">Servicios</h2>
        <p class="sub">Cotiza por WhatsApp y agenda tu servicio.</p>

        <div class="carousel">
          <button
            type="button"
            class="nav-btn nav-btn--prev"
            aria-label="Servicio anterior"
            [attr.aria-disabled]="alInicio()"
            (click)="mover(-1)"
          >
            ‹
          </button>

          <ul
            #pista
            class="track"
            tabindex="0"
            aria-label="Carrusel de servicios. Usa las flechas izquierda y derecha para recorrerlo"
            (scroll)="actualizar()"
            (keydown)="teclado($event)"
          >
            @for (s of servicios; track s.id) {
              <li class="card">
                <img
                  [src]="s.imagen"
                  [alt]="'Ilustración del servicio de ' + s.nombre"
                  width="320"
                  height="200"
                  loading="lazy"
                />
                <div class="card__body">
                  <h3>{{ s.nombre }}</h3>
                  <p>{{ s.descripcion }}</p>
                  <a
                    class="btn btn--wa btn--sm"
                    target="_blank"
                    rel="noopener"
                    [href]="cotizar(s.nombre)"
                    [attr.aria-label]="'Cotizar ' + s.nombre + ' por WhatsApp'"
                    >Cotizar</a
                  >
                </div>
              </li>
            }
          </ul>

          <button
            type="button"
            class="nav-btn nav-btn--next"
            aria-label="Servicio siguiente"
            [attr.aria-disabled]="alFinal()"
            (click)="mover(1)"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  `,
  styles: `
    .sub { color: var(--c-muted); margin: 0 0 1.5rem; }
    .carousel { position: relative; }
    .track { display: flex; gap: 1rem; list-style: none; margin: 0; padding: .5rem .25rem 1rem; overflow-x: auto;
      scroll-snap-type: x mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
    .track:focus-visible { outline: 3px solid var(--c-primary); outline-offset: 2px; border-radius: 12px; }
    .card { flex: 0 0 min(86%, 320px); scroll-snap-align: start; background: var(--c-surface); border: 1px solid var(--c-border);
      border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; }
    .card img { width: 100%; height: auto; display: block; background: var(--c-primary-soft); }
    .card__body { padding: 1rem; display: flex; flex-direction: column; gap: .5rem; flex: 1; }
    h3 { margin: 0; font-size: 1.2rem; }
    .card__body p { margin: 0; color: var(--c-muted); flex: 1; }
    .nav-btn { position: absolute; top: 78px; z-index: 2; width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--c-border);
      background: var(--c-surface); color: var(--c-text); font-size: 1.75rem; line-height: 1; cursor: pointer; box-shadow: 0 2px 8px rgb(0 0 0 / .15); }
    .nav-btn[aria-disabled='true'] { opacity: .35; cursor: default; }
    .nav-btn:not([aria-disabled='true']):hover { background: var(--c-primary-soft); }
    .nav-btn--prev { left: -6px; }
    .nav-btn--next { right: -6px; }
    @media (min-width: 1200px) { .nav-btn--prev { left: -22px; } .nav-btn--next { right: -22px; } }
  `,
})
export class ServicesCarousel {
  protected readonly servicios = SERVICIOS;
  private readonly pista = viewChild.required<ElementRef<HTMLElement>>('pista');
  protected readonly alInicio = signal(true);
  protected readonly alFinal = signal(false);

  constructor() {
    afterNextRender(() => this.actualizar());
  }

  protected cotizar(servicio: string): string {
    return buildWhatsAppUrl(SITE.whatsapp, `Hola, quiero cotizar el servicio de ${servicio}.`);
  }

  protected mover(dir: 1 | -1): void {
    if (dir === 1 ? this.alFinal() : this.alInicio()) return;
    const el = this.pista().nativeElement;
    const tarjeta = el.querySelector<HTMLElement>('.card');
    const paso = (tarjeta?.offsetWidth ?? el.clientWidth) + 16;
    el.scrollBy({ left: dir * paso, behavior: 'smooth' });
  }

  protected teclado(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      this.mover(e.key === 'ArrowRight' ? 1 : -1);
    }
  }

  protected actualizar(): void {
    const el = this.pista().nativeElement;
    this.alInicio.set(el.scrollLeft <= 1);
    this.alFinal.set(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }
}
