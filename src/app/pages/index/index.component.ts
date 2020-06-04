import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';
import { DashboardDc, DashboardCountDc } from '../../../app/shared/models/dashboard-dc';
import { RegistrationService } from '../../../app/shared/services/registration.service';
import { LocalStorageService } from '../../../app/shared/services/common/localstorage.service'; 
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ChartsService]
})
export class IndexComponent implements OnInit {
  showloading: boolean = false;

  public dashboardDc: DashboardCountDc = new DashboardCountDc();
  filter: string;
  //public AnimationBarOption;

  constructor(private _chartsService: ChartsService, private regService: RegistrationService, private lsService: LocalStorageService) 
  {  }

  ngOnInit() {
    //this.AnimationBarOption = this._chartsService.getAnimationBarOption();
    this.getdashboard();
  }

  getdashboard() {
    this.regService.GetDashboardData(this.lsService.getloginId().toString(), this.lsService.getloginRole())
      .subscribe(
        res => {
          if (res != null) {
            this.dashboardDc = res.DashboardCountDc;
          }
        }
      )
  } 

}
