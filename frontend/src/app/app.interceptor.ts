import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
@Injectable()
export class FDAuthInterceptor implements HttpInterceptor {
  readonly apiURL = environment.apiURL;
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
        url: req.url.replace("fdb", this.apiURL)
      });

      return next.handle(req);
}
}




