import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoryRecieptDc, CategoryRecieptPDFDc } from '../../../../app/shared/models/category-master-dc';
import { CategoryService } from '../../../../app/shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BillRecieptDc, BillRecieptTaxInfoDc, BillRecieptItemInfoDc } from '../../../../app/shared/models/bill-reciept-dc';
import { BillRecieptService } from '../../../../app/shared/services/bill-reciept.service';
import { MasterService } from '../../../../app/shared/services/master.service';
import { TaxMasterDc } from '../../../../app/shared/models/tax-master-dc';
import { CurrencyMasterDc } from '../../../../app/shared/models/currency-master-dc';
import { LocalStorageService } from '../../../../app/shared/services/common/localstorage.service';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import { RootComponent } from '../../../../app/shared/roots/root.component';
import { GlobalService } from '../../../../app/shared/services/global.service';
import { FontDropdownDc } from '../../../../app/shared/models/font-master-dc';
import { BillRecieptEnableDc } from '../../../../app/shared/models/bill-reciept-enable.-c';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-generate-reciept-pdf',
  templateUrl: './generate-reciept-pdf.component.html',
  styleUrls: ['./generate-reciept-pdf.component.scss']
})
export class GenerateRecieptPdfComponent extends RootComponent implements OnInit {
  public billRecieptAddDc: BillRecieptDc = new BillRecieptDc();
  public categoryRecieptDc: CategoryRecieptDc = new CategoryRecieptDc();
  public bREnableDc: BillRecieptEnableDc = new BillRecieptEnableDc();
  public taxDropdownDc: Array<TaxMasterDc> = [];
  public fontDropdownDc: Array<FontDropdownDc> = [];
  public currencyDropdownDc: Array<CurrencyMasterDc> = [];
  BillRecieptTaxInfoDc: Array<BillRecieptTaxInfoDc> = [];
  BillRecieptItemInfoDc: Array<BillRecieptItemInfoDc> = [];
  CategoryRecieptId: number;
  TaxId: number;
  TaxInPercentage: number;
  ItemName: string;
  Quantity: number;
  Price: number;
  ItemNo: string;
  Description: string;
  Type: string;
  Mfrs: string;
  BatchNo: string;
  Expiry: string;
  UOM: string;
  BillRecieptDynamicHtml: string;
  RecieptType: string;
  @ViewChild('fileInput') myFileInput: ElementRef;
  @ViewChild('fileInputpi') myFileInputpi: ElementRef;
  @ViewChild('fileInputbci') myFileInputbci: ElementRef;
  constructor(private sanitizer: DomSanitizer,private spinnerService: Ng4LoadingSpinnerService, public _globalService: GlobalService, private datePipe: DatePipe, private lowerCasePipe: LowerCasePipe, private masterService: MasterService, private categoryService: CategoryService, private billRecieptService: BillRecieptService, private route: ActivatedRoute, private router: Router, private lsservice: LocalStorageService) { super(_globalService); }
  //initial center position
  lat: Number = 22.734000;
  lng: Number = 75.874973;
  latdstn: number = 22.723787;
  lngdstn: number = 75.886694;
  // latorgn: number;
  // lngorgn: number;
  //Get Directions
  dir = undefined;
  public getDirection(origin: string, destination: string) {
    debugger;
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': origin }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();
      }
    });
    geocoder.geocode({ 'address': destination }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.latdstn = results[0].geometry.location.lat();
        this.lngdstn = results[0].geometry.location.lng();
      }
    });
    debugger;
    this.dir = {
      origin: { lat: this.lat, lng: this.lng },
      destination: { lat: this.latdstn, lng: this.lngdstn }
    }
  }

  public getCoordinates(address: string) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        debugger;
        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();
      }
    });
  }
  ngOnInit() {
    this.spinnerService.show();
    //this.BillRecieptDynamicHtml = "<div style='width: 100%'><iframe width='100%' height='250' src='https://maps.google.com/maps?width=100%&height=250&q=21/1 race course road, indore;&z=12&output=embed' frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe></div>";       
    //this.BillRecieptDynamicHtml = "<table class='custom-table ptmono-font' style='font-family:PT Mono, monospace;'> <tr> <td colspan='2' class='text-center'> Hello Taxi<br>khargone, madhya pradesh,india<br>India</td> </tr> <tr> <td colspan='2'> <div class='line-divider'></div> </td> </tr> <tr> <td>19/12/2019</td> <td>TRANS: 00Fdsw </td> </tr> <tr> <td>07:30 PM</td> <td>AUTH: sdsds</td> </tr>  <tr> <td colspan='2'> <div class='line-divider'></div> </td> </tr> <tr> <td colspan='2' class='text-center'>VISA 4332</td> </tr><tr><td colspan='2'><div style='width: 100%'><iframe width='100%' height='250' src='https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=22.734000,75.874973;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed' frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe></div></td></tr> <tr> <td colspan='2'> <div class='line-divider'></div> </td> </tr><tr> <td colspan='2' style='text-align:right'> <table align='right' class='ptmono-font text-right' style='color:#686868;'><tr><td width='40%'>SUBTOTAL:</td><td>$110</td></tr><tr><td>TAX:</td><td>$5.5</td></tr><tr><td>TOTAL:</td><td>$115.5</td></tr></table> </td> </tr> </table>";       
    //this.BillRecieptDynamicHtml = "<div><button (click)='printDiv()'>print</button><div id='GFG' style='background-color: green;'><iframe width='100%' height='600' src='https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed' frameborder='0' scrolling='no' marginheight='0' marginwidth='0'><a href='https://www.maps.ie/draw-radius-circle-map/'>km radius map</a></iframe></div><br></div>";
    
    this.billRecieptAddDc.RecieptDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.EntryDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.BillDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.DeliveryDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.DueDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.BillPayDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.OrderDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.TaxiDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.TaxiWTTime = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.PickupTime = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.DropTime = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');
    this.billRecieptAddDc.BillRecieptId = 0;
    this.TaxId = 1;
    this.billRecieptAddDc.CurrencyId = 3;
    this.CategoryRecieptId = this.route.snapshot.queryParams['id'];
    this.billRecieptAddDc.CategoryRecieptId = this.CategoryRecieptId;
    this.GetTaxDropdown();
    this.GetFontDropdown();
    this.GetCurrencyDropdown();
    if (this.CategoryRecieptId > 0 && this.CategoryRecieptId != undefined) {
      this.getCategoryRecieptlist();
    }
    else {
      this.getBillRecieptById(this.route.snapshot.queryParams['brid']);
    }

    if (this.RecieptType == "TollReceipt1")
      this.billRecieptAddDc.ExitDate = "";
    else
      this.billRecieptAddDc.ExitDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy hh:mm a');

    this.spinnerService.hide();
  }

  getCategoryRecieptlist() {
    this.categoryService.GetCategoryRecieptById(this.CategoryRecieptId.toString())
      .subscribe(
        res => {
          debugger;
          if (res != null) {
            this.categoryRecieptDc = res;
            //this.BillRecieptDynamicHtml = res.BillRecieptDynamicHtml;
            this.RecieptType = this.categoryRecieptDc.RecieptType;
            this.enablebilldata();
            //this.BillRecieptPdfHtml = res.BillRecieptPdfHtml;
            this.billRecieptAddDc.FontId = res.FontId;
          }
        }
      )
  }

  public getDynamicHtml() {        
    return this.sanitizer.bypassSecurityTrustHtml(this.BillRecieptDynamicHtml);    
   }

  getBillRecieptById(brid: string) {
    this.billRecieptService.GetBillRecieptById(brid)
      .subscribe(
        res => {
          debugger;
          if (res != null) {
            this.billRecieptAddDc = res;
            this.BillRecieptDynamicHtml = res.BillRecieptDynamicHtml;

            if (this.billRecieptAddDc.CategoryRecieptId == 6) {
              this.getCoordinates(this.billRecieptAddDc.Address);
            }
            else if (this.billRecieptAddDc.CategoryRecieptId == 49) {
              this.getDirection(this.billRecieptAddDc.PickupAddress, this.billRecieptAddDc.DropAddress);
            }

            this.BillRecieptTaxInfoDc = res.BillRecieptTaxInfoDc;
            this.BillRecieptItemInfoDc = res.BillRecieptItemInfoDc;
            this.RecieptType = this.billRecieptAddDc.CategoryRecieptPDFDc.RecieptType;
            this.enablebilldata();
            this.billRecieptAddDc.RecieptDate = this.datePipe.transform(res.RecieptDate, 'MM/dd/yyyy hh:mm a');
            this.billRecieptAddDc.EntryDate = this.datePipe.transform(res.EntryDate, 'MM/dd/yyyy hh:mm a');

            if (res.ExitDate != null && res.ExitDate != "")
              this.billRecieptAddDc.ExitDate = this.datePipe.transform(res.ExitDate, 'MM/dd/yyyy hh:mm a');

            this.billRecieptAddDc.BillDate = this.datePipe.transform(res.BillDate, 'MM/dd/yyyy hh:mm a');
            this.billRecieptAddDc.DeliveryDate = this.datePipe.transform(res.DeliveryDate, 'MM/dd/yyyy hh:mm a');
            this.billRecieptAddDc.DueDate = this.datePipe.transform(res.DueDate, 'MM/dd/yyyy hh:mm a');
            this.billRecieptAddDc.BillPayDate = this.datePipe.transform(res.BillPayDate, 'MM/dd/yyyy hh:mm a');
            this.billRecieptAddDc.OrderDate = this.datePipe.transform(res.OrderDate, 'MM/dd/yyyy hh:mm a');
            this.billRecieptAddDc.TaxiDate = this.datePipe.transform(res.TaxiDate, 'MM/dd/yyyy hh:mm a');
            this.billRecieptAddDc.TaxiWTTime = this.datePipe.transform(res.TaxiWTTime, 'MM/dd/yyyy hh:mm a');
            this.billRecieptAddDc.PickupTime = this.datePipe.transform(res.PickupTime, 'MM/dd/yyyy hh:mm a');
            this.billRecieptAddDc.DropTime = this.datePipe.transform(res.DropTime, 'MM/dd/yyyy hh:mm a');
          }
        }
      )
  }

  GetTaxDropdown() {
    this.masterService.GetTax("True").subscribe(
      res => {
        this.taxDropdownDc = res;
      },
      error => { }
    )
  }

  GetFontDropdown() {
    this.masterService.GetFontDropdown().subscribe(
      res => {
        this.fontDropdownDc = res;
      },
      error => { }
    )
  }

  GetCurrencyDropdown() {
    this.masterService.GetCurrency("True").subscribe(
      res => {
        this.currencyDropdownDc = res;
      },
      error => { }
    )
  }

  onAddTax() {
    debugger;
    if (this.TaxId != undefined && this.TaxInPercentage != undefined) {
      if (this.BillRecieptTaxInfoDc != null && this.BillRecieptTaxInfoDc.length > 0) {
        let found = this.BillRecieptTaxInfoDc.filter(s => s.TaxId == this.TaxId);
        if (found == null || found.length == 0) {
          if (this.BillRecieptTaxInfoDc.length < this.bREnableDc.TaxCount) {
            let brTaxInfoDc: BillRecieptTaxInfoDc = new BillRecieptTaxInfoDc();
            brTaxInfoDc.BillRecieptTaxId = 0;
            brTaxInfoDc.TaxId = this.TaxId;
            brTaxInfoDc.TaxInPercentage = this.TaxInPercentage;
            brTaxInfoDc.Tax = this.taxDropdownDc.filter(x => x.TaxId == this.TaxId)[0].Tax;
            this.BillRecieptTaxInfoDc.push(brTaxInfoDc);
            this.TaxInPercentage = undefined;
            this.TaxId = 0;
          }
          else
            this.alertMessage({ type: 'warning', title: 'Exists', value: 'Tax limit exceed !!' });
        }
        else
          this.alertMessage({ type: 'warning', title: 'Exists', value: 'Tax Already Added !!' });
      }
      else {
        let brTaxInfoDc: BillRecieptTaxInfoDc = new BillRecieptTaxInfoDc();
        brTaxInfoDc.BillRecieptTaxId = 0;
        brTaxInfoDc.TaxId = this.TaxId;
        brTaxInfoDc.TaxInPercentage = this.TaxInPercentage;
        brTaxInfoDc.Tax = this.taxDropdownDc.filter(x => x.TaxId == this.TaxId)[0].Tax;
        this.BillRecieptTaxInfoDc.push(brTaxInfoDc);
        this.TaxInPercentage = undefined;
        this.TaxId = 0;
      }
    }
    else
      this.alertMessage({ type: 'warning', title: 'required fields!!', value: 'Please select tax & enter tax % !!' });
  }

  onDeleteTax(indexNo: number) {
    this.BillRecieptTaxInfoDc.splice(indexNo, 1);
  }

  onAddItem() {
    debugger;
    if (this.ItemName != undefined && this.Quantity != undefined && this.Price != undefined) {
      if (this.BillRecieptItemInfoDc != null && this.BillRecieptItemInfoDc.length > 0) {
        let found = this.BillRecieptItemInfoDc.filter(s => this.lowerCasePipe.transform(s.ItemName) == this.lowerCasePipe.transform(this.ItemName));
        if (found == null || found.length == 0) {
          if (this.BillRecieptItemInfoDc.length < this.bREnableDc.ItemCount) {
            let brTaxInfoDc: BillRecieptItemInfoDc = new BillRecieptItemInfoDc();
            brTaxInfoDc.BillRecieptItemId = 0;
            brTaxInfoDc.ItemName = this.ItemName;
            brTaxInfoDc.Quantity = this.Quantity;
            brTaxInfoDc.Price = this.Price;
            brTaxInfoDc.Description = this.Description;
            brTaxInfoDc.ItemNo = this.ItemNo;
            brTaxInfoDc.Type = this.Type;
            brTaxInfoDc.Mfrs = this.Mfrs;
            brTaxInfoDc.BatchNo = this.BatchNo;
            brTaxInfoDc.Expiry = this.Expiry;
            brTaxInfoDc.UOM = this.UOM;
            this.BillRecieptItemInfoDc.push(brTaxInfoDc);
            this.ItemName = undefined;
            this.Quantity = undefined;
            this.Price = undefined;
            this.Description = undefined;
            this.ItemNo = undefined;
            this.Type = undefined;
            this.Mfrs = undefined;
            this.BatchNo = undefined;
            this.Expiry = undefined;
            this.UOM = undefined;
          }
          else
            this.alertMessage({ type: 'warning', title: 'Exists', value: 'Item limit exceed !!' });
        }
        else
          this.alertMessage({ type: 'warning', title: 'Exists', value: 'Item Already Added !!' });
      }
      else {
        let brTaxInfoDc: BillRecieptItemInfoDc = new BillRecieptItemInfoDc();
        brTaxInfoDc.BillRecieptItemId = 0;
        brTaxInfoDc.ItemName = this.ItemName;
        brTaxInfoDc.Quantity = this.Quantity;
        brTaxInfoDc.Price = this.Price;
        brTaxInfoDc.Description = this.Description;
        brTaxInfoDc.ItemNo = this.ItemNo;
        brTaxInfoDc.Type = this.Type;
        brTaxInfoDc.Mfrs = this.Mfrs;
        brTaxInfoDc.BatchNo = this.BatchNo;
        brTaxInfoDc.Expiry = this.Expiry;
        brTaxInfoDc.UOM = this.UOM;
        this.BillRecieptItemInfoDc.push(brTaxInfoDc);
        this.ItemName = undefined;
        this.Quantity = undefined;
        this.Price = undefined;
        this.Description = undefined;
        this.ItemNo = undefined;
        this.Type = undefined;
        this.Mfrs = undefined;
        this.BatchNo = undefined;
        this.Expiry = undefined;
        this.UOM = undefined;
      }
    }
    else
      this.alertMessage({ type: 'warning', title: 'required fields!!', value: 'Please enter item, price, & quantity !!' });
  }

  onDeleteItem(indexNo: number) {
    this.BillRecieptItemInfoDc.splice(indexNo, 1);
  }

  onGenerateReciept() {
    debugger;
    this.spinnerService.show();
    if (this.billRecieptAddDc.CurrencyId != undefined && this.billRecieptAddDc.Business != undefined && this.billRecieptAddDc.FontStyle != "" && this.billRecieptAddDc.RecieptDate != undefined) {
      this.billRecieptAddDc.BillRecieptTaxInfoDc = this.BillRecieptTaxInfoDc;
      this.billRecieptAddDc.BillRecieptItemInfoDc = this.BillRecieptItemInfoDc;
      this.billRecieptAddDc.RecieptDate = this.datePipe.transform(this.billRecieptAddDc.RecieptDate, 'MM/dd/yyyy hh:mm a');
      this.billRecieptAddDc.EntryDate = this.datePipe.transform(this.billRecieptAddDc.EntryDate, 'MM/dd/yyyy hh:mm a');

      if (this.billRecieptAddDc.ExitDate != null && this.billRecieptAddDc.ExitDate != "")
        this.billRecieptAddDc.ExitDate = this.datePipe.transform(this.billRecieptAddDc.ExitDate, 'MM/dd/yyyy hh:mm a');

      this.billRecieptAddDc.BillDate = this.datePipe.transform(this.billRecieptAddDc.BillDate, 'MM/dd/yyyy hh:mm a');
      this.billRecieptAddDc.DeliveryDate = this.datePipe.transform(this.billRecieptAddDc.DeliveryDate, 'MM/dd/yyyy hh:mm a');
      this.billRecieptAddDc.DueDate = this.datePipe.transform(this.billRecieptAddDc.DueDate, 'MM/dd/yyyy hh:mm a');
      this.billRecieptAddDc.BillPayDate = this.datePipe.transform(this.billRecieptAddDc.BillPayDate, 'MM/dd/yyyy hh:mm a');
      this.billRecieptAddDc.OrderDate = this.datePipe.transform(this.billRecieptAddDc.OrderDate, 'MM/dd/yyyy hh:mm a');
      this.billRecieptAddDc.TaxiDate = this.datePipe.transform(this.billRecieptAddDc.TaxiDate, 'MM/dd/yyyy hh:mm a');
      this.billRecieptAddDc.TaxiWTTime = this.datePipe.transform(this.billRecieptAddDc.TaxiWTTime, 'MM/dd/yyyy hh:mm a');
      this.billRecieptAddDc.PickupTime = this.datePipe.transform(this.billRecieptAddDc.PickupTime, 'MM/dd/yyyy hh:mm a');
      this.billRecieptAddDc.DropTime = this.datePipe.transform(this.billRecieptAddDc.DropTime, 'MM/dd/yyyy hh:mm a');
      if (this.billRecieptAddDc.BillRecieptId == 0) {
        this.billRecieptAddDc.CategoryRecieptPDFDc = new CategoryRecieptPDFDc();
        this.billRecieptAddDc.CategoryRecieptPDFDc.BillRecieptSampleImage = this.categoryRecieptDc.BillRecieptSampleImage;
        this.billRecieptAddDc.CategoryRecieptPDFDc.RecieptType = this.categoryRecieptDc.RecieptType;
        this.billRecieptAddDc.CategoryRecieptPDFDc.IsRecieptLogo = this.categoryRecieptDc.IsRecieptLogo;
        this.billRecieptAddDc.CategoryRecieptPDFDc.ReceiptWidth = this.categoryRecieptDc.ReceiptWidth;
        this.billRecieptAddDc.CategoryRecieptPDFDc.ReceiptHight = this.categoryRecieptDc.ReceiptHight;
      }

      this.billRecieptAddDc.UserId = this.lsservice.getloginId();
      let formData: FormData = new FormData();
      if (this.bREnableDc.RecieptLogo == true && this.myFileInput.nativeElement.files.length > 0) {
        formData.append('file', this.myFileInput.nativeElement.files[0]);
        this.billRecieptAddDc.RecieptLogo = "RecieptLogo/" + this.myFileInput.nativeElement.files[0].name
      }
      if (this.bREnableDc.ProfileImage == true && this.myFileInputpi.nativeElement.files.length > 0) {
        formData.append('file1', this.myFileInputpi.nativeElement.files[0]);
        this.billRecieptAddDc.ProfileImage = "RecieptLogo/" + this.myFileInputpi.nativeElement.files[0].name
      }
      if (this.bREnableDc.BarCode == true && this.myFileInputbci.nativeElement.files.length > 0) {
        formData.append('file2', this.myFileInputbci.nativeElement.files[0]);
        this.billRecieptAddDc.BarCode = "RecieptLogo/" + this.myFileInputbci.nativeElement.files[0].name
      }
      this.billRecieptAddDc.FormDataImages = formData;
      this.billRecieptAddDc.BillRecieptDynamicHtml = "";
      this.billRecieptAddDc.SubscriptionPlanId = Number(localStorage.getItem("SubscriptionPlanId"));
      this.billRecieptService.AddUpdateBillReciept(this.billRecieptAddDc)
        .subscribe(
          res => {
            if (res._body > 0) {
              this.getBillRecieptById(res._body);
              swal({ title: 'Done!', text: 'Reciept Generated Successfully.', timer: 1000, onOpen: () => { swal.showLoading(); } });
              //this.alertMessage({type: 'success', title: 'Done!!', value: 'Reciept Generated Successfully.'});  
              //this.mapInitializer();
              this.spinnerService.hide();
            }
            else {
              this.alertMessage({ type: 'warning', title: 'Generation Error !!', value: 'Reciept Not Generated.' });
              this.spinnerService.hide();
            }
          },
        );
    }
    else {
      this.alertMessage({ type: 'warning', title: 'Required fields !!', value: 'Please fill required fields.' });
      this.spinnerService.hide();
    }
  }


  onBack() {
    this.router.navigate(['/pages/generate-bill-reciept']);
  }

  onRecieptList() {
    this.router.navigate(['/pages/customer-bill-reciept']);
  }

  onDownload() {
    window.open(environment.ImageBaseUrl + "RecieptPdf/bill_reciept_" + this.billRecieptAddDc.BillRecieptId + ".pdf");
  } 

  print(): void {
    let printContents, popupWin;

    printContents = document.getElementById('print-section').innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Reciept</title> 
          <style>
           body, html{margin:0; padding:0; font-family: Tahoma, Geneva, sans-serif;text-align:center;}
           .logo-img,.business-name,.page-name{display:inline-block;vertical-align:middle}.page-name{font-size:18px;font-weight:bold;margin-bottom:15px}.page-name{font-size:22px}.logo-img{height:50px;width:50px;margin-right:15px;border-radius:5px;overflow:hidden;border:1px solid #d5d5d5}.logo-img img{max-width:100%;max-height:100%}.invoice-table{border:1px solid #000;margin-bottom:20px}.sub-title{font-size:16px;font-weight:bold}.modal{position:absolute;left:-10000px;top:0}.modal-backdrop{display:none}.divider{-webkit-print-color-adjust:exact;border-bottom:1px solid #000}.col-md-offset-6{margin-left:50%}.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}
           .print-area{display:none;}
           @media print { .print-area{display:block}} 
           </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  enablebilldata() {
    if (this.RecieptType == "GeneralReceipt2") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Trans = "Trans";
      this.bREnableDc.Mcc = "MCC";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GeneralReceipt3") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Auth = "Auth";
      this.bREnableDc.ApprCode = "Appr Code";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GeneralReceipt4") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Trans = "Trans";
      this.bREnableDc.Mcc = "MCC";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GeneralReceipt5") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.Auth = "Auth";
      this.bREnableDc.Trans = "Trans";
      this.bREnableDc.PaymentType = "Card";
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GeneralReceipt6") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Auth = "Auth";
      this.bREnableDc.Trans = "Trans";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GasFuelReceipt1") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.WebSiteName = "Web Site";
      this.bREnableDc.Auth = "Auth";
      this.bREnableDc.DocNo = "Doc#";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.Pump = "PUMP";
      this.bREnableDc.ApprCode = "APPROVAL#";
      this.bREnableDc.RecieptNo = "Reciept No";
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 1;
    }
    else if (this.RecieptType == "GasFuelReceipt2") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.LandlineNo = "Phone No";
      this.bREnableDc.GSTNo = "GST No";
      this.bREnableDc.BillNo = "Bill No";
      this.bREnableDc.Trans = "Trns Id";
      this.bREnableDc.AtndId = "Atnd Id";
      this.bREnableDc.VehicleNo = "Vehicle No";
      this.bREnableDc.FPId = "FP Id";
      this.bREnableDc.NozlNo = "Nozl No";
      this.bREnableDc.Fuel = "Fuel";
      this.bREnableDc.Density = "Density";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 2;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GasFuelReceipt3") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.LandlineNo = "Telephone No";
      this.bREnableDc.TinNo = "Tin No";
      this.bREnableDc.RecieptNo = "Reciept Id";
      this.bREnableDc.TRXId = "TRX Id";
      this.bREnableDc.PaymentType = "MOP Name";
      this.bREnableDc.Pump = "Pump";
      this.bREnableDc.NozlNo = "Nozzle";
      this.bREnableDc.VehicleNo = "Vehicle No";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.VehicleType = "Vehicle Type";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 1;
    }
    else if (this.RecieptType == "GasFuelReceipt4") {
      this.bREnableDc.Address = "Address 1";
      this.bREnableDc.PickupAddress = "Address 2";
      this.bREnableDc.DropAddress = "Address 3";
      this.bREnableDc.RecieptNo = "Invoice#";
      this.bREnableDc.Auth = "Auth#";
      this.bREnableDc.AccountNo = "Account No";
      this.bREnableDc.Pump = "Pump";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 1;
    }
    else if (this.RecieptType == "GasFuelReceipt5") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.RecieptNo = "Reciept No";
      this.bREnableDc.PompaSalans = "Pompa Salans";
      this.bREnableDc.NomarNota = "Nomar Nota";
      this.bREnableDc.JenisBBM = "Jenis BBM";
      this.bREnableDc.Operator = "Operator";
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 1;
    }
    else if (this.RecieptType == "GasFuelReceipt6") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Auth = "Auth";
      this.bREnableDc.Trans = "Trans";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 1;
    }
    else if (this.RecieptType == "GasFuelReceipt7") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.StationNo = "Station No";
      this.bREnableDc.Pump = "Pump";
      this.bREnableDc.Auth = "Auth";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 1;
      this.bREnableDc.TaxCount = 1;
    }
    else if (this.RecieptType == "GasFuelReceipt8") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.WebSiteName = "Web Site Name";
      this.bREnableDc.Auth = "Auth#";
      this.bREnableDc.RecieptNo = "Reciept No";
      this.bREnableDc.AccountNo = "Account No";
      this.bREnableDc.Pump = "Pump";
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 1;
    }
    else if (this.RecieptType == "GroceryReceipt1") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.LandlineNo = "Landline No";
      this.bREnableDc.HelplineNo = "Helpline No";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.TinNo = "GST Tin No";
      this.bREnableDc.CINNo = "CIN No";
      this.bREnableDc.PayAmount = "Cash";
      this.bREnableDc.BarCode = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 5;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GroceryReceipt2") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.STNo = "ST#";
      this.bREnableDc.OPNo = "OP#";
      this.bREnableDc.TENo = "TE#";
      this.bREnableDc.TRNNo = "TR#";
      this.bREnableDc.AccountNo = "ACCOUNT #";
      this.bREnableDc.ApprCode = "APPROVAL #";
      this.bREnableDc.REFNo = "REF #";
      this.bREnableDc.Trans = "TRANS Id";
      this.bREnableDc.Validation = "Validation";
      this.bREnableDc.PaymentService = "Payment Service";
      this.bREnableDc.TerminalId = "Terminal #";
      this.bREnableDc.PayAmount = "Tend";
      this.bREnableDc.TCId = "TC #";
      this.bREnableDc.BarCode = true;
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GroceryReceipt3") {
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.ExitDate = "Expires";
      this.bREnableDc.RecieptNo = "Reciept #";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.BarCode = true;
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GroceryReceipt4") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Cashier = "Cashier";
      this.bREnableDc.PayAmount = "Pay Amount";
      this.bREnableDc.Lane = "Lane";
      this.bREnableDc.Clerk = "Clerk";
      this.bREnableDc.Trans = "Trans#";
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GroceryReceipt5") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Auth = "Auth";
      this.bREnableDc.Lane = "Lane";
      this.bREnableDc.Cashier = "Cashier";
      this.bREnableDc.ExitDate = "Exp Date";
      this.bREnableDc.SNNo = "SN No";
      this.bREnableDc.EPSSequence = "EPS Sequence";
      this.bREnableDc.MRCH = "MRCH";
      this.bREnableDc.TerminalId = "Term";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
    }
    else if (this.RecieptType == "GroceryReceipt6") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.STNo = "ST#";
      this.bREnableDc.OPNo = "OP#";
      this.bREnableDc.TENo = "TE#";
      this.bREnableDc.TRNNo = "TR#";
      this.bREnableDc.TCId = "TC#";
      this.bREnableDc.PayAmount = "CASH TEND";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.BarCode = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 30;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "GroceryReceipt7") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.STNo = "ST#";
      this.bREnableDc.OPNo = "OP#";
      this.bREnableDc.TENo = "TE#";
      this.bREnableDc.TRNNo = "TR#";
      this.bREnableDc.TCNo = "TC#";
      this.bREnableDc.PayAmount = "CASH TEND";
      this.bREnableDc.Payments = "Card TEND";
      this.bREnableDc.PaymentService = "Payment By";
      this.bREnableDc.AccountNo = "Account #";
      this.bREnableDc.REFNo = "REF #";
      this.bREnableDc.NetworkId = "Network Id";
      this.bREnableDc.TerminalId = "Terminal #";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.BarCode = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 30;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "ParkingReceipt1") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.BaseFare = "Base Price";
      this.bREnableDc.Taxes = "Tax";
    }
    else if (this.RecieptType == "ParkingReceipt2") {
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.SpaceNo = "Space #";
      this.bREnableDc.ExitDate = "Expiration Date Time";
      this.bREnableDc.TicketNo = "Ticket #";
      this.bREnableDc.SNNo = "SN #";
      this.bREnableDc.Lot_Location = "Lot";
      this.bREnableDc.PayedAt = "Payed At";
      this.bREnableDc.Payments = "Total Due";
      this.bREnableDc.PayAmount = "Total Paid";
      this.bREnableDc.PaymentType = "Payment Type";
    }
    else if (this.RecieptType == "ParkingReceipt3") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.EntryDate = "Entry Date Time";
      this.bREnableDc.ExitDate = "Exit Date Time";
      this.bREnableDc.PayAmount = "Pay Amount";
      this.bREnableDc.PaymentType = "Payment Type";
    }
    else if (this.RecieptType == "ParkingReceipt4") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.StationNo = "StationNo";
      this.bREnableDc.TicketNo = "Ticket #";
      this.bREnableDc.Trans = "Transaction Number";
      this.bREnableDc.Payments = "Parking Fee";
      this.bREnableDc.PayAmount = "Fee Paid";
      this.bREnableDc.Taxes = "Total Tax";
      this.bREnableDc.EntryDate = "Entry Date Time";
      this.bREnableDc.ExitDate = "Exit Date Time";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.ApprCode = "Approval Number";
    }
    else if (this.RecieptType == "ParkingReceipt5") {
      this.bREnableDc.Payments = "Total Due";
      this.bREnableDc.PayAmount = "Total Paid";
      this.bREnableDc.TicketNo = "Ticket#";
      this.bREnableDc.SNNo = "S/N";
      this.bREnableDc.Lot_Location = "Location";
      this.bREnableDc.MachName = "Mach Name";
      this.bREnableDc.AccountNo = "Account No";
      this.bREnableDc.Auth = "Auth#";
      this.bREnableDc.BarCode = true;
    }
    else if (this.RecieptType == "ParkingReceipt7") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.RecieptNo = "Reciept No";
      this.bREnableDc.VehicleNo = "Vehicle No";
      this.bREnableDc.VehicleType = "Vehicle Type";
      this.bREnableDc.BaseFare = "Base Fare";
      this.bREnableDc.EntryDate = "Entry Date";
      this.bREnableDc.ExitDate = "Exit Date";
    }
    else if (this.RecieptType == "ParkingReceipt8") {
      this.bREnableDc.Address = "Address 1";
      this.bREnableDc.DropAddress = "Address 2";
      this.bREnableDc.PayAmount = "Pay Amount";
      this.bREnableDc.Taxes = "V.A.T.";
      this.bREnableDc.EntryDate = "From";
      this.bREnableDc.ExitDate = "To";
      this.bREnableDc.BarCode = true;
    }
    else if (this.RecieptType == "PharmacyReceipt1") {
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.RegNo = "Reg#";
      this.bREnableDc.TRNNo = "TRN#";
      this.bREnableDc.CSHRNo = "CSHR#";
      this.bREnableDc.STRNo = "STR#";
      this.bREnableDc.HelpedBy = "Helped By";
      this.bREnableDc.ApprCode = "APPROVED#";
      this.bREnableDc.REFNo = "REF#";
      this.bREnableDc.AID = "AID";
      this.bREnableDc.TCNo = "TC";
      this.bREnableDc.TerminalId = "Terminal#";
      this.bREnableDc.CVM = "CVM";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
    }
    else if (this.RecieptType == "PharmacyReceipt2") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.RegNo = "Register";
      this.bREnableDc.StoreNo = "Store#";
      this.bREnableDc.Cashier = "Cashier";
      this.bREnableDc.REFNo = "REF#";
      this.bREnableDc.AID = "App#";
      this.bREnableDc.PayAmount = "Tendered";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "PharmacyReceipt3") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.PharmacyNo = "Pharmacy";
      this.bREnableDc.StoreNo = "Store";
      this.bREnableDc.RegNo = "Reg#";
      this.bREnableDc.TRNNo = "TRN#";
      this.bREnableDc.CSHRNo = "CSHR##";
      this.bREnableDc.STRNo = "STR#";
      this.bREnableDc.TCNo = "TC#";
      this.bREnableDc.ExitDate = "Return Date";
      this.bREnableDc.PayAmount = "Cash";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.WebSiteName = "Web Site";
      this.bREnableDc.BarCode = true;
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "PharmacyReceipt4") {
      this.bREnableDc.REFNo = "REF#";
      this.bREnableDc.BillTo = "Bill To";
      this.bREnableDc.PayAmount = "Pay Amount";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
    }
    else if (this.RecieptType == "PharmacyReceipt5") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.BillTo = "Patient";
      this.bREnableDc.BillNo = "Bill No";
      this.bREnableDc.PharmacyNo = "Pharmacy No";
      this.bREnableDc.HelpedBy = "Doctor";
      this.bREnableDc.LandlineNo = "Landline No";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "PhoneReceipt1") {
      this.bREnableDc.BillTo = "Bill To";
      this.bREnableDc.ShipTo = "Ship To";
      this.bREnableDc.PickupAddress = "Billing Address";
      this.bREnableDc.DropAddress = "Shipping Address";
      this.bREnableDc.Address = "Address";
      this.bREnableDc.PANNo = "PAN No";
      this.bREnableDc.GSTNo = "GST No";
      this.bREnableDc.OrderNo = "Order Number";
      this.bREnableDc.OrderDate = "Order Date";
      this.bREnableDc.InvoiceDetails = "Invoice Details";
      this.bREnableDc.RecieptNo = "Invoice No";
      this.bREnableDc.BillDate = "Invoice Date";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 1;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "PhoneReceipt2") {
      this.bREnableDc.BillTo = "Bill To";
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.BillToEmailId = "Email Id";
      this.bREnableDc.LandMark = "Land Mark";
      this.bREnableDc.FixedlineNo = "Fixedline No";
      this.bREnableDc.BroadbandId = "Broadband ID";
      this.bREnableDc.RelationShipNo = "Relationship No";
      this.bREnableDc.BillNo = "Bill No";
      this.bREnableDc.BillDate = "Bill Date";
      this.bREnableDc.BillPeriod = "Bill Period";
      this.bREnableDc.BillPayDate = "Bill Pay Date";
      this.bREnableDc.SecurityDeposit = "Security Deposit";
      this.bREnableDc.AlternateMobileNo = "Alternate Mobile No";
      this.bREnableDc.PreviousBalance = "Previous Balance";
      this.bREnableDc.Payments = "Payments";
      this.bREnableDc.MonthlyRentals = "Monthly Rentals";
      this.bREnableDc.UsageCharges = "Usage Charges";
      this.bREnableDc.OneTimeCharges = "One Time Charges";
      this.bREnableDc.Taxes = "Taxes";
      this.bREnableDc.BillGenerateBy = "Manager Name";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.BarCode = true;
    }
    else if (this.RecieptType == "PhoneReceipt3") {
      this.bREnableDc.BillTo = "Bill To";
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.LandMark = "Land Mark";
      this.bREnableDc.MobileNo = "Mobile Number";
      this.bREnableDc.RelationShipNo = "Relationship No";
      this.bREnableDc.BillNo = "Bill No";
      this.bREnableDc.BillDate = "Bill Date";
      this.bREnableDc.BillPeriod = "Bill Period";
      this.bREnableDc.BillPayDate = "Bill Pay Date";
      this.bREnableDc.SecurityDeposit = "Security Deposit";
      this.bREnableDc.CreditLimit = "Credit Limit";
      this.bREnableDc.PreviousBalance = "Previous Balance";
      this.bREnableDc.Payments = "Payments";
      this.bREnableDc.MonthlyRentals = "Monthly Rentals";
      this.bREnableDc.UsageCharges = "Usage Charges";
      this.bREnableDc.OneTimeCharges = "One Time Charges";
      this.bREnableDc.Taxes = "Taxes";
      this.bREnableDc.Adjustments = "Adjustments";
      this.bREnableDc.LatePaymentFee = "Late Payment Fee";
      this.bREnableDc.WebSiteName = "Web Site Name";
      this.bREnableDc.RegNo = "Service Tax Reg No";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.BarCode = true;
    }
    else if (this.RecieptType == "PhoneReceipt4") {
      this.bREnableDc.BillTo = "Bill To";
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.DropAddress = "Place Of Supply";
      this.bREnableDc.AadharNo = "Aadhar Number";
      this.bREnableDc.BroadbandId = "Broadband ID";
      this.bREnableDc.BillToEmailId = "BillTo EmailId";
      this.bREnableDc.GSTNo = "GST Reg No";
      this.bREnableDc.PANNo = "PAN No";
      this.bREnableDc.AccountNo = "Account No";
      this.bREnableDc.BillNo = "Bill No";
      this.bREnableDc.BillDate = "Bill Date";
      this.bREnableDc.DueDate = "Due Date";
      this.bREnableDc.SecurityDeposit = "Security Deposit";
      this.bREnableDc.CreditLimit = "Credit Limit";
      this.bREnableDc.MemberShip = "Member Ship";
      this.bREnableDc.PreviousBalance = "Previous Balance";
      this.bREnableDc.Payments = "Payments";
      //this.bREnableDc.PayAmount = "Current Charges";
      //this.bREnableDc.Taxes = "Taxes";
      this.bREnableDc.MonthlyRentals = "Monthly Rentals";
      this.bREnableDc.UsageP_ISD_IRCalling = "Usage P_ISD IRCalling";
      this.bREnableDc.UsageDataCharges = "Usage Data Charges";
      this.bREnableDc.UsageSMSCharges = "Usage SMS Charges";
      this.bREnableDc.UsageVASCharges = "Usage VAS Charges";
      this.bREnableDc.OneTimeCharges = "One Time Charges";
      this.bREnableDc.CurruntMonthDiscount = "Currunt Month Discount";
      this.bREnableDc.Adjustments = "Previous Month Adjustments";
      this.bREnableDc.BillDiscountWithTax = "Bill Discount With Tax";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "RestaurantReceipt1") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.LandlineNo = "Landline No";
      this.bREnableDc.FaxNo = "Fax No";
      this.bREnableDc.WebSiteName = "WebSite Name";
      this.bREnableDc.BillTo = "Bill To";
      this.bREnableDc.ShipTo = "Ship To";
      this.bREnableDc.PickupAddress = "Billing Address";
      this.bREnableDc.DropAddress = "Shipping Address";
      this.bREnableDc.CustomerNo = "Customer No";
      this.bREnableDc.OrderNo = "Order No";
      this.bREnableDc.OrderDate = "Order Date";
      this.bREnableDc.CustomerPONo = "Customer PO No";
      this.bREnableDc.DeliveryDate = "Delivery Date";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
    }
    else if (this.RecieptType == "RestaurantReceipt2") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.MRCH = "Merchant #";
      this.bREnableDc.TerminalId = "Terminal #";
      this.bREnableDc.SNNo = "Sequence #";
      this.bREnableDc.Host = "Host";
      this.bREnableDc.ExitDate = "Expiry";
      this.bREnableDc.PayAmount = "Total Payment";
      this.bREnableDc.Taxes = "Tax";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.Auth = "Auth";
      this.bREnableDc.RecieptLogo = true;
    }
    else if (this.RecieptType == "RestaurantReceipt3") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Host = "Host";
      this.bREnableDc.OrderNo = "Order";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "RestaurantReceipt4") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "RestaurantReceipt5") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Clerk = "Clerk";
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
    }
    else if (this.RecieptType == "RestaurantReceipt6") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.WebSiteName = "Web Site";
      this.bREnableDc.GSTNo = "GST";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "RestaurantReceipt7") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.RecieptNo = "ID";
      this.bREnableDc.Auth = "Auth Code";
      this.bREnableDc.AccountNo = "Account No";
      this.bREnableDc.PaymentType = "Card Type";
      this.bREnableDc.CardEntry = "Card Entry";
      this.bREnableDc.TransType = "Trans Type";
      this.bREnableDc.Trans = "Trans Key";
      this.bREnableDc.CheckNo = "Check";
      this.bREnableDc.CheckId = "Check Id";
      this.bREnableDc.Tip = "Tip";
      this.bREnableDc.SoldBy = "Server";
      this.bREnableDc.PayAmount = "Payment";
    }
    else if (this.RecieptType == "TaxiReceipt1") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.PickupTime = "Start Time";
      this.bREnableDc.DropTime = "End Time";
      this.bREnableDc.TaxiKM = "KM";
      //this.bREnableDc.TaxiWTTime = "WT. Time";
      this.bREnableDc.BaseFare = "Fare";
      this.bREnableDc.TaxiCallNo = "Taxi Call No";
    }
    else if (this.RecieptType == "TaxiReceipt2") {
      this.bREnableDc.RideBy = "Ride By";
      this.bREnableDc.BaseFare = "Line Ride Fare";
      this.bREnableDc.Taxes = "Prime Time Tax(%)";
      this.bREnableDc.LiftLineDiscountPrice = "Lift Line Discount";
      this.bREnableDc.PromotionalPricing = "Promotional Pricing";
      this.bREnableDc.PickupTime = "Pickup Time";
      this.bREnableDc.DropTime = "Drop Time";
      this.bREnableDc.PickupAddress = "Pickup";
      this.bREnableDc.DropAddress = "Dropoff";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.ProfileImage = true;
      this.bREnableDc.RecieptLogo = true;
    }
    else if (this.RecieptType == "TaxiReceipt3") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.BaseFare = "Base Fare";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.RecieptNo = "Reciept No";
    }
    else if (this.RecieptType == "TaxiReceipt4") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.RecieptNo = "Reciept No";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
      this.bREnableDc.ItemCount = 10;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "TaxiReceipt5") {
      this.bREnableDc.BaseFare = "Trip Fare";
      this.bREnableDc.SubCharges = "Tolle, Sub Charges and Fees";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.CarName = "Car";
      this.bREnableDc.TaxiKM = "Miles";
      this.bREnableDc.PickupTime = "Pickup Time";
      this.bREnableDc.DropTime = "Drop Time";
      this.bREnableDc.PickupAddress = "Pickup";
      this.bREnableDc.DropAddress = "Dropoff";
      this.bREnableDc.Rating = "Rating (1-5)";
    }
    else if (this.RecieptType == "TaxiReceipt6") {
      this.bREnableDc.BaseFare = "Trip Fare";
      this.bREnableDc.PromotionalPricing = "Promotions";
      this.bREnableDc.BillTo = "BillTo";
      this.bREnableDc.LicensePlate = "LicensePlate";
      this.bREnableDc.TaxiKM = "TaxiKM";
      this.bREnableDc.PickupTime = "Pickup Time";
      this.bREnableDc.DropTime = "Drop Time";
      this.bREnableDc.PickupAddress = "Pickup";
      this.bREnableDc.DropAddress = "Dropoff";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.RideBy = "Ride With";
      this.bREnableDc.ProfileImage = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.TaxCount = 2;
    }
    else if (this.RecieptType == "TaxiReceipt7") {
      this.bREnableDc.BaseFare = "Trip Fare";
      this.bREnableDc.DistanceFare = "Distance Fare";
      this.bREnableDc.TimeFare = "Time Fare";
      this.bREnableDc.SafeRideFee = "Safe Ride Fee";
      this.bREnableDc.BillTo = "BillTo";
      this.bREnableDc.RideBy = "Ride With";
      this.bREnableDc.SoldBy = "Company";
      this.bREnableDc.CarName = "Car Name";
      this.bREnableDc.TaxiKM = "TaxiKM";
      this.bREnableDc.PickupTime = "Pickup Time";
      this.bREnableDc.DropTime = "Drop Time";
      this.bREnableDc.PickupAddress = "Pickup";
      this.bREnableDc.DropAddress = "Dropoff";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.ProfileImage = true;
    }
    else if (this.RecieptType == "TaxiReceipt8") {
      this.bREnableDc.BaseFare = "Trip Fare";
      this.bREnableDc.SafeRideFee = "Play Convenience Fee";
      this.bREnableDc.BillTo = "Bill To";
      this.bREnableDc.RideBy = "Ride With";
      this.bREnableDc.CarName = "Car Name";
      this.bREnableDc.PickupTime = "Pickup Time";
      this.bREnableDc.DropTime = "Drop Time";
      this.bREnableDc.PickupAddress = "Pickup";
      this.bREnableDc.DropAddress = "Dropoff";
      this.bREnableDc.PaymentType = "Payment Type";
      this.bREnableDc.RecieptNo = "CRN No";
      this.bREnableDc.ProfileImage = true;
      this.bREnableDc.RecieptLogo = true;
    }
    else if (this.RecieptType == "TollReceipt1") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.ExitDate = "Valid Till";
      this.bREnableDc.TollPlaza = "Toll Plaza";
      this.bREnableDc.Lane = "Lane";
      this.bREnableDc.Operator = "Operator";
      this.bREnableDc.VehicleType = "Vehicle Type";
      this.bREnableDc.BaseFare = "Fee";
      this.bREnableDc.PaymentService = "Payment Method";
      this.bREnableDc.VehicleNo = "Vehicle No";
      this.bREnableDc.Trans = "Trans. No.";
    }
    else if (this.RecieptType == "TollReceipt2") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Section = "Section";
      this.bREnableDc.TollPlaza = "Toll Plaza";
      this.bREnableDc.TicketNo = "Ticket No";
      this.bREnableDc.Operator = "Booth & Operator";
      this.bREnableDc.VehicleNo = "Vehicle No";
      this.bREnableDc.VehicleType = "Vehicle Type";
      this.bREnableDc.Journey = "Journey Type";
      this.bREnableDc.BaseFare = "Fee";
      this.bREnableDc.VehicleStanderedWeight = "Vehicle Standered Weight";
      this.bREnableDc.VehicleActualWeight = "Vehicle Actual Weight";
      this.bREnableDc.OverloadedVehicleFee = "Overloaded Vehicle Fee";
    }
    else if (this.RecieptType == "TollReceipt3") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.RecieptNo = "Reciept No";
      this.bREnableDc.EntryDate = "Valid From";
      this.bREnableDc.ExitDate = "Valid To";
      this.bREnableDc.Lane = "Lane";
      this.bREnableDc.Shift = "Shift";
      this.bREnableDc.VehicleType = "Vehicle Type";
      this.bREnableDc.Journey = "Journey";
      this.bREnableDc.VehicleNo = "Vehicle Reg No";
      this.bREnableDc.TCId = "TC ID";
      this.bREnableDc.VehicleActualWeight = "Gross Weight";
      this.bREnableDc.PayAmount = "Amount Paid";
      this.bREnableDc.MobileNo = "Mobile No";
      this.bREnableDc.RelationShipNo = "BarCode No";
      this.bREnableDc.BarCode = true;
    }
    else if (this.RecieptType == "TollReceipt4") {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.TollPlaza = "Plaza";
      this.bREnableDc.Lane = "Lane";
      this.bREnableDc.Operator = "Collector";
      this.bREnableDc.VehicleType = "Class";
      this.bREnableDc.BaseFare = "Fare";
      this.bREnableDc.RegNo = "Reg No";
      this.bREnableDc.CSH = "CSH";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.Trans = "Trans";
      this.bREnableDc.RecieptNo = "Reciept No";
      this.bREnableDc.BarCode = true;
    }
    else {
      this.bREnableDc.Address = "Address";
      this.bREnableDc.CityState = "City";
      this.bREnableDc.Auth = "Auth";
      this.bREnableDc.ApprCode = "Appr Code";
      this.bREnableDc.PaymentType = "Payment";
      this.bREnableDc.RecieptLogo = true;
      this.bREnableDc.EnableTax = true;
      this.bREnableDc.EnableItem = true;
    }
  }

  // mapInitializer() { 
  //   let map: google.maps.Map; 
  //   let geocoder = new google.maps.Geocoder();
  //   let strSearch = this.billRecieptAddDc.Address;
  //   geocoder.geocode({ 'address': strSearch }, (results, status) => { 
  //     debugger;
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       let lat = results[0].geometry.location.lat();
  //       let lng = results[0].geometry.location.lng();
  //       let coordinates = new google.maps.LatLng(lat, lng);
  //       let mapOptions: google.maps.MapOptions = { center: coordinates, zoom: 10,disableDefaultUI: true, };
  //       let marker = new google.maps.Marker({ position: coordinates, map: map, });
  //       //map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
  //       map = new google.maps.Map(document.getElementById('map'), mapOptions);
  //       //marker.setMap(map);
  //     }
  //   });
  // } 

}
