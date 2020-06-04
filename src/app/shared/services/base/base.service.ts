//import { HttpErrorHandlerService, HandleError } from "../common/http-error-handler.service";

import { HttpHeaders, HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { ResponseContentType, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";

export abstract class BaseService {

    //protected handleError: HandleError;

    constructor(private http: HttpClient) {
    }

    protected get<T>(url: string, httpOptions: any, actionMethodName: string): Observable<any> {
        httpOptions = this.setRequestOptions(httpOptions);

        return this.http.get<Array<T>>(url, httpOptions).pipe(
            // catchError(this.handleError(actionMethodName, []))
        );
    }

    // protected getAsync<T>(url: string, httpOptions: any, actionMethodName: string): Observable<any> {
    //     httpOptions = this.setRequestOptions(httpOptions);

    //     return this.http.get<Array<T>>(url, httpOptions).pipe(
    //         catchError(this.handleError(actionMethodName, []))
    //     );
    // }

    protected async getAsync<T>(url: string, httpOptions: any, actionMethodName: string) {
        httpOptions = this.setRequestOptions(httpOptions);
        return await this.http.get<T>(url, httpOptions).toPromise();
    }


    /**
     * Executes the post request with given uri parameters and header values.
     * @param url: The reqeust URI. 
     * @param data: The reqeust object. 
     * @param args: The request argument. 
     */
    protected post<T>(url: string, data: T, httpOptions: any, actionMethodName: string): Observable<any> {

        httpOptions = this.setRequestOptions(httpOptions);
        return this.http.post<T>(url, data, httpOptions).pipe(
            //catchError(this.handleError(actionMethodName, []))
        );
    }

    /**
     * Executes the post request with given uri parameters and header values.
     * @param url: The reqeust URI. 
     * @param data: The reqeust object. 
     * @param args: The request argument. 
     */
    protected postFile(url: string, data: any, httpOptions: any, actionMethodName: string): Observable<any> {
        httpOptions = this.setRequestOptions(httpOptions);
        return this.http.post(url, data, httpOptions).pipe(
            //catchError(this.handleError(actionMethodName, []))
        );
    }

    public getFile(url: string): Observable<any> {
        let httpOptions: any = {};
        httpOptions.headers = new HttpHeaders();
        httpOptions.headers.set('Content-Type', 'application/json');
        httpOptions.headers.set('Accept', 'application/json');

        //  httpOptions.headers.set('responseType', ResponseContentType.Blob);
        return this.http.get(url, httpOptions).pipe(
            //catchError(this.handleError("", []))
        );
    }

    /**
     * Executes the put request with given uri parameters and header values.
     * @param url: The reqeust URI.
     * @param data: The reqesut object.
     * @param args: The reqesut argument.
     */
    protected put<T>(url: string, data: any, httpOptions: any, actionMethodName: string): Observable<any> {
        httpOptions = this.setRequestOptions(httpOptions);
        return this.http.put<T>(url, data, httpOptions).pipe(
            //catchError(this.handleError(actionMethodName, []))
        );
    }

    /**
    * Executes the put request with given uri parameters and header values.
     * @param url: The reqeust URI.
     * @param data: The reqesut object.
     * @param args: The reqesut argument.
     */
    protected delete(url: string, httpOptions: any, actionMethodName: string): Observable<any> {
        httpOptions = this.setRequestOptions(httpOptions);
        return this.http.delete(url, httpOptions).pipe(
            //catchError(this.handleError(actionMethodName, []))
        );
    }


    private setRequestOptions(httpOptions: any): any {
        debugger;
        // if (httpOptions == null) {
            // If reqeust option is null
            if (httpOptions == null) {
                httpOptions = {};
            }

            // If reqeust header is null
            if (httpOptions.headers == null) {
                httpOptions.headers = new HttpHeaders();
            }

            // Add default header 
            httpOptions.headers.set('Content-Type', 'application/json');
            httpOptions.headers.set('Accept', 'application/json');
        // }
    }
}