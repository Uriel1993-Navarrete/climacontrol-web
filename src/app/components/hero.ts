import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../config/site.config';
import { buildWhatsAppUrl } from '../core/whatsapp';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="inicio">
      <div class="container hero__grid">
        <div>
          <h1>Electricidad y climas <span>siempre funcionando</span></h1>
          <p class="lead">
            Servicio eléctrico residencial 110/220V, electricidad industrial y mantenimiento, instalación,
            reubicación y reparación de climas minisplit y de ventana. Atención profesional y garantizada.
          </p>
          <div class="hero__cta">
            <a class="btn btn--wa" [href]="url" target="_blank" rel="noopener">Cotiza por WhatsApp</a>
            <a class="btn btn--ghost" href="#servicios">Ver servicios</a>
          </div>
        </div>
        <img
          class="hero__img"
          src="img/hero.svg"
          alt="Ilustración de un aire acondicionado enfriando una habitación"
          width="560"
          height="420"
        />
      </div>
    </section>
  `,
  styles: `
    .hero { background: linear-gradient(160deg, var(--c-primary-soft), #fff); padding: 2.5rem 0 3rem; }
    .hero__grid { display: grid; gap: 2rem; align-items: center; }
    h1 { font-size: clamp(2rem, 6vw, 3.25rem); line-height: 1.1; margin: 0 0 1rem; }
    h1 span { color: var(--c-primary-dark); }
    .lead { font-size: 1.125rem; color: var(--c-muted); margin: 0 0 1.5rem; }
    .hero__cta { display: flex; flex-wrap: wrap; gap: .75rem; }
    .hero__img { width: 100%; max-width: 520px; height: auto; justify-self: center; }
    @media (min-width: 720px) { .hero__grid { grid-template-columns: 1.1fr 1fr; } .hero { padding: 4rem 0; } }
  `,
})
export class Hero {
  protected readonly url = buildWhatsAppUrl(SITE.whatsapp, SITE.mensajeGenerico);
}
