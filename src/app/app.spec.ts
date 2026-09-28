import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SITE } from './config/site.config';

describe('App', () => {
  it('renderiza las secciones y todos los enlaces de WhatsApp usan el número configurado', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')).toBeTruthy();
    expect(el.querySelector('#servicios')).toBeTruthy();
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]'));
    expect(links.length).toBeGreaterThan(2);
    for (const a of links) expect(a.href.startsWith(`https://wa.me/${SITE.whatsapp}`)).toBe(true);
  });
});
