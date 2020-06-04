import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../services/common/localstorage.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'right-config',
  templateUrl: './right-config.component.html',
  styleUrls: ['./right-config.component.scss']
})
export class RightConfigComponent implements OnInit {
  public profileimage: string;
  isConfigToggle: boolean = false;
  error: any;
  success: any;
  EmailId: string;
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
  constructor(private _globalService: GlobalService, private router: Router, private lsservice: LocalStorageService, private regService: RegistrationService) { }

  ngOnInit() {
    debugger; 
    if(this.lsservice.isLoggedin() == null || this.lsservice.isLoggedin() == false || this.lsservice.isLoggedin() == undefined)
    {
      this.router.navigate(['/login']);
    }
    if(this.lsservice.getloginProfImage() != null && this.lsservice.getloginProfImage() != "")
    this.profileimage = environment.ImageBaseUrl + this.lsservice.getloginProfImage();
    else
    this.profileimage = environment.ImageBaseUrl + "ProfileImage/no-image.png";
  }

  openModal(modal) {
    this.OldPassword = "";
    this.NewPassword = "";
    this.ConfirmPassword = "";
    this.error = "";
    this.success = "";
    modal.open();
  }

  onchange(modal){
    debugger;
    if(this.NewPassword != this.ConfirmPassword)
    {
      this.error = 'New Password & Confirm Password not matched';
      this.success = '';
    }
    else if (this.OldPassword != "" && this.OldPassword != undefined && this.NewPassword != "" && this.NewPassword != undefined && this.ConfirmPassword != "" && this.ConfirmPassword != undefined) 
    {           
      this.regService.ChangePassword(this.lsservice.getUserName(),this.OldPassword,this.NewPassword)
        .subscribe(
          res => { 
            debugger; 
            if (Number(res) > 0) { 
              this.success = 'Password changed Successfully';
              this.error = '';
            }
            else {
              this.error = 'Password not changed';
              this.success = '';
            }
          },
          error => {
            this.error = error;
          });
    }
    else {
      this.error = 'Please fill required fields';
      this.success = '';
    }
  }

  onLoggedout() {
    debugger;
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
  }
  onupdateprofile() { 
    this.router.navigate(['/pages/profile']);
  }
  onsubscriptionplan() { 
    this.router.navigate(['/pages/subscription-plan-payment']);
  }

  closeModal(modal) {
    modal.close();
  }
  configToggle() {
    this.isConfigToggle = !this.isConfigToggle;
    //this._globalService._sidebarToggleState(!this.isConfigToggle);
    this._globalService.dataBusChanged('sidebarToggle', !this.isConfigToggle);
  }


}
