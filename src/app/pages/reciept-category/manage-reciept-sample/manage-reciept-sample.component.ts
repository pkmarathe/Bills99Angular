import { Component, OnInit } from '@angular/core'; 
import { CategoryRecieptDc } from '../../../../app/shared/models/category-master-dc';
import { CategoryService } from '../../../../app/shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-reciept-sample',
  templateUrl: './manage-reciept-sample.component.html',
  styleUrls: ['./manage-reciept-sample.component.scss']
})
export class ManageRecieptSampleComponent implements OnInit {
  public categoryRecieptAddDc: CategoryRecieptDc = new CategoryRecieptDc(); 
  public categoryRecieptDc: Array<CategoryRecieptDc> = [];
  error: any;
  success: any;
  CategoryId: number; 
  constructor(private masterService: CategoryService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.categoryRecieptAddDc.CategoryRecieptId = 0;
    this.categoryRecieptAddDc.IsActive = true;
    this.CategoryId = this.route.snapshot.queryParams['id']; 
    this.categoryRecieptAddDc.CategoryId =  this.CategoryId;
    this.getCategoryRecieptlist();
  }

  getCategoryRecieptlist() { 
    this.masterService.GetCategoryReciept(this.CategoryId)
      .subscribe(
        res => {
          debugger;
          if (res != null) {
            this.categoryRecieptDc = res;
          }
        }
      )
  } 

  onAddUpdateCategoryReciept() {
    debugger
    if (this.categoryRecieptAddDc.BillRecieptDynamicHtml != "" && this.categoryRecieptAddDc.BillRecieptDynamicHtml != undefined && this.categoryRecieptAddDc.BillRecieptName != "" && this.categoryRecieptAddDc.BillRecieptName != undefined) {
      this.masterService.AddUpdateCategoryReciept(this.categoryRecieptAddDc)
        .subscribe(
          res => {
            debugger;
            if (res > 0) {
              if (this.categoryRecieptAddDc.CategoryId == 0) {
                this.success = 'Category Reciept Added Successfully';
              }
              else {
                this.categoryRecieptAddDc.CategoryId = 0;
                this.success = 'Category Reciept Updated Successfully';
              }
              this.onCancel();
              this.getCategoryRecieptlist();
            }
            else {
              this.error = 'Category Reciept Not Add/Update';
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

  onEditCategoryReciept(CategoryRecieptId: string) {
    this.masterService.GetCategoryRecieptById(CategoryRecieptId)
      .subscribe(
        res => {
          debugger;
          let countryTableDc: CategoryRecieptDc = res;
          this.categoryRecieptAddDc.CategoryId = countryTableDc.CategoryId;
          this.categoryRecieptAddDc.CategoryRecieptId = countryTableDc.CategoryRecieptId;
          this.categoryRecieptAddDc.BillRecieptDynamicHtml = countryTableDc.BillRecieptDynamicHtml;
          this.categoryRecieptAddDc.BillRecieptName = countryTableDc.BillRecieptName;
          this.categoryRecieptAddDc.IsActive = countryTableDc.IsActive; 
        },
        error => { }
      )
  }

  onCancel()
  {  
    this.categoryRecieptAddDc.CategoryRecieptId = 0; 
    this.categoryRecieptAddDc.BillRecieptDynamicHtml = ""; 
    this.categoryRecieptAddDc.BillRecieptName = "";  
  }

  onDeleteCategoryReciept(Id: number) {
    this.masterService.DeleteCategoryRecieptById(Id)
      .subscribe(
        res => {
          debugger;
          if (res == true) {
            this.success = 'Deleted Successfully';
            this.getCategoryRecieptlist();
          }
          else {
            this.error = 'Category Reciept Not Deleted';
          }
        },
      )
  }

  openModal(modal) { 
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  }

}
