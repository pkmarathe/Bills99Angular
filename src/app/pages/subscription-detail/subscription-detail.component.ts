import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; 
import { Router } from '@angular/router';
import { MasterService } from '../../../app/shared/services/master.service'; 
import { SubscriptionPlanDc } from '../../../app/shared/models/subscription-plan-dc';
import { LocalStorageService } from '../../../app/shared/services/common/localstorage.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.scss']
})
export class SubscriptionDetailComponent implements OnInit {
  public subscriptionPlanDc: Array<SubscriptionPlanDc> = [];
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router:Router,private masterService: MasterService,public lsservice:LocalStorageService) {
  } 
  ngOnInit() {  
    this.getsubscriptionplanlist(); 
  } 

  getsubscriptionplanlist() {
    this.spinnerService.show();
    this.masterService.GetSubscriptionPlan("True")
      .subscribe(
        res => {
          if (res != null) {
            this.subscriptionPlanDc = res;
          }
          this.spinnerService.hide();
        }
      )
  }
 
  goplanreg(SubscriptionPlanId:number)
  {
    this.router.navigate(['/registration'], { queryParams: { id: SubscriptionPlanId } }); 
  }
  gologin()
  {
    this.router.navigate(['/login']);
  }
  onpayment()
  {
    this.router.navigate(['/stripepayment']);
  }
}
