import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../config/site.config';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section alt" id="nosotros" aria-labelledby="nosotros-titulo">
      <div class="container grid">
        <div>
          <h2 id="nosotros-titulo">Nosotros</h2>
          <p>
            Servicios técnicos a cargo del {{ sitio.nombre }}: electricidad residencial 110/220V, electricidad
            industrial en sistemas de control y fuerza, y climas tipo minisplit y de ventana. Atención
            profesional y garantizada, con presupuesto claro antes de empezar.
          </p>
          <p><strong>Zona de servicio:</strong> {{ sitio.zona }}</p>
          <h3>Horarios</h3>
          <ul class="horarios">
            @for (h of sitio.horarios; track h.dias) {
              <li>
                <span>{{ h.dias }}</span> <strong>{{ h.horas }}</strong>
              </li>
            }
          </ul>
        </div>
        <div>
          <h3>Marcas con las que trabajamos</h3>
          <ul class="marcas" aria-label="Marcas">
            @for (m of sitio.marcas; track m) {
              <li>{{ m }}</li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; gap: 2rem; }
    h3 { margin: 1.25rem 0 .5rem; }
    .horarios { list-style: none; padding: 0; margin: 0; max-width: 360px; }
    .horarios li { display: flex; justify-content: space-between; gap: 1rem; padding: .4rem 0; border-bottom: 1px solid var(--c-border); }
    .marcas { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: .5rem; }
    .marcas li { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 999px; padding: .4rem .9rem; font-weight: 600; }
    @media (min-width: 768px) { .grid { grid-template-columns: 1fr 1fr; } }
  `,
})
export class About {
  protected readonly sitio = SITE;
}
