import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, Request, Http, Response, RequestMethod, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/';
import { BaseService } from './base/base.service';
import { environment } from '../../../environments/environment';
import { SubscriptionPlanPaymentSearchDc, SubscriptionPlanPaymentDc, SubscriptionPlanPaymentInputDc, PaymentCurrencyDc, PaymentCheckoutDc, PaymentResponseModel } from '../models/subscription-plan-payment-dc';

@Injectable()
export class SubscriptionPlanPayService extends BaseService {

    constructor(public _http: Http, http: HttpClient) {
        super(http);
    }


    public SearchSubscriptionPlanPay(entity: SubscriptionPlanPaymentSearchDc) {
        let url = "subscriptionplanpay/SearchSubscriptionPlanPay";
        return this.post(environment.APIBaseUrl + url, entity, null, 'SearchSubscriptionPlanPay');
    }

    public GetSubscriptionPlanPayById(Id: string): Observable<any> {
        let url = "subscriptionplanpay/GetSubscriptionPlanPayById?SubscriptionPlanPayId=" + Id;
        return this.get<any>(environment.APIBaseUrl + url, null, 'GetSubscriptionPlanPayById');
    }

    public AddUpAddUpdateSubscriptionPlanPaydateBillReciept(SubscriptionPlanPaymentInputDc: SubscriptionPlanPaymentInputDc) {
        let url = "subscriptionplanpay/AddUpdateSubscriptionPlanPay";
        return this.post(environment.APIBaseUrl + url, SubscriptionPlanPaymentInputDc, null, 'AddUpdateSubscriptionPlanPay');
    }
    public DeleteSubscriptionPlanPayById(Id: number) {
        let url = "subscriptionplanpay/DeleteSubscriptionPlanPayById?UserId=" + Id;
        return this.get(environment.APIBaseUrl + url, null, 'DeleteSubscriptionPlanPayById');
    }
    public GetPaymentCurrency(Currency: string): Observable<Array<PaymentCurrencyDc>> {
        let url = "subscriptionplanpay/GetPaymentCurrency?Currency=" + Currency;
        return this.get<PaymentCurrencyDc>(environment.APIBaseUrl + url, null, 'GetPaymentCurrency');
    }

    public GetSessionId(entity: PaymentCheckoutDc): Observable<PaymentResponseModel> {
        let url = "subscriptionplanpay/GetSessionId";
        return this.post(environment.APIBaseUrl + url, entity, null, 'GetSessionId');
    }

}