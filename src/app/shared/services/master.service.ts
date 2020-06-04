import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, Request, Http, Response, RequestMethod, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/';
import { BaseService } from './base/base.service';
import { environment } from '../../../environments/environment'; 
import { TaxMasterDc } from '../models/tax-master-dc';
import { CurrencyMasterDc } from '../models/currency-master-dc';
import { SubscriptionPlanDc } from '../models/subscription-plan-dc';
import { FontDropdownDc } from '../models/font-master-dc';

@Injectable()
export class MasterService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
    }
 
    //Tax Master
    public GetTaxById(Id: string): Observable<any> {
        let url = "master/GetTaxById?TaxId=" + Id;
        return this.get<any>(environment.APIBaseUrl + url, null, 'GetTaxById');
    } 

    public GetTax(IsActive:string): Observable<Array<TaxMasterDc>> {
        let url = "master/GetTax?IsActive="+IsActive;
        return this.get<TaxMasterDc>(environment.APIBaseUrl + url, null, 'GetTax');
    } 

    public AddUpdateTaxMaster(TaxMasterDc: TaxMasterDc) {
        let url = "master/AddUpdateTaxMaster";
        return this.post(environment.APIBaseUrl + url, TaxMasterDc, null, 'AddUpdateTaxMaster');
    }

    public DeleteTaxById(Id: number) {
        let url = "master/DeleteTaxById?TaxId=" + Id;
        return this.get(environment.APIBaseUrl + url, null, 'DeleteTaxById');
    }

    //Currency Master
    public GetCurrencyById(Id: string): Observable<any> {
        let url = "master/GetCurrencyById?CurrencyId=" + Id;
        return this.get<any>(environment.APIBaseUrl + url, null, 'GetCurrencyById');
    } 

    public GetCurrency(IsActive:string): Observable<Array<CurrencyMasterDc>> {
        let url = "master/GetCurrency?IsActive="+IsActive;
        return this.get<CurrencyMasterDc>(environment.APIBaseUrl + url, null, 'GetCurrency');
    } 

    public AddUpdateCurrencyMaster(CurrencyMasterDc: CurrencyMasterDc) {
        let url = "master/AddUpdateCurrencyMaster";
        return this.post(environment.APIBaseUrl + url, CurrencyMasterDc, null, 'AddUpdateCurrencyMaster');
    }

    public DeleteCurrencyById(Id: number) {
        let url = "master/DeleteCurrencyById?CurrencyId=" + Id;
        return this.get(environment.APIBaseUrl + url, null, 'DeleteCurrencyById');
    }

    //Subscription Plan Master
    public GetSubscriptionPlanById(Id: string): Observable<any> {
        let url = "master/GetSubscriptionPlanById?SubscriptionPlanId=" + Id;
        return this.get<any>(environment.APIBaseUrl + url, null, 'GetSubscriptionPlanById');
    } 

    public GetSubscriptionPlan(IsActive:string): Observable<Array<SubscriptionPlanDc>> {
        let url = "master/GetSubscriptionPlan?IsActive="+IsActive;
        return this.get<SubscriptionPlanDc>(environment.APIBaseUrl + url, null, 'GetSubscriptionPlan');
    } 

    public AddUpdateSubscriptionPlan(SubscriptionPlanDc: SubscriptionPlanDc) {
        let url = "master/AddUpdateSubscriptionPlan";
        return this.post(environment.APIBaseUrl + url, SubscriptionPlanDc, null, 'AddUpdateSubscriptionPlan');
    }

    public DeleteSubscriptionPlanById(Id: number) {
        let url = "master/DeleteSubscriptionPlanById?SubscriptionPlanId=" + Id;
        return this.get(environment.APIBaseUrl + url, null, 'DeleteSubscriptionPlanById');
    }

    //Font Master

    public GetFontById(FontId: string): Observable<any> {
        let url = "master/GetFontById?FontId=" + FontId;
        return this.get<any>(environment.APIBaseUrl + url, null, 'GetFontById');
    } 

    public GetFontDropdown(): Observable<Array<FontDropdownDc>> {
        let url = "master/GetFontDropdown";
        return this.get<FontDropdownDc>(environment.APIBaseUrl + url, null, 'GetFontDropdown');
    } 

}