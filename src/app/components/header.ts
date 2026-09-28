import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SITE } from '../config/site.config';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="container header__inner">
        <a class="brand" href="#inicio" (click)="cerrar()">
          <span class="brand__logo" aria-hidden="true">❄</span>{{ sitio.nombre }}
        </a>
        <button
          type="button"
          class="menu-btn"
          [attr.aria-expanded]="abierto()"
          aria-controls="menu-principal"
          aria-label="Abrir o cerrar el menú"
          (click)="abierto.set(!abierto())"
        >
          <span aria-hidden="true">{{ abierto() ? '✕' : '☰' }}</span>
        </button>
        <nav id="menu-principal" class="nav" [class.nav--open]="abierto()" aria-label="Principal">
          <a href="#servicios" (click)="cerrar()">Servicios</a>
          <a href="#nosotros" (click)="cerrar()">Nosotros</a>
          <a href="#contacto" (click)="cerrar()">Contacto</a>
        </nav>
      </div>
    </header>
  `,
  styles: `
    .header { position: sticky; top: 0; z-index: 20; background: var(--c-surface); border-bottom: 1px solid var(--c-border); }
    .header__inner { display: flex; align-items: center; justify-content: space-between; min-height: 64px; position: relative; }
    .brand { display: flex; align-items: center; gap: .5rem; font-weight: 800; font-size: 1.25rem; color: var(--c-primary-dark); text-decoration: none; }
    .brand__logo { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--c-primary); color: #fff; }
    .menu-btn { background: none; border: 1px solid var(--c-border); border-radius: 8px; width: 44px; height: 44px; font-size: 1.25rem; cursor: pointer; color: var(--c-text); }
    .nav { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--c-surface); border-bottom: 1px solid var(--c-border); padding: .5rem 1rem 1rem; }
    .nav--open { display: flex; }
    .nav a { padding: .75rem 0; color: var(--c-text); text-decoration: none; font-weight: 600; }
    .nav a:hover { color: var(--c-primary-dark); }
    @media (min-width: 768px) {
      .menu-btn { display: none; }
      .nav { display: flex; position: static; flex-direction: row; gap: 1.5rem; border: 0; padding: 0; background: none; }
      .nav a { padding: .5rem 0; }
    }
  `,
})
export class Header {
  protected readonly sitio = SITE;
  protected readonly abierto = signal(false);
  protected cerrar(): void {
    this.abierto.set(false);
  }
}
