import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../../app/shared/services/common/localstorage.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../../../app/shared/services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Email: string;
  Password: string;
  error: any;
  success: any;
  userRegistrationDc: any;  
  ForgetEmailId:string
  constructor(private spinnerService: Ng4LoadingSpinnerService,private lsService: LocalStorageService, private router: Router, private regService: RegistrationService) {
  } 
  ngOnInit() {
    
  }

  onLogin() { 
    this.spinnerService.show(); 
    if (this.Email != null && this.Email != undefined && this.Password != null && this.Password != undefined) {
      this.regService.GetRegistrationByCredential(this.Email, this.Password)
        .subscribe(
          res => {
            if (res != null) {
              this.userRegistrationDc = res;
              this.lsService.setLoginInfo(this.userRegistrationDc.UserId, this.userRegistrationDc.Name, this.userRegistrationDc.ProfileImage, this.userRegistrationDc.Role, this.userRegistrationDc.EmailId);
              localStorage.setItem("issubscription", this.userRegistrationDc.IsSubscription.toString());
              localStorage.setItem("SubscriptionPlanId", this.userRegistrationDc.SubscriptionPlanId.toString());
              this.spinnerService.hide(); 
              if (this.userRegistrationDc.Role == 'admin')
                this.router.navigate(['/pages/index']);
              else
                this.router.navigate(['/pages/generate-bill-reciept']);

            }
            else {
              this.error = "User name or password is invalid !!"; 
              this.success = ""; 
              this.spinnerService.hide();
            } 
          },
        )
    }
    else {
      this.error = "Please fill required fields !!";  
      this.success = ""; 
      this.spinnerService.hide();
    }
  }

  onSubmit(modal) { 
    if (this.ForgetEmailId != null && this.ForgetEmailId != undefined) {
      this.regService.ForgotPassword(this.ForgetEmailId)
        .subscribe(
          res => {
            if (res > 0) {
              this.success = "Password successfully sent on your emailid !!"; 
              this.error = ""; 
              this.closeModal(modal);
              this.spinnerService.hide();
            }
            else {
              this.error = "Password sending error !!"; 
              this.success = ""; 
              this.spinnerService.hide();
            } 
          },
        )
    }
    else {
      this.error = "Please fill required fields !!";  
      this.success = ""; 
      this.spinnerService.hide();
    }
  }

  gohome()
  {
    this.router.navigate(['/subscription-detail']);
  }

  openModal(modal) {
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  } 

}
