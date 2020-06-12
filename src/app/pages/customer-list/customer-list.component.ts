import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../../app/shared/services/registration.service';
import { RegistrationSearchDc, RegistrationTableDc, FileExportDc } from '../../../app/shared/models/registration-table-dc';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public registrationSearchDc: RegistrationSearchDc = new RegistrationSearchDc();
  public FileExportDc: FileExportDc = new FileExportDc();
  public registrationDc: Array<RegistrationTableDc> = [];
  pageSize = 10;
  pageNumber = 1;
  error: any;
  success: any;
  UserId: number;
  IsActive: string;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private regService: RegistrationService) { }

  ngOnInit() {
    this.registrationSearchDc.IsActive = "True";
    this.getcustomerlist();
  }

  getcustomerlist() {
    this.spinnerService.show();
    this.regService.SearchRegistration(this.registrationSearchDc)
      .subscribe(
        res => {
          if (res != null) {
            this.registrationDc = res;
          }
          this.spinnerService.hide();
        }
      )
  }

  activeinactivecustomer(modal) {
    debugger;
    this.spinnerService.show();
    this.regService.DeleteRegistrationById(this.UserId, this.IsActive)
      .subscribe(
        res => {
          debugger;
          if (res == true) {
            if (this.IsActive == "true")
              this.success = 'Customer active successfully'
            else
              this.success = 'Customer inactive successfully'

            this.closeModal(modal);
            this.getcustomerlist();
          }
          else
            this.error = 'Some thing went wrong!!'
          this.spinnerService.hide();
        }
      )
  }

  openModal(modal, uid, isact) {
    this.UserId = uid;
    this.IsActive = isact;
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  }

  export() {
    let htmltext: string = "";
    this.spinnerService.show();
    this.FileExportDc.FileName = "Customer_List.xls";
    htmltext += "<table>";
    htmltext += "<tr><th>#</th><th>Name</th><th>Designation</th><th>Mobile No</th><th>EmailId</th><th>Address</th><th>Active</th></tr>";
    debugger;
    for (let index = 0; index < this.registrationDc.length; index++) {
      let prod = this.registrationDc[index];
      htmltext += "<tr><td>" + (Number(index) + 1) + "</td><td>" + prod.Name + "</td><td>" + prod.Designation + "</td><td>" + prod.MobileNo + "</td><td>" + prod.EmailId + "</td><td>" + prod.Address + "</td><td>" + prod.IsActive + "</td></tr>";
    }
    htmltext += "</table>";
    debugger;
    this.FileExportDc.HtmlText = htmltext;
    this.regService.ExportToExcel(this.FileExportDc)
      .subscribe(
        res => {
          debugger;
          if (res != null && res != '') {
            window.open(environment.ImageBaseUrl + "ExportSheet/" + this.FileExportDc.FileName);
          }
          this.spinnerService.hide();
        }
      )
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
