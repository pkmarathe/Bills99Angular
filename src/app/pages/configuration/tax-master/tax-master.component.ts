import { Component, OnInit } from '@angular/core';
import { TaxMasterDc } from '../../../../app/shared/models/tax-master-dc';
import { MasterService } from '../../../../app/shared/services/master.service';

@Component({
  selector: 'app-tax-master',
  templateUrl: './tax-master.component.html',
  styleUrls: ['./tax-master.component.scss']
})
export class TaxMasterComponent implements OnInit {
  public taxMasterAddDc: TaxMasterDc = new TaxMasterDc();
  public taxMasterDc: Array<TaxMasterDc> = [];
  error: any;
  success: any;
  constructor(private masterService: MasterService) { }

  ngOnInit() {
    this.taxMasterAddDc.TaxId = 0;
    this.taxMasterAddDc.IsActive = true;
    this.gettaxlist();
  }

  gettaxlist() {
    this.masterService.GetTax("All")
      .subscribe(
        res => {
          if (res != null) {
            this.taxMasterDc = res;
          }
        }
      )
  }

  onAddUpdateTax() {
    if (this.taxMasterAddDc.Tax != "" && this.taxMasterAddDc.Tax != undefined) {
      this.masterService.AddUpdateTaxMaster(this.taxMasterAddDc)
        .subscribe(
          res => {
            if (res > 0) {
              if (this.taxMasterAddDc.TaxId == 0) {
                this.success = 'Tax Added Successfully';
              }
              else {
                this.taxMasterAddDc.TaxId = 0;
                this.success = 'Tax Updated Successfully';
              }
              this.onCancel();
              this.gettaxlist();
            }
            else {
              this.error = 'Tax Not Add/Update';
            }
          },
          error => {
            this.error = error;
          });
    }
    else {
      this.error = 'Please fill required fields';
    }
  }

  onEditTax(TaxId: string) {
    this.masterService.GetTaxById(TaxId)
      .subscribe(
        res => {
          let countryTableDc: TaxMasterDc = res;
          this.taxMasterAddDc.TaxId = countryTableDc.TaxId;
          this.taxMasterAddDc.Tax = countryTableDc.Tax;
          this.taxMasterAddDc.IsActive = countryTableDc.IsActive;
        },
        error => { }
      )
  }

  onCancel()
  {  
    this.taxMasterAddDc.TaxId = 0; 
    this.taxMasterAddDc.Tax = ""; 
  }

  onDeleteTax(Id: number) {
    this.masterService.DeleteTaxById(Id)
      .subscribe(
        res => {
          if (res == true) {
            this.success = 'Deleted Successfully';
            this.gettaxlist();
          }
          else {
            this.error = 'Tax Not Deleted';
          }
        },
      )
  }

}
