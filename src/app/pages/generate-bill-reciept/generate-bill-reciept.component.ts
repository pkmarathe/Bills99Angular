import { Component, OnInit } from '@angular/core';
import { CategoryRecieptDc, CategorySearchDc, CategoryMasterDc } from '../../../app/shared/models/category-master-dc';
import { CategoryService } from '../../../app/shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../app/shared/services/common/localstorage.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-generate-bill-reciept',
  templateUrl: './generate-bill-reciept.component.html',
  styleUrls: ['./generate-bill-reciept.component.scss']
})
export class GenerateBillRecieptComponent implements OnInit {
  public categoryRecieptDc: Array<CategoryRecieptDc> = [];
  public categoryMasterDc: Array<CategoryMasterDc> = [];
  public categorySearchDc: CategorySearchDc = new CategorySearchDc();
  error: any;
  success: any;
  CategoryId: number = 0;  
  constructor(private spinnerService: Ng4LoadingSpinnerService,private masterService: CategoryService, private route: ActivatedRoute, private router: Router,private lsservice:LocalStorageService) { }

  ngOnInit() {     
    this.CategoryId = 1;
    this.GetCategoryDropdown();
    this.getCategoryRecieptlist(); 
  }

// show()
// {
//   this.spinnerService.show();
//   setTimeout(()=>this.spinnerService.hide(),3000)
// }

  getCategoryRecieptlist() {
    this.spinnerService.show();
    this.masterService.GetCategoryReciept(this.CategoryId)
      .subscribe(
        res => {
          if (res != null) {
            this.categoryRecieptDc = res; 
          }
          this.spinnerService.hide();
        }
      ) 
  }

  GetCategoryDropdown() {
    this.spinnerService.show();
    this.categorySearchDc.IsActive = "True";
    this.masterService.SearchCategory(this.categorySearchDc).subscribe(
      res => {
        this.categoryMasterDc = res;
        this.spinnerService.hide();
      },
      error => { this.spinnerService.hide();}
    )    
  }

  onGenerateReciept(CategoryRecieptId: string) {
    if(localStorage.getItem("issubscription").toString() == "true" || this.lsservice.getloginRole() == "admin")
    this.router.navigate(['/pages/generate-bill-reciept/generate-reciept-pdf'], { queryParams: { id: CategoryRecieptId } });
    else
    this.router.navigate(['/pages/subscription-plan-payment']);
  }
  

}
