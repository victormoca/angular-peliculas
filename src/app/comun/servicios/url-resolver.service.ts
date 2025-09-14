// src/app/comun/servicios/url-resolver.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UrlResolverService {
  private readonly baseNoApi =
    (environment.apiUrl ?? '').replace(/\/+$/, '').replace(/\/api$/, '');

  private readonly filesBase =
    (environment as any).filesBaseUrl
      ? String((environment as any).filesBaseUrl).replace(/\/+$/, '')
      : this.baseNoApi;

  private readonly fallback = '/assets/no-image.png'; // ajusta si tu PNG está en otra carpeta

  resolve(pathOrUrl?: string | null): string {
    if (!pathOrUrl) return this.fallback;

    let u = String(pathOrUrl)
      .replace('http:://', 'http://')
      .replace('https:://', 'https://');

    // Absoluta (Azure o localhost absoluto)
    if (/^https?:\/\//i.test(u)) return u;

    // Relativa (p.ej. /actores/xxx.jfif)
    if (!u.startsWith('/')) u = '/' + u;
    return `${this.filesBase}${u}`;
  }

  getFallback(): string {
    return this.fallback;
  }
}
