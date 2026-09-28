import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SITE } from '../config/site.config';
import { SERVICIOS, VOLTAJES } from '../data/services';
import { buildQuoteMessage, buildWhatsAppUrl } from '../core/whatsapp';

@Component({
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="contacto" aria-labelledby="contacto-titulo">
      <div class="container wrap">
        <h2 id="contacto-titulo">Solicita tu cotización</h2>
        <p class="sub">Llena los datos y te abrimos WhatsApp con el mensaje listo para enviar.</p>

        <form novalidate (submit)="enviar($event)">
          <div class="field">
            <label for="nombre">Nombre *</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autocomplete="name"
              required
              [attr.aria-invalid]="errorNombre() ? 'true' : null"
              [attr.aria-describedby]="errorNombre() ? 'err-nombre' : null"
              (input)="nombre.set($any($event.target).value)"
            />
            @if (errorNombre()) {
              <p class="error" id="err-nombre" role="alert">{{ errorNombre() }}</p>
            }
          </div>

          <div class="field">
            <label for="servicio">Servicio *</label>
            <select
              id="servicio"
              name="servicio"
              required
              [attr.aria-invalid]="errorServicio() ? 'true' : null"
              [attr.aria-describedby]="errorServicio() ? 'err-servicio' : null"
              (change)="servicio.set($any($event.target).value)"
            >
              <option value="">Selecciona un servicio</option>
              @for (s of servicios; track s.id) {
                <option [value]="s.nombre">{{ s.nombre }}</option>
              }
            </select>
            @if (errorServicio()) {
              <p class="error" id="err-servicio" role="alert">{{ errorServicio() }}</p>
            }
          </div>

          <div class="row">
            <div class="field">
              <label for="voltaje">Voltaje</label>
              <select id="voltaje" name="voltaje" (change)="voltaje.set($any($event.target).value)">
                <option value="">Selecciona</option>
                @for (v of voltajes; track v) {
                  <option [value]="v">{{ v }}</option>
                }
              </select>
            </div>
            <div class="field">
              <label for="marca">Marca</label>
              <select id="marca" name="marca" (change)="marca.set($any($event.target).value)">
                <option value="">Selecciona</option>
                @for (m of marcas; track m) {
                  <option [value]="m">{{ m }}</option>
                }
                <option value="Otra">Otra</option>
              </select>
            </div>
          </div>

          <div class="field">
            <label for="zona">Zona o colonia</label>
            <input
              id="zona"
              name="zona"
              type="text"
              autocomplete="address-level2"
              (input)="zona.set($any($event.target).value)"
            />
          </div>

          <button type="submit" class="btn btn--wa">Enviar por WhatsApp</button>
        </form>
      </div>
    </section>
  `,
  styles: `
    .wrap { max-width: 640px; }
    .sub { color: var(--c-muted); margin: 0 0 1.5rem; }
    .field { display: flex; flex-direction: column; gap: .35rem; margin-bottom: 1rem; flex: 1; }
    .row { display: grid; gap: 0 1rem; }
    label { font-weight: 600; }
    input, select { font: inherit; padding: .7rem .8rem; border: 1px solid #8a97a3; border-radius: 8px; background: #fff; color: var(--c-text); min-height: 46px; }
    input:focus-visible, select:focus-visible { outline: 3px solid var(--c-primary); outline-offset: 1px; }
    [aria-invalid='true'] { border-color: var(--c-error); }
    .error { color: var(--c-error); margin: 0; font-size: .9rem; font-weight: 600; }
    @media (min-width: 600px) { .row { grid-template-columns: 1fr 1fr; } }
  `,
})
export class ContactForm {
  protected readonly servicios = SERVICIOS;
  protected readonly voltajes = VOLTAJES;
  protected readonly marcas = SITE.marcas;

  protected readonly nombre = signal('');
  protected readonly servicio = signal('');
  protected readonly voltaje = signal('');
  protected readonly marca = signal('');
  protected readonly zona = signal('');
  protected readonly intento = signal(false);

  protected errorNombre(): string {
    return this.intento() && !this.nombre().trim() ? 'Escribe tu nombre.' : '';
  }

  protected errorServicio(): string {
    return this.intento() && !this.servicio() ? 'Selecciona un servicio.' : '';
  }

  protected enviar(e: Event): void {
    e.preventDefault();
    // Lee los valores reales del formulario: el autocompletado del navegador no siempre dispara input/change.
    const datos = new FormData(e.target as HTMLFormElement);
    const campo = (k: string) => String(datos.get(k) ?? '');
    this.nombre.set(campo('nombre'));
    this.servicio.set(campo('servicio'));
    this.voltaje.set(campo('voltaje'));
    this.marca.set(campo('marca'));
    this.zona.set(campo('zona'));
    this.intento.set(true);
    if (!this.nombre().trim() || !this.servicio()) return;
    const mensaje = buildQuoteMessage({
      nombre: this.nombre(),
      servicio: this.servicio(),
      voltaje: this.voltaje(),
      marca: this.marca(),
      zona: this.zona(),
    });
    window.open(buildWhatsAppUrl(SITE.whatsapp, mensaje), '_blank', 'noopener');
  }
}
