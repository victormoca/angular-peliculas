import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UrlResolverService } from '../servicios/url-resolver.service';

export const imagenUrlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const resolver = inject(UrlResolverService);
  const keys = new Set(['foto', 'imagen', 'poster']); // agrega otras claves si necesitas

  const transform = (val: any): any => {
    if (Array.isArray(val)) return val.map(transform);
    if (val && typeof val === 'object') {
      const out: any = Array.isArray(val) ? [] : { ...val };
      for (const k of Object.keys(val)) {
        const v = (val as any)[k];
        out[k] = (typeof v === 'string' && keys.has(k))
          ? resolver.resolve(v)
          : transform(v);
      }
      return out;
    }
    return val;
  };

  return next(req).pipe(
    map((evt) =>
      evt instanceof HttpResponse && evt.body != null
        ? evt.clone({ body: transform(evt.body) })
        : evt
    )
  );
};
