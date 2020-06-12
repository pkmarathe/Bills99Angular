import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { RegistrationService } from '../../../app/shared/services/registration.service';
import { RegistrationDropdownDc, RegistrationTableDc } from '../../../app/shared/models/registration-table-dc';
import { SubscriptionPlanPaymentDc, SubscriptionPlanPaymentSearchDc, SubscriptionPlanPaymentInputDc, PaymentCurrencyDc, PaymentCheckoutDc } from '../../../app/shared/models/subscription-plan-payment-dc';
import { SubscriptionPlanPayService } from '../../../app/shared/services/subscription-plan-pay.service';
import { MasterService } from '../../../app/shared/services/master.service';
import { SubscriptionPlanDc } from '../../../app/shared/models/subscription-plan-dc';
import { LocalStorageService } from '../../../app/shared/services/common/localstorage.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute, Router } from '@angular/router';
declare var Stripe: any;
@Component({
  selector: 'app-subscription-plan-payment-list',
  templateUrl: './subscription-plan-payment-list.component.html',
  styleUrls: ['./subscription-plan-payment-list.component.scss']
})
export class SubscriptionPlanPaymentListComponent implements OnInit {

  public subscriptionPlanPaymentSearchDc: SubscriptionPlanPaymentSearchDc = new SubscriptionPlanPaymentSearchDc();
  public subscriptionPlanPaymentAddDc: SubscriptionPlanPaymentInputDc = new SubscriptionPlanPaymentInputDc();
  public subscriptionPlanPaymentDc: Array<SubscriptionPlanPaymentDc> = [];
  public subscriptionPlanDc: Array<SubscriptionPlanDc> = [];
  public registrationDropdownDc: Array<RegistrationDropdownDc> = [];
  public PaymentCurrencyDc: Array<PaymentCurrencyDc> = [];
  checkoutsessionid: string;
  checkoutamount: string;
  public PaymentCheckoutDc: PaymentCheckoutDc = new PaymentCheckoutDc();
  public RegistrationTableDc: RegistrationTableDc = new RegistrationTableDc();
  pageSize = 10;
  pageNumber = 1;
  error: any;
  error1: any;
  success: any;
  constructor(private router: Router, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, public lsService: LocalStorageService, private regService: RegistrationService, private subPlanService: SubscriptionPlanPayService, private masterService: MasterService) { }
  //Publishablekey = "pk_test_HFSzYRbru21PsWpmO7hWROLs009prnonfu"
  //Publishablekey = "pk_live_V6B0hXJyJzQ82puhEYu4ov9U00M7oGzJYm" 
  handler: any = null;
  ngOnInit() {
    //this.loadStripe();

    this.subscriptionPlanPaymentSearchDc.UserId = 0;
    this.subscriptionPlanPaymentSearchDc.SubscriptionPlanId = 0;
    this.subscriptionPlanPaymentAddDc.SubscriptionPlanId = 1;
    this.subscriptionPlanPaymentAddDc.SubscriptionPlanPayId = 0;
    this.subscriptionPlanPaymentAddDc.Currency = "usd";
    this.subscriptionPlanPaymentSearchDc.Currency = '0';
    this.checkoutsessionid = this.route.snapshot.queryParams['session_id'];
    if (this.checkoutsessionid != undefined && this.checkoutsessionid != '' && this.checkoutsessionid != null) {
      this.onGetlocalstorage();
      this.onSubmit(this.checkoutsessionid);
    }
    debugger;
    this.GetSubPlanDropdown();
    this.GetRegistrationDropdown();
    this.GetRegistrationById();
    this.getpaymentlist();
  }



  // pay(modal) {
  //   debugger;
  //   if (this.subscriptionPlanPaymentAddDc.SubscriptionPlanId == 0 || this.subscriptionPlanPaymentAddDc.SubscriptionPlanId == undefined) {
  //     this.error1 = 'Please select subscription plan';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.subscriptionPlanPaymentAddDc.Currency == '0' || this.subscriptionPlanPaymentAddDc.Currency == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
  //     this.error1 = 'Please select currency';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.subscriptionPlanPaymentAddDc.Name == '' || this.subscriptionPlanPaymentAddDc.Name == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
  //     this.error1 = 'Please enter card full name';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.subscriptionPlanPaymentAddDc.Country == '' || this.subscriptionPlanPaymentAddDc.Country == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter country';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.subscriptionPlanPaymentAddDc.State == '' || this.subscriptionPlanPaymentAddDc.State == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter state';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.subscriptionPlanPaymentAddDc.City == '' || this.subscriptionPlanPaymentAddDc.City == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter city';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.subscriptionPlanPaymentAddDc.PostalCode == '' || this.subscriptionPlanPaymentAddDc.PostalCode == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter postal code';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.subscriptionPlanPaymentAddDc.Address == '' || this.subscriptionPlanPaymentAddDc.Address == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter address';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else {
  //     var that = this;
  //     let amount : string = '0';
  //     if (this.subscriptionPlanPaymentAddDc.Currency == 'usd') {
  //       amount = this.subscriptionPlanDc.filter(x => x.SubscriptionPlanId == this.subscriptionPlanPaymentAddDc.SubscriptionPlanId)[0].Amount;
  //     }
  //     else {
  //       amount = this.subscriptionPlanDc.filter(x => x.SubscriptionPlanId == this.subscriptionPlanPaymentAddDc.SubscriptionPlanId)[0].Amount;
  //       this.GetCurrencyPerCharge(this.subscriptionPlanPaymentAddDc.Currency);
  //       var priceperdoller = this.PaymentCurrencyDc[0].PricePerDoller;
  //       amount = (Number(amount) * Number(priceperdoller)).toString();
  //     }
  //     var handler = (<any>window).StripeCheckout.configure({
  //       key: this.Publishablekey,// 'pk_live_V6B0hXJyJzQ82puhEYu4ov9U00M7oGzJYm', //  publishable key
  //       locale: 'auto',
  //       token: function (token: any) {
  //         // You can access the token ID with `token.id`.
  //         // Get the token ID to your server-side code for use.
  //         console.log(JSON.stringify(token))
  //         //alert('Token Created!!');
  //         debugger;
  //         that.onSubmit(modal, token.id);
  //       }
  //     });
  //     handler.open({
  //       name: 'Stripe Payment',
  //       description: '',
  //       amount: Number(amount)*100,
  //       currency: this.subscriptionPlanPaymentAddDc.Currency,
  //       email: "",
  //       capture_method: 'automatic'
  //     });
  //   }
  // }

  // loadStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     var s = window.document.createElement("script");
  //     s.id = "stripe-script";
  //     s.type = "text/javascript";
  //     s.src = "https://checkout.stripe.com/checkout.js";
  //     s.onload = () => {
  //       this.handler = (<any>window).StripeCheckout.configure({
  //         key: this.Publishablekey,
  //         locale: 'auto',
  //         token: function (token: any) {
  //           // You can access the token ID with `token.id`.
  //           // Get the token ID to your server-side code for use.
  //           console.log(token)
  //           //alert('Payment Success!!');
  //         }
  //       });
  //     }

  //     window.document.body.appendChild(s);
  //   }
  // }

  getpaymentlist() {
    this.spinnerService.show();
    if (this.lsService.getloginRole() != 'admin')
      this.subscriptionPlanPaymentSearchDc.UserId = this.lsService.getloginId();

    this.subPlanService.SearchSubscriptionPlanPay(this.subscriptionPlanPaymentSearchDc)
      .subscribe(
        res => {
          if (res != null) {
            this.subscriptionPlanPaymentDc = res;
          }
          this.spinnerService.hide();
        }
      )
  }

  GetSubPlanDropdown() {
    this.masterService.GetSubscriptionPlan("True").subscribe(
      res => {
        this.subscriptionPlanDc = res;
      },
      error => { }
    )
  }

  GetRegistrationById() {
    debugger;
    this.regService.GetRegistrationById(this.lsService.getloginId().toString()).subscribe(
      res => {
        debugger;
        this.RegistrationTableDc = res;
      },
      error => { }
    )
  }

  GetRegistrationDropdown() {
    debugger;
    this.regService.GetRegistrationDropdown("customer").subscribe(
      res => {
        this.registrationDropdownDc = res;
      },
      error => { }
    )
  }

  GetCurrencyPerCharge(pN: string) {
    debugger;
    this.subPlanService.GetPaymentCurrency(pN).subscribe(
      res => {
        debugger;
        this.PaymentCurrencyDc = res;
      },
      error => { }
    )
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  openModal(modal) {
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  }

  pay() {
    this.spinnerService.show();
    if (this.subscriptionPlanPaymentAddDc.SubscriptionPlanId == 0 || this.subscriptionPlanPaymentAddDc.SubscriptionPlanId == undefined) {
      this.error1 = 'Please select subscription plan';
      this.spinnerService.hide();
      return;
    }
    else if ((this.subscriptionPlanPaymentAddDc.Currency == '0' || this.subscriptionPlanPaymentAddDc.Currency == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
      this.error1 = 'Please select currency';
      this.spinnerService.hide();
      return;
    }
    else {
      if (this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {

        //var stripe = Stripe('pk_test_HFSzYRbru21PsWpmO7hWROLs009prnonfu');
        var stripe = Stripe('pk_live_V6B0hXJyJzQ82puhEYu4ov9U00M7oGzJYm');
        let amount: number = 0;
        amount = Number(this.subscriptionPlanDc.filter(x => x.SubscriptionPlanId == this.subscriptionPlanPaymentAddDc.SubscriptionPlanId)[0].Amount);
        if (this.subscriptionPlanPaymentAddDc.Currency == 'usd') {
          this.checkoutamount = amount.toString();
          amount = amount * 100;
        }
        else {
          //this.GetCurrencyPerCharge(this.subscriptionPlanPaymentAddDc.Currency);
          //var priceperdoller = this.PaymentCurrencyDc[0].PricePerDoller;
          amount = amount * 75;
          this.checkoutamount = amount.toString();
          amount = amount * 100;
        }
        this.PaymentCheckoutDc.Amount = amount;
        this.subscriptionPlanPaymentAddDc.PaymentAmount = this.checkoutamount;
        this.PaymentCheckoutDc.Currency = this.subscriptionPlanPaymentAddDc.Currency;
        this.PaymentCheckoutDc.SubscriptionPlanId = this.subscriptionPlanPaymentAddDc.SubscriptionPlanId;
        this.PaymentCheckoutDc.CustomerEmail = this.RegistrationTableDc.EmailId;
        // this.PaymentCheckoutDc.ReturnUrl = "https://localhost:4500/pages/subscription-plan-payment?";
        // this.PaymentCheckoutDc.CancelUrl = "https://localhost:4500/pages/subscription-plan-payment";
        this.PaymentCheckoutDc.ReturnUrl = "https://app.bills99.com/pages/subscription-plan-payment?";
        this.PaymentCheckoutDc.CancelUrl = "https://app.bills99.com/pages/subscription-plan-payment";
        this.subPlanService.GetSessionId(this.PaymentCheckoutDc)
          .subscribe(
            res => {
              debugger;
              if (res.Result == true) {
                this.onSavelocalstorage();
                stripe.redirectToCheckout({
                  sessionId: res.SessionId
                }).then(function (result) {
                  this.error = result.error.message                  
                });
              }
              else {
                this.error = res.SessionId;
                this.error1 = res.SessionId;
                this.spinnerService.hide();
              }
            }
          )
      }
      else {
        this.onSubmit("");
        this.spinnerService.hide();
      }
    }
  }

  onSubmit(tokenid) {
    debugger;
    this.spinnerService.show();
    this.subscriptionPlanPaymentAddDc.UserId = this.lsService.getloginId();
    this.subscriptionPlanPaymentAddDc.TokenId = tokenid;
    if (this.subscriptionPlanPaymentAddDc.SubscriptionPlanId == 0 || this.subscriptionPlanPaymentAddDc.SubscriptionPlanId == undefined) {
      this.error1 = 'Please select subscription plan';
      this.spinnerService.hide();
      return;
    }
    else if ((this.subscriptionPlanPaymentAddDc.Currency == '0' || this.subscriptionPlanPaymentAddDc.Currency == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
      this.error1 = 'Please select currency';
      this.spinnerService.hide();
      return;
    }
    // else if ((this.subscriptionPlanPaymentAddDc.Name == '' || this.subscriptionPlanPaymentAddDc.Name == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
    //   this.error1 = 'Please enter card full name';
    //   this.spinnerService.hide();
    //   return;
    // }
    // else if ((this.subscriptionPlanPaymentAddDc.Country == '' || this.subscriptionPlanPaymentAddDc.Country == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
    //   this.error = 'Please enter country';
    //   this.spinnerService.hide();
    //   return;
    // }
    // else if ((this.subscriptionPlanPaymentAddDc.State == '' || this.subscriptionPlanPaymentAddDc.State == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
    //   this.error = 'Please enter state';
    //   this.spinnerService.hide();
    //   return;
    // }
    // else if ((this.subscriptionPlanPaymentAddDc.City == '' || this.subscriptionPlanPaymentAddDc.City == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
    //   this.error = 'Please enter city';
    //   this.spinnerService.hide();
    //   return;
    // }
    // else if ((this.subscriptionPlanPaymentAddDc.PostalCode == '' || this.subscriptionPlanPaymentAddDc.PostalCode == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
    //   this.error = 'Please enter postal code';
    //   this.spinnerService.hide();
    //   return;
    // }
    // else if ((this.subscriptionPlanPaymentAddDc.Address == '' || this.subscriptionPlanPaymentAddDc.Address == undefined) && this.subscriptionPlanPaymentAddDc.SubscriptionPlanId > 1) {
    //   this.error = 'Please enter address';
    //   this.spinnerService.hide();
    //   return;
    // }
    else {
      if (this.subscriptionPlanPaymentAddDc.UserId > 0 && this.subscriptionPlanPaymentAddDc.UserId != undefined) {
        this.subPlanService.AddUpAddUpdateSubscriptionPlanPaydateBillReciept(this.subscriptionPlanPaymentAddDc)
          .subscribe(
            res => {
              debugger;
              if (res == 'succeeded') {
                this.success = "Payment successfully completed";
                this.error1 = '';
                this.error = '';
                localStorage.setItem("SubscriptionPlanId", this.subscriptionPlanPaymentAddDc.SubscriptionPlanId.toString());
                this.getpaymentlist();
                //this.closeModal(modal);
                this.spinnerService.hide();
              }
              else if (this.subscriptionPlanPaymentAddDc.SubscriptionPlanId == 1 || res == 'Added') {
                this.success = "You have successfully completed free plan";
                this.error1 = '';
                this.error = '';
                localStorage.setItem("SubscriptionPlanId", this.subscriptionPlanPaymentAddDc.SubscriptionPlanId.toString());
                this.getpaymentlist();
                //this.closeModal(modal);
                this.spinnerService.hide();
              }
              else {
                this.error1 = res;
                this.error = res;
                this.success = '';
                this.spinnerService.hide();
              }
            },
            error => {
              this.error1 = error;
              this.spinnerService.hide();
            });
      }
      else {
        this.error1 = 'Please fill required fields';
        this.spinnerService.hide();
      }
    }
  }

  onSavelocalstorage() {
    localStorage.setItem("SPSubscriptionPlanId", this.subscriptionPlanPaymentAddDc.SubscriptionPlanId.toString());
    localStorage.setItem("SPCurrency", this.subscriptionPlanPaymentAddDc.Currency);
    localStorage.setItem("SPPaymentAmount", this.checkoutamount);
  }
  onGetlocalstorage() {
    this.subscriptionPlanPaymentAddDc.SubscriptionPlanId = Number(localStorage.getItem("SPSubscriptionPlanId"));
    this.subscriptionPlanPaymentAddDc.Currency = localStorage.getItem("SPCurrency");
    this.subscriptionPlanPaymentAddDc.PaymentAmount = localStorage.getItem("SPPaymentAmount");
  }

}
