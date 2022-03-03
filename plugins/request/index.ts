import { of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mapTo, retry } from 'rxjs/operators';
import { CourseApi } from './apis/course';
import HttpConfig from './config';

export class RxRequest {
  public courseApi: CourseApi = new CourseApi();
}

export class RxHttpMentoh {
  private headers: any = HttpConfig.headers;
  private base_url = HttpConfig.baseURL;

  public Get<P, T>(url: string, params?: P | any) {
    return ajax<T>({
      url: `${this.base_url}${url}`,
      queryParams: params,
      method: 'GET',
      headers: this.headers,
    }).pipe(
      retry(5),
      map((res: any) => {
        if (!res.response) {
          throw new Error('Value expected!');
        }
        const { data } = res.response;
        return data;
      }),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  public Post<P, D, T>(url: string, data: D | any, params: P | any) {
    return ajax<T>({
      url: `${this.base_url}${url}`,
      queryParams: params,
      body: data,
      method: 'POST',
      headers: this.headers,
    }).pipe(
      retry(5),
      map((res: any) => {
        if (!res.response) {
          throw new Error('Value expected!');
        }
        const { data } = res.response;
        return data;
      }),
      catchError((err) => of([]))
    );
  }
}
