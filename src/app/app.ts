import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { ServicesCarousel } from './components/services-carousel';
import { About } from './components/about';
import { ContactForm } from './components/contact-form';
import { Footer } from './components/footer';
import { WhatsappFab } from './components/whatsapp-fab';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, ServicesCarousel, About, ContactForm, Footer, WhatsappFab],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-services-carousel />
      <app-about />
      <app-contact-form />
    </main>
    <app-footer />
    <app-whatsapp-fab />
  `,
})
export class App {}
