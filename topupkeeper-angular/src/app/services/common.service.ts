import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private readonly apiURL: string = environment.apiURL;

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  getCountries(): Observable<any[]>  {
   return this.http.get<any[]>(this.apiURL + '/init');
  }


}
