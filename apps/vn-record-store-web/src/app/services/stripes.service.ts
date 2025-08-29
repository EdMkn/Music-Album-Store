import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CartStore } from '../stores/cart.store';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripesService {

  cartStore = inject(CartStore);
  http = inject(HttpClient);
  platformId = inject(PLATFORM_ID);

  private get apiUrl(): string {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      // Browser: use environment configuration or fallback to relative URL for local dev
      if (environment.githubPages || environment.production) {
        console.log('🌐 Stripe Service - Production/GitHub Pages mode:', environment.apiBaseUrl);
        return environment.apiBaseUrl;
      } else {
        // Local development: use relative URL (proxied to backend)
        console.log('🌐 Stripe Service - Local development mode: /api');
        return '/api';
      }
    }
    
    // SSR: Check environment for proper URL
    const isDocker = typeof process !== 'undefined' && (
      process.env['DOCKER_ENV'] === 'true' || 
      process.env['NODE_ENV'] === 'production' ||
      process.env['CONTAINER_NAME']
    );
    
    const apiUrl = isDocker ? 'http://backend:3000/api' : 'http://localhost:3000/api';
    console.log(`🔧 Stripe Service - SSR mode (${isDocker ? 'Docker' : 'Local'}):`, apiUrl);
    return apiUrl;
  }

  createCheckoutSession() {
    const items = this.cartStore.items();
    const totalAmount = this.cartStore.totalAmount();

    return this.http.post<{url: string}>(
      `${this.apiUrl}/checkout`, 
      {
        albumItems: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          stripePriceId: item.stripePriceId
        })),
        totalAmount,
      }
    );

  }
}
