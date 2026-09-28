import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../config/site.config';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container">
        <p>
          <strong>{{ sitio.nombre }}</strong> · {{ sitio.eslogan }}
        </p>
        <p>WhatsApp: {{ sitio.whatsappVisible }}</p>
        <p class="small">© {{ anio }} {{ sitio.nombre }}.</p>
      </div>
    </footer>
  `,
  styles: `
    .footer { background: #0b2a3a; color: #dbe7ee; padding: 2rem 0 5.5rem; }
    p { margin: .25rem 0; }
    .small { font-size: .85rem; color: #b6c7d2; }
  `,
})
export class Footer {
  protected readonly sitio = SITE;
  protected readonly anio = new Date().getFullYear();
}
