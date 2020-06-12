import { Component, OnInit } from '@angular/core'; 
import { MasterService } from '../../../../app/shared/services/master.service';
import { SubscriptionPlanDc } from '../../../../app/shared/models/subscription-plan-dc';
@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss']
})
export class SubscriptionPlanComponent implements OnInit {

  public subscriptionPlanAddDc: SubscriptionPlanDc = new SubscriptionPlanDc();
  public subscriptionPlanDc: Array<SubscriptionPlanDc> = [];
  error: any;
  success: any;
  constructor(private masterService: MasterService) { }

  ngOnInit() {
    this.subscriptionPlanAddDc.SubscriptionPlanId = 0;
    this.subscriptionPlanAddDc.IsActive = true;
    this.subscriptionPlanAddDc.PaymentType = 'Recurring';
    this.getsubscriptionplanlist();
  }

  getsubscriptionplanlist() {
    this.masterService.GetSubscriptionPlan("All")
      .subscribe(
        res => {
          if (res != null) {
            this.subscriptionPlanDc = res;
          }
        }
      )
  }

  onAddUpdateSubscriptionPlan() {
    if (this.subscriptionPlanAddDc.SubscriptionPlan != "" && this.subscriptionPlanAddDc.SubscriptionPlan != undefined) {
      this.masterService.AddUpdateSubscriptionPlan(this.subscriptionPlanAddDc)
        .subscribe(
          res => {
            if (res > 0) {
              if (this.subscriptionPlanAddDc.SubscriptionPlanId == 0) {
                this.success = 'Subscription Plan Added Successfully';
              }
              else {
                this.subscriptionPlanAddDc.SubscriptionPlanId = 0;
                this.success = 'Subscription Plan Updated Successfully';
              }
              this.onCancel();
              this.getsubscriptionplanlist();
            }
            else {
              this.error = 'Subscription Plan Not Add/Update';
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

  onEditSubscriptionPlan(SubscriptionPlanId: string) {
    this.masterService.GetSubscriptionPlanById(SubscriptionPlanId)
      .subscribe(
        res => {
          let countryTableDc: SubscriptionPlanDc = res;
          this.subscriptionPlanAddDc.SubscriptionPlanId = countryTableDc.SubscriptionPlanId;
          this.subscriptionPlanAddDc.SubscriptionPlan = countryTableDc.SubscriptionPlan;
          this.subscriptionPlanAddDc.SubscriptionPlanDesc = countryTableDc.SubscriptionPlanDesc;
          this.subscriptionPlanAddDc.PaymentType = countryTableDc.PaymentType;
          this.subscriptionPlanAddDc.Amount = countryTableDc.Amount;
          this.subscriptionPlanAddDc.Color = countryTableDc.Color;
          this.subscriptionPlanAddDc.IsActive = countryTableDc.IsActive;
        },
        error => { }
      )
  }

  onCancel()
  {  
    this.subscriptionPlanAddDc.SubscriptionPlanId = 0; 
    this.subscriptionPlanAddDc.SubscriptionPlan = ""; 
    this.subscriptionPlanAddDc.SubscriptionPlanDesc = ""; 
    this.subscriptionPlanAddDc.Amount = ""; 
    this.subscriptionPlanAddDc.Color = ""; 
  }

  onDeleteSubscriptionPlan(Id: number) {
    this.masterService.DeleteSubscriptionPlanById(Id)
      .subscribe(
        res => {
          if (res == true) {
            this.success = 'Subscription Plan Deleted Successfully';
            this.getsubscriptionplanlist();
          }
          else {
            this.error = 'Subscription Plan Not Deleted';
          }
        },
      )
  }
}
