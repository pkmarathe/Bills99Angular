import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, Request, Http, Response, RequestMethod, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/';
import { BaseService } from './base/base.service';
import { environment } from '../../../environments/environment'; 
import { BillRecieptSearchDc,BillRecieptDc } from '../models/bill-reciept-dc';

@Injectable()
export class BillRecieptService extends BaseService {

    constructor(public _http: Http, http: HttpClient) {
        super(http);
    }


    public SearchBillReciept(entity: BillRecieptSearchDc) {
        let url = "billreciept/SearchBillReciept";
        return this.post(environment.APIBaseUrl + url, entity, null, 'SearchBillReciept');
    }

    public GetBillRecieptById(BillRecieptId: string): Observable<any> {
        let url = "billreciept/GetBillRecieptById?BillRecieptId=" + BillRecieptId;
        return this.get<any>(environment.APIBaseUrl + url, null, 'GetBillRecieptById');
    } 

    public AddUpdateBillReciept(BillRecieptDc: BillRecieptDc) : Observable<any>{
        let file: FormData = BillRecieptDc.FormDataImages; 
        let headers: Headers = new Headers();
        headers.append('RequestModel', JSON.stringify(BillRecieptDc)); 
        let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headers });
        let url = "billreciept/AddUpdateBillReciept";
        return this._http.post(environment.APIBaseUrl + url, file, reqOption);
    } 

    public DeleteBillRecieptById(Id: number) {
        let url = "billreciept/DeleteBillRecieptById?BillRecieptId=" + Id;
        return this.get(environment.APIBaseUrl + url, null, 'DeleteBillRecieptById');
    }


}