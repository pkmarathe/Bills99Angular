import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, Request, Http, Response, RequestMethod, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/';
import { BaseService } from './base/base.service';
import { environment } from '../../../environments/environment';
import { RegistrationSearchDc, RegistrationTableDc, RegistrationDropdownDc,FileExportDc } from '../models/registration-table-dc';
import { DashboardDc } from '../models/dashboard-dc';

@Injectable()
export class RegistrationService extends BaseService {

    constructor(private _http: Http, http: HttpClient) {
        super(http);
    }


    public SearchRegistration(entity: RegistrationSearchDc) {
        let url = "registration/SearchRegistration";
        return this.post(environment.APIBaseUrl + url, entity, null, 'SearchRegistration');
    }

    public GetRegistrationById(Id: string): Observable<any> {
        let url = "registration/GetRegistrationById?UserId=" + Id;
        return this.get<any>(environment.APIBaseUrl + url, null, 'GetRegistrationById');
    }

    public GetRegistrationByCredential(emailid: string, password: string): Observable<RegistrationTableDc> {
        let url = "registration/GetRegistrationByCredential?emailid=" + emailid + "&password=" + password;
        return this.get<RegistrationTableDc>(environment.APIBaseUrl + url, null, 'GetRegistrationByCredential');
    }

    public GetDashboardData(CommonId: string, Role: string): Observable<DashboardDc> {
        let url = "registration/GetDashboardData?CommonId=" + CommonId + "&Role=" + Role;
        return this.get<DashboardDc>(environment.APIBaseUrl + url, null, 'GetDashboardData');
    }

    public GetRegistrationDropdown(Role: string): Observable<Array<RegistrationDropdownDc>> {
        let url = "registration/GetRegistrationDropdown?Role=" + Role;
        return this.get<RegistrationTableDc>(environment.APIBaseUrl + url, null, 'GetRegistrationDropdown');
    }

    public ChangePassword(emailid: string, oldpassword: string, newpassword: string) {
        let url = "registration/ChangePassword?emailid=" + emailid + "&oldpassword=" + oldpassword + "&newpassword=" + newpassword;
        return this.get(environment.APIBaseUrl + url, null, 'ChangePassword');
    }

    public ForgotPassword(EmailId: string) {
        let url = "registration/ForgotPassword?EmailId=" + EmailId;
        return this.get(environment.APIBaseUrl + url, null, 'ForgotPassword');
    }

    public AddUserRegistration(RegistrationTableDc: RegistrationTableDc) {
        let file: FormData = RegistrationTableDc.ProfileImage
        RegistrationTableDc.ProfileImage = "";
        let headers: Headers = new Headers();
        headers.append('RequestModel', JSON.stringify(RegistrationTableDc));
        let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headers });
        let url = "registration/AddUpdateRegistration";
        return this._http.post(environment.APIBaseUrl + url, file, reqOption);
    }

    public AddRegistration(RegistrationTableDc: RegistrationTableDc) {
        let url = "registration/AddRegistration";
        return this.post(environment.APIBaseUrl + url, RegistrationTableDc, null, 'AddRegistration');
    }

    public DeleteRegistrationById(Id: number, isactive: string) {
        let url = "registration/DeleteRegistrationById?UserId=" + Id + "&IsActive=" + isactive;
        return this.get(environment.APIBaseUrl + url, null, 'DeleteRegistrationById');
    } 

    public ExportToExcel(FileExportDc: FileExportDc) {
        let url = "registration/ExportToExcel";
        return this.post(environment.APIBaseUrl + url, FileExportDc, null, 'ExportToExcel');
    }

}