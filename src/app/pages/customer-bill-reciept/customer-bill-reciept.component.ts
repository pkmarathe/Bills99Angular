import { Component, OnInit } from '@angular/core';
import { BillRecieptDc, BillRecieptSearchDc } from '../../../app/shared/models/bill-reciept-dc';
import { CategoryMasterDc, CategorySearchDc } from '../../../app/shared/models/category-master-dc';
import { BillRecieptService } from '../../../app/shared/services/bill-reciept.service';
import { CategoryService } from '../../../app/shared/services/category.service';
import { RegistrationService } from '../../../app/shared/services/registration.service';
import { RegistrationDropdownDc } from '../../../app/shared/models/registration-table-dc';
//import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../../app/shared/services/common/localstorage.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-customer-bill-reciept',
  templateUrl: './customer-bill-reciept.component.html',
  styleUrls: ['./customer-bill-reciept.component.scss']
})
export class CustomerBillRecieptComponent implements OnInit {
  public billRecieptDc: Array<BillRecieptDc> = [];
  public categoryMasterDc: Array<CategoryMasterDc> = [];
  public registrationDropdownDc: Array<RegistrationDropdownDc> = [];
  public billRecieptSearchDc: BillRecieptSearchDc = new BillRecieptSearchDc();
  error: any;
  success: any;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private router: Router, public lsService: LocalStorageService, private datePipe: DatePipe, private categoryService: CategoryService, private billRecieptService: BillRecieptService, private registrationService: RegistrationService) { }

  ngOnInit() {
    this.billRecieptSearchDc.RecieptFromDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    this.billRecieptSearchDc.RecieptToDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    this.billRecieptSearchDc.CategoryId = 0;
    this.billRecieptSearchDc.UserId = 0;
    //this.datePipe.transform(countryTableDc.DOB, 'MM/dd/yyyy');//moment(countryTableDc.DOB).toDate().toDateString();
    this.GetRegistrationDropdown();
    this.GetCategoryDropdown();
    this.searchbillreciept();
  }

  searchbillreciept() {
    this.spinnerService.show();
    if (this.lsService.getloginRole() != 'admin')
      this.billRecieptSearchDc.UserId = this.lsService.getloginId();
    this.billRecieptSearchDc.RecieptFromDate = this.datePipe.transform(this.billRecieptSearchDc.RecieptFromDate, 'MM/dd/yyyy');
    this.billRecieptSearchDc.RecieptToDate = this.datePipe.transform(this.billRecieptSearchDc.RecieptToDate, 'MM/dd/yyyy');
    this.billRecieptService.SearchBillReciept(this.billRecieptSearchDc)
      .subscribe(
        res => {
          if (res != null) {
            this.billRecieptDc = res;
            this.spinnerService.hide();
          }
          this.spinnerService.hide();
        }
      )
  }

  GetRegistrationDropdown() {
    this.spinnerService.show();
    this.registrationService.GetRegistrationDropdown("customer").subscribe(
      res => {
        this.registrationDropdownDc = res;
        this.spinnerService.hide();
      },
      error => { this.spinnerService.hide(); }
    )
  }

  GetCategoryDropdown() {
    this.spinnerService.show();
    let categorySearchDc: CategorySearchDc = new CategorySearchDc();
    categorySearchDc.IsActive = "True";
    this.categoryService.SearchCategory(categorySearchDc).subscribe(
      res => {
        this.categoryMasterDc = res;
        this.spinnerService.hide();
      },
      error => { this.spinnerService.hide();}
    )
  }

  onDownload(billrecieptid: number) {
    window.open(environment.ImageBaseUrl + "RecieptPdf/bill_reciept_" + billrecieptid + ".pdf");
  }
  onEdit(billrecieptid: number) {
    this.router.navigate(['/pages/generate-bill-reciept/generate-reciept-pdf'], { queryParams: { brid: billrecieptid } });
  }

  onDelete(billreceiptId: number) {
    this.spinnerService.show();
    this.billRecieptService.DeleteBillRecieptById(billreceiptId)
      .subscribe(
        res => {
          if (res == true) {             
              this.success = 'Receipt deleted successfully'
              this.searchbillreciept();
          }
          else
            this.error = 'Some thing went wrong!!'

          this.spinnerService.hide();
        }
      )
  }

}
