import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get<T>(url: string, options?: { headers?: HttpHeaders, params?: HttpParams, responseType?: any }): Observable<T> {
    return this.httpClient.get<T>(this.getApiUrl(url), options);
  }

  post<T>(url: string, data: any, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
    return this.httpClient.post<T>(this.getApiUrl(url), data, options);
  }

  put<T>(url: string, data: any, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
    return this.httpClient.put<T>(this.getApiUrl(url), data, options);
  }

  delete<T>(url: string, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
    return this.httpClient.delete<T>(this.getApiUrl(url), options);
  }

  patch<T>(url: string, data?: any, options?: { headers?: HttpHeaders, params?: HttpParams }): Observable<T> {
    return this.httpClient.patch<T>(this.getApiUrl(url), data, options);
  }

  private getApiUrl(url: string): string {
    return environment.apiUrl + url;
  }

}
