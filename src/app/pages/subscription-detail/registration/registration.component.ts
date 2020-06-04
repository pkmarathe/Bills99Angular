import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LocalStorageService } from '../../../../app/shared/services/common/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../../../../app/shared/services/registration.service';
import { RegistrationTableDc } from '../../../../app/shared/models/registration-table-dc';
import swal from 'sweetalert2';
import { RootComponent } from '../../../../app/shared/roots/root.component';
import { GlobalService } from '../../../../app/shared/services/global.service';
import { MasterService } from '../../../../app/shared/services/master.service';
import { SubscriptionPlanDc } from '../../../../app/shared/models/subscription-plan-dc';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SubscriptionPlanPayService } from '../../../../app/shared/services/subscription-plan-pay.service';
import { PaymentCurrencyDc, PaymentCheckoutDc } from '../../../../app/shared/models/subscription-plan-payment-dc';
declare var Stripe: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends RootComponent implements OnInit {
  public registrationDc: RegistrationTableDc = new RegistrationTableDc();
  @ViewChild('fileInput') myFileInput: ElementRef;
  userRegistrationDc: any;
  public subscriptionPlanDc: SubscriptionPlanDc = new SubscriptionPlanDc();
  public PaymentCurrencyDc: Array<PaymentCurrencyDc> = [];
  error: any;
  checkoutsessionid: string;
  checkoutamount: string;
  public PaymentCheckoutDc: PaymentCheckoutDc = new PaymentCheckoutDc();
  constructor(private subPlanService: SubscriptionPlanPayService, private spinnerService: Ng4LoadingSpinnerService, public _globalService: GlobalService, private lsService: LocalStorageService, private route: ActivatedRoute, private router: Router, private regService: RegistrationService, private masterService: MasterService) {
    super(_globalService);
  }

  //Publishablekey = "pk_test_HFSzYRbru21PsWpmO7hWROLs009prnonfu"
  //Publishablekey = "pk_live_V6B0hXJyJzQ82puhEYu4ov9U00M7oGzJYm" 
  handler: any = null;
  ngOnInit() {
    debugger;
    //this.loadStripe();
    //this.alertMessage({ type: 'success', title: 'Required fields !!', value: 'Please fill required fields.' }); 
    this.registrationDc.UserId = 0;
    this.checkoutsessionid = this.route.snapshot.queryParams['session_id'];
    if (this.checkoutsessionid != undefined && this.checkoutsessionid != '' && this.checkoutsessionid != null) {
      this.onGetlocalstorage();
      this.onSubmit(this.checkoutsessionid);
    }
    this.registrationDc.Currency = 'usd';
    this.registrationDc.SubscriptionPlanId = this.route.snapshot.queryParams['id'];

    this.getsubscriptionplanbyid();
  }

  pay() {
    this.spinnerService.show();
    this.regService.GetRegistrationByCredential(this.registrationDc.EmailId, "")
      .subscribe(
        res => {
          if (res == null) {
            debugger;
            if (this.registrationDc.SubscriptionPlanId == 0 || this.registrationDc.SubscriptionPlanId == undefined) {
              this.error = 'Please select subscription plan';
              this.spinnerService.hide();
              return;
            }
            else if ((this.registrationDc.Name == '0' || this.registrationDc.Name == undefined)) {
              this.error = 'Please enter name';
              this.spinnerService.hide();
              return;
            }
            else if ((this.registrationDc.MobileNo == '0' || this.registrationDc.MobileNo == undefined)) {
              this.error = 'Please enter mobile number';
              this.spinnerService.hide();
              return;
            }
            else if ((this.registrationDc.EmailId == '0' || this.registrationDc.EmailId == undefined)) {
              this.error = 'Please enter emailid';
              this.spinnerService.hide();
              return;
            }
            else if ((this.registrationDc.Password == '0' || this.registrationDc.Password == undefined)) {
              this.error = 'Please enter password';
              this.spinnerService.hide();
              return;
            }
            else if ((this.registrationDc.Currency == '0' || this.registrationDc.Currency == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
              this.error = 'Please select currency';
              this.spinnerService.hide();
              return;
            }
            // else if ((this.registrationDc.CardName == '' || this.registrationDc.CardName == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
            //   this.error = 'Please enter card full name';
            //   this.spinnerService.hide();
            //   return;
            // }
            // else if ((this.registrationDc.Country == '' || this.registrationDc.Country == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
            //   this.error = 'Please enter country';
            //   this.spinnerService.hide();
            //   return;
            // }
            // else if ((this.registrationDc.State == '' || this.registrationDc.State == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
            //   this.error = 'Please enter state';
            //   this.spinnerService.hide();
            //   return;
            // }
            // else if ((this.registrationDc.City == '' || this.registrationDc.City == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
            //   this.error = 'Please enter city';
            //   this.spinnerService.hide();
            //   return;
            // }
            // else if ((this.registrationDc.PostalCode == '' || this.registrationDc.PostalCode == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
            //   this.error = 'Please enter postal code';
            //   this.spinnerService.hide();
            //   return;
            // }
            else {
              if (this.registrationDc.SubscriptionPlanId > 1) {

                //var stripe = Stripe('pk_test_HFSzYRbru21PsWpmO7hWROLs009prnonfu');
                var stripe = Stripe('pk_live_V6B0hXJyJzQ82puhEYu4ov9U00M7oGzJYm');
                let amount: number = 0;
                if (this.registrationDc.Currency == 'usd') {
                  amount = Number(this.subscriptionPlanDc.Amount) * 100;
                  this.checkoutamount = this.subscriptionPlanDc.Amount;
                }
                else {
                  debugger;
                  //this.GetCurrencyPerCharge(this.registrationDc.Currency);
                  debugger;
                  //var priceperdoller = this.PaymentCurrencyDc[0].PricePerDoller;
                  amount = Number(this.subscriptionPlanDc.Amount) * 75;
                  this.checkoutamount = amount.toString();
                  amount = amount * 100;
                }
                debugger;
                this.PaymentCheckoutDc.Amount = amount;
                this.registrationDc.PaymentAmount = this.checkoutamount;
                this.PaymentCheckoutDc.Currency = this.registrationDc.Currency;
                this.PaymentCheckoutDc.SubscriptionPlanId = this.subscriptionPlanDc.SubscriptionPlanId;
                this.PaymentCheckoutDc.CustomerEmail = this.registrationDc.EmailId;
                //this.PaymentCheckoutDc.ReturnUrl = "http://localhost:4500/registration?id=" + this.registrationDc.SubscriptionPlanId + "&";
                //this.PaymentCheckoutDc.CancelUrl = "http://localhost:4500/registration?id=" + this.registrationDc.SubscriptionPlanId;
                this.PaymentCheckoutDc.ReturnUrl = "https://app.bills99.com/registration?id=" + this.registrationDc.SubscriptionPlanId + "&";
                this.PaymentCheckoutDc.CancelUrl = "https://app.bills99.com/registration?id=" + this.registrationDc.SubscriptionPlanId;
                this.subPlanService.GetSessionId(this.PaymentCheckoutDc)
                  .subscribe(
                    res => {
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
          else {
            this.error = 'Email Id already exists';
            this.spinnerService.hide();
          }
        })
  }

  // pay() {
  //   debugger;
  //   if (this.registrationDc.SubscriptionPlanId == 0 || this.registrationDc.SubscriptionPlanId == undefined) {
  //     this.error = 'Please select subscription plan';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.Name == '0' || this.registrationDc.Name == undefined)) {
  //     this.error = 'Please enter name';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.MobileNo == '0' || this.registrationDc.MobileNo == undefined)) {
  //     this.error = 'Please enter mobile number';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.EmailId == '0' || this.registrationDc.EmailId == undefined)) {
  //     this.error = 'Please enter emailid';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.Password == '0' || this.registrationDc.Password == undefined)) {
  //     this.error = 'Please enter password';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.Currency == '0' || this.registrationDc.Currency == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please select currency';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.CardName == '' || this.registrationDc.CardName == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter card full name';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.Country == '' || this.registrationDc.Country == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter country';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.State == '' || this.registrationDc.State == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter state';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.City == '' || this.registrationDc.City == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter city';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else if ((this.registrationDc.PostalCode == '' || this.registrationDc.PostalCode == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
  //     this.error = 'Please enter postal code';
  //     this.spinnerService.hide();
  //     return;
  //   }
  //   else {
  //     var that = this;
  //     let amount: string = '0';
  //     if (this.registrationDc.Currency == 'usd') {
  //       amount = this.subscriptionPlanDc.Amount;
  //     }
  //     else {
  //       amount = this.subscriptionPlanDc.Amount;
  //       this.GetCurrencyPerCharge(this.registrationDc.Currency);
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
  //         that.onSubmit(token.id);
  //       }
  //     });
  //     handler.open({
  //       name: 'Stripe Payment',
  //       description: '',
  //       amount: Number(amount) * 100,
  //       currency: this.registrationDc.Currency,
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

  getsubscriptionplanbyid() {
    this.spinnerService.show();
    this.masterService.GetSubscriptionPlanById(this.registrationDc.SubscriptionPlanId.toString())
      .subscribe(
        res => {
          if (res != null) {
            this.subscriptionPlanDc = res;
          }
          this.spinnerService.hide();
        }
      )
  }

  onSubmit(tokenid) {
    this.spinnerService.show();
    debugger;
    if (this.registrationDc.UserId == 0 && this.registrationDc.EmailId != "" && this.registrationDc.EmailId != undefined && this.registrationDc.Password != "" && this.registrationDc.Password != undefined && this.registrationDc.Name != "" && this.registrationDc.Name != undefined) {
      //let formData: FormData = new FormData();
      //formData.append('file', this.myFileInput.nativeElement.files[0]);
      //this.registrationDc.ProfileImage = formData;
      this.registrationDc.IsActive = true;
      this.registrationDc.TermsOfUse = 'Yes';
      this.registrationDc.Role = 'customer';
      this.registrationDc.Designation = '';
      this.registrationDc.TokenId = tokenid;
      if (this.registrationDc.SubscriptionPlanId == 0 || this.registrationDc.SubscriptionPlanId == undefined) {
        this.error = 'Please select subscription plan';
        this.spinnerService.hide();
        return;
      }
      else if ((this.registrationDc.Name == '0' || this.registrationDc.Name == undefined)) {
        this.error = 'Please enter name';
        this.spinnerService.hide();
        return;
      }
      else if ((this.registrationDc.MobileNo == '0' || this.registrationDc.MobileNo == undefined)) {
        this.error = 'Please enter mobile number';
        this.spinnerService.hide();
        return;
      }
      else if ((this.registrationDc.EmailId == '0' || this.registrationDc.EmailId == undefined)) {
        this.error = 'Please enter emailid';
        this.spinnerService.hide();
        return;
      }
      else if ((this.registrationDc.Password == '0' || this.registrationDc.Password == undefined)) {
        this.error = 'Please enter password';
        this.spinnerService.hide();
        return;
      }
      else if ((this.registrationDc.Currency == '0' || this.registrationDc.Currency == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
        this.error = 'Please select currency';
        this.spinnerService.hide();
        return;
      }
      // else if ((this.registrationDc.CardName == '' || this.registrationDc.CardName == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
      //   this.error = 'Please enter card full name';
      //   this.spinnerService.hide();
      //   return;
      // }
      // else if ((this.registrationDc.Country == '' || this.registrationDc.Country == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
      //   this.error = 'Please enter country';
      //   this.spinnerService.hide();
      //   return;
      // }
      // else if ((this.registrationDc.State == '' || this.registrationDc.State == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
      //   this.error = 'Please enter state';
      //   this.spinnerService.hide();
      //   return;
      // }
      // else if ((this.registrationDc.City == '' || this.registrationDc.City == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
      //   this.error = 'Please enter city';
      //   this.spinnerService.hide();
      //   return;
      // }
      // else if ((this.registrationDc.PostalCode == '' || this.registrationDc.PostalCode == undefined) && this.registrationDc.SubscriptionPlanId > 1) {
      //   this.error = 'Please enter postal code';
      //   this.spinnerService.hide();
      //   return;
      // }
      else {
        this.regService.AddRegistration(this.registrationDc)
          .subscribe(
            res => {
              debugger
              if (res == "succeeded") {
                swal({ title: 'Done!', text: 'Payment successfully completed.', timer: 2000, onOpen: () => { swal.showLoading(); } });
                this.error = '';
                localStorage.setItem("SubscriptionPlanId", this.registrationDc.SubscriptionPlanId.toString());
                this.onLogin();
                this.spinnerService.hide();
              }
              else if (this.registrationDc.SubscriptionPlanId == 1 && res == "Added") {
                swal({ title: 'Done!', text: 'You have successfully completed free plan.', timer: 2000, onOpen: () => { swal.showLoading(); } });
                //this.success = "You have successfully completed free plan"; 
                this.error = '';
                localStorage.setItem("SubscriptionPlanId", this.registrationDc.SubscriptionPlanId.toString());
                this.onLogin();
                this.spinnerService.hide();
              }
              else if (res == "Exist") {
                this.error = "Email Id already exist";
                this.spinnerService.hide();
              }
              else {
                this.error = res;
                this.spinnerService.hide();
              }
            },
            error => {
              this.spinnerService.hide();
            });
      }
    }
    else {
      this.error = "Please fill required fields.";
      this.spinnerService.hide();
    }
  }

  onSavelocalstorage() {
    localStorage.setItem("RegSubscriptionPlanId", this.registrationDc.SubscriptionPlanId.toString());
    localStorage.setItem("RegName", this.registrationDc.Name);
    localStorage.setItem("RegMobileNo", this.registrationDc.MobileNo);
    localStorage.setItem("RegEmailId", this.registrationDc.EmailId);
    localStorage.setItem("RegPassword", this.registrationDc.Password);
    localStorage.setItem("RegCurrency", this.registrationDc.Currency);
    localStorage.setItem("RegPaymentAmount", this.checkoutamount);
  }
  onGetlocalstorage() {
    this.registrationDc.SubscriptionPlanId = Number(localStorage.getItem("RegSubscriptionPlanId"));
    this.registrationDc.Name = localStorage.getItem("RegName");
    this.registrationDc.MobileNo = localStorage.getItem("RegMobileNo");
    this.registrationDc.EmailId = localStorage.getItem("RegEmailId");
    this.registrationDc.Password = localStorage.getItem("RegPassword");
    this.registrationDc.Currency = localStorage.getItem("RegCurrency");
    this.registrationDc.PaymentAmount = localStorage.getItem("RegPaymentAmount");
  }

  onLogin() {
    if (this.registrationDc.EmailId != null && this.registrationDc.EmailId != undefined && this.registrationDc.Password != null && this.registrationDc.Password != undefined) {
      this.regService.GetRegistrationByCredential(this.registrationDc.EmailId, this.registrationDc.Password)
        .subscribe(
          res => {
            if (res != null) {
              this.userRegistrationDc = res;
              this.lsService.setLoginInfo(this.userRegistrationDc.UserId, this.userRegistrationDc.Name, this.userRegistrationDc.ProfileImage, this.userRegistrationDc.Role, this.userRegistrationDc.EmailId);
              localStorage.setItem("issubscription", this.userRegistrationDc.IsSubscription.toString());
              if (this.userRegistrationDc.Role == 'admin')
                this.router.navigate(['/pages/index']);
              else
                this.router.navigate(['/pages/generate-bill-reciept']);
            }
            else {
              this.error = "Email id is already exists & password of this is invalid";
            }
          },
        )
    }
  }

  gologin() {
    this.router.navigate(['/login']);
  }

  gohome() {
    this.router.navigate(['/subscription-detail']);
  }

}
