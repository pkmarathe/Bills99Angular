import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RegistrationTableDc } from '../../../app/shared/models/registration-table-dc';
import { RegistrationService } from '../../../app/shared/services/registration.service';
import { LocalStorageService } from '../../../app/shared/services/common/localstorage.service';
import { environment } from '../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public registrationDc: RegistrationTableDc = new RegistrationTableDc();

  error: any;
  success: any;
  profileimage: string;
  @ViewChild('fileInput') myFileInput: ElementRef;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private regService: RegistrationService, private lsservice: LocalStorageService) { }

  ngOnInit() {
    this.registrationDc.UserId = this.lsservice.getloginId();
    this.getcustomerlist();
  }

  getcustomerlist() {
    this.spinnerService.show();
    this.regService.GetRegistrationById(this.lsservice.getloginId().toString())
      .subscribe(
        res => {
          if (res != null) {
            this.registrationDc = res;
            if (this.registrationDc.ProfileImage != null && this.registrationDc.ProfileImage != "")
              this.profileimage = environment.ImageBaseUrl + this.registrationDc.ProfileImage;
            else
              this.profileimage = environment.ImageBaseUrl + "ProfileImage/no-image.png";
          }
          this.spinnerService.hide();
        }
      )
  }

  onUpdateProfile() {
    this.spinnerService.show();
    if (this.registrationDc.UserId.toString() != "" && this.registrationDc.UserId != undefined && this.registrationDc.EmailId != "" && this.registrationDc.EmailId != undefined) {
      let formData: FormData = new FormData();
      formData.append('file', this.myFileInput.nativeElement.files[0]);
      this.registrationDc.ProfileImage = formData;
      this.regService.AddUserRegistration(this.registrationDc)
        .subscribe(
          res => { 
            if (res.status == 200) {
              this.success = "Profile updated successfully";
              this.error = '';
              localStorage.setItem("loginname", this.registrationDc.Name);
              localStorage.setItem("loginprofimage", this.registrationDc.ProfileImage);
              localStorage.setItem("loginrole", this.registrationDc.Role);
              this.spinnerService.hide();
            } 
            else {
              this.error = 'Customer Email Id already registered OR Profile Not Updated';
              this.spinnerService.hide();
            }
          },
          error => {
            this.error = error;
            this.spinnerService.hide();
          });
    }
    else {
      this.error = 'Please fill required fields';
      this.spinnerService.hide();
    }
  }

  // openModal(modal) {
  //   modal.open();
  // }

  // closeModal(modal) {
  //   modal.close();
  // }
}
