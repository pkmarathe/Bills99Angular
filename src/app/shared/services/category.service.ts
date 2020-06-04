import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Headers, Request, Http, Response, RequestMethod, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/';
import { BaseService } from './base/base.service';
import { environment } from '../../../environments/environment'; 
import { CategorySearchDc,CategoryMasterDc, CategoryRecieptDc } from '../models/category-master-dc'; 

@Injectable()
export class CategoryService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
    }

    // Category Service
    public SearchCategory(entity: CategorySearchDc) {
        let url = "category/SearchCategory";
        return this.post(environment.APIBaseUrl + url, entity, null, 'SearchCategory');
    }

    public GetCategoryById(Id: string): Observable<any> {
        let url = "category/GetCategoryById?CategoryId=" + Id;
        return this.get<any>(environment.APIBaseUrl + url, null, 'GetCategoryById');
    }
     
    public AddUpdateCategoryMaster(CategoryMasterDc: CategoryMasterDc) {
        let url = "category/AddUpdateCategoryMaster";
        return this.post(environment.APIBaseUrl + url, CategoryMasterDc, null, 'AddUpdateCategoryMaster');
    }

    public DeleteCategoryById(Id: number) {
        let url = "category/DeleteCategoryById?CategoryId=" + Id;
        return this.get(environment.APIBaseUrl + url, null, 'DeleteCategoryById');
    }

    // Category Reciept Service
    public GetCategoryReciept(CategoryId:number): Observable<Array<CategoryRecieptDc>> {
        let url = "category/GetCategoryReciept?CategoryId="+CategoryId;
        return this.get<CategoryRecieptDc>(environment.APIBaseUrl + url, null, 'GetCategoryReciept');
    }

    public GetCategoryRecieptById(Id: string): Observable<any> {
        let url = "category/GetCategoryRecieptById?CategoryRecieptId=" + Id;
        return this.get<any>(environment.APIBaseUrl + url, null, 'GetCategoryRecieptById');
    }
    
    public AddUpdateCategoryReciept(CategoryRecieptDc: CategoryRecieptDc) {
        let url = "category/AddUpdateCategoryReciept";
        return this.post(environment.APIBaseUrl + url, CategoryRecieptDc, null, 'AddUpdateCategoryReciept');
    }

    public DeleteCategoryRecieptById(Id: number) {
        let url = "category/DeleteCategoryRecieptById?CategoryRecieptId=" + Id;
        return this.get(environment.APIBaseUrl + url, null, 'DeleteCategoryRecieptById');
    }


}