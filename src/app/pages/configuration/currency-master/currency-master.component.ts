import { Component, OnInit } from '@angular/core';
import { CurrencyMasterDc } from '../../../../app/shared/models/currency-master-dc';
import { MasterService } from '../../../../app/shared/services/master.service';
@Component({
  selector: 'app-currency-master',
  templateUrl: './currency-master.component.html',
  styleUrls: ['./currency-master.component.scss']
})
export class CurrencyMasterComponent implements OnInit {

  public currencyMasterAddDc: CurrencyMasterDc = new CurrencyMasterDc();
  public currencyMasterDc: Array<CurrencyMasterDc> = [];
  error: any;
  success: any;
  constructor(private masterService: MasterService) { }

  ngOnInit() {
    this.currencyMasterAddDc.CurrencyId = 0;
    this.currencyMasterAddDc.IsActive = true;
    this.getCurrencylist();
  }

  getCurrencylist() {
    this.masterService.GetCurrency("All")
      .subscribe(
        res => {
          if (res != null) {
            this.currencyMasterDc = res;
          }
        }
      )
  }

  onAddUpdateCurrency() {
    if (this.currencyMasterAddDc.Currency != "" && this.currencyMasterAddDc.Currency != undefined) {
      this.masterService.AddUpdateCurrencyMaster(this.currencyMasterAddDc)
        .subscribe(
          res => {
            if (res > 0) {
              if (this.currencyMasterAddDc.CurrencyId == 0) {
                this.success = 'Currency Added Successfully';
              }
              else {
                this.currencyMasterAddDc.CurrencyId = 0;
                this.success = 'Currency Updated Successfully';
              }
              this.onCancel();
              this.getCurrencylist();
            }
            else {
              this.error = 'Currency Not Add/Update';
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

  onEditCurrency(CurrencyId: string) {
    this.masterService.GetCurrencyById(CurrencyId)
      .subscribe(
        res => {
          let countryTableDc: CurrencyMasterDc = res;
          this.currencyMasterAddDc.CurrencyId = countryTableDc.CurrencyId;
          this.currencyMasterAddDc.Currency = countryTableDc.Currency;
          this.currencyMasterAddDc.IsActive = countryTableDc.IsActive;
        },
        error => { }
      )
  }

  onCancel()
  {  
    this.currencyMasterAddDc.CurrencyId = 0; 
    this.currencyMasterAddDc.Currency = ""; 
  }

  onDeleteCurrency(Id: number) {
    this.masterService.DeleteCurrencyById(Id)
      .subscribe(
        res => {
          debugger;
          if (res == true) {
            this.success = 'Currency Inactive Successfully';
            this.getCurrencylist();
          }
          else {
            this.error = 'Currency Not Inactive';
          }
        },
      )
  }

}
