import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionPlanPayService } from '../../../app/shared/services/subscription-plan-pay.service';
import { PaymentCheckoutDc } from '../../../app/shared/models/subscription-plan-payment-dc';
declare var Stripe: any;
@Component({
  selector: 'app-stripepayment',
  templateUrl: './stripepayment.component.html',
  styleUrls: ['./stripepayment.component.scss']
})
export class StripepaymentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private subPlanService: SubscriptionPlanPayService) { }
  checkoutsessionid: string;
  public PaymentCheckoutDc: PaymentCheckoutDc = new PaymentCheckoutDc();
  error: string;
  ngOnInit() {
    this.checkoutsessionid = this.route.snapshot.queryParams['session_id'];
    if (this.checkoutsessionid != undefined && this.checkoutsessionid != '' && this.checkoutsessionid != null) {
      this.error = "success";
    }
  }

  onpayment() {
    var stripe = Stripe('pk_test_HFSzYRbru21PsWpmO7hWROLs009prnonfu');
    //var stripe = Stripe('pk_live_V6B0hXJyJzQ82puhEYu4ov9U00M7oGzJYm');
    this.PaymentCheckoutDc.Amount = 100;
    this.PaymentCheckoutDc.Currency = 'inr';
    this.subPlanService.GetSessionId(this.PaymentCheckoutDc)
      .subscribe(
        res => {
          // if (res.Result == true) {
          //   stripe.redirectToCheckout({
          //     sessionId: res
          //   }).then(function (result) {
          //     this.error = result.error.message
          //   });
          //}
        }
      )
  }

}
