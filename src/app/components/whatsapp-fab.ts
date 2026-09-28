import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../config/site.config';
import { buildWhatsAppUrl } from '../core/whatsapp';

@Component({
  selector: 'app-whatsapp-fab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="fab"
      [href]="url"
      target="_blank"
      rel="noopener"
      aria-label="Abrir chat de WhatsApp para cotizar"
    >
      <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="currentColor">
        <path
          d="M12 2a10 10 0 0 0-8.500 15.200L2 22l4.900-1.500A10 10 0 1 0 12 2Zm5.200 14c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .200-3.300-.700-2.800-1.200-4.500-4-4.700-4.200-.100-.200-1.100-1.400-1.100-2.700s.7-1.900.9-2.200c.2-.2.500-.3.700-.3h.500c.2 0 .4 0 .6.500l.8 2c.100.200.100.400 0 .500l-.4.600-.4.400c-.100.200-.3.400-.1.700.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.300.100.500.100.700-.100l.9-1.100c.200-.300.400-.200.700-.100l1.900.9c.300.100.500.200.500.300.100.100.100.700-.100 1.300Z"
        />
      </svg>
    </a>
  `,
  styles: `
    .fab { position: fixed; right: 16px; bottom: 16px; z-index: 30; width: 60px; height: 60px; border-radius: 50%;
      display: grid; place-items: center; background: #0f7a40; color: #fff; box-shadow: 0 4px 14px rgb(0 0 0 / .3); }
    .fab:hover { background: #0e6f3a; }
    .fab:focus-visible { outline: 3px solid #fff; outline-offset: 2px; box-shadow: 0 0 0 6px #0f7a40; }
  `,
})
export class WhatsappFab {
  protected readonly url = buildWhatsAppUrl(SITE.whatsapp, SITE.mensajeGenerico);
}
