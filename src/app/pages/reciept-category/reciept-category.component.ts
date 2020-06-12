import { Component, OnInit } from '@angular/core';
import { CategoryMasterDc, CategorySearchDc } from '../../../app/shared/models/category-master-dc'; 
import { CategoryService } from '../../../app/shared/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reciept-category',
  templateUrl: './reciept-category.component.html',
  styleUrls: ['./reciept-category.component.scss']
})
export class RecieptCategoryComponent implements OnInit {

  public categoryMasterAddDc: CategoryMasterDc = new CategoryMasterDc();
  public categoryMasteSearchDc: CategorySearchDc = new CategorySearchDc();
  public categoryMasterDc: Array<CategoryMasterDc> = [];
  error: any;
  success: any;
  constructor(private masterService: CategoryService,private router: Router) { }

  ngOnInit() {
    this.categoryMasterAddDc.CategoryId = 0;
    this.categoryMasterAddDc.IsActive = true;
    this.getCategorylist();
  }

  getCategorylist() {
    this.categoryMasteSearchDc.IsActive = "All";
    this.masterService.SearchCategory(this.categoryMasteSearchDc)
      .subscribe(
        res => {
          if (res != null) {
            this.categoryMasterDc = res;
          }
        }
      )
  }

  onAddUpdateCategory() {
    if (this.categoryMasterAddDc.CategoryName != "" && this.categoryMasterAddDc.CategoryName != undefined) {
      this.masterService.AddUpdateCategoryMaster(this.categoryMasterAddDc)
        .subscribe(
          res => {
            if (res > 0) {
              if (this.categoryMasterAddDc.CategoryId == 0) {
                this.success = 'Category Added Successfully';
              }
              else {
                this.categoryMasterAddDc.CategoryId = 0;
                this.success = 'Category Updated Successfully';
              }
              this.onCancel();
              this.getCategorylist();
            }
            else {
              this.error = 'Category Not Add/Update';
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

  onEditCategory(CategoryId: string) {
    this.masterService.GetCategoryById(CategoryId)
      .subscribe(
        res => {
          let countryTableDc: CategoryMasterDc = res;
          this.categoryMasterAddDc.CategoryId = countryTableDc.CategoryId;
          this.categoryMasterAddDc.CategoryName = countryTableDc.CategoryName;
          this.categoryMasterAddDc.IsActive = countryTableDc.IsActive;
        },
        error => { }
      )
  }

  onCancel()
  {  
    this.categoryMasterAddDc.CategoryId = 0; 
    this.categoryMasterAddDc.CategoryName = ""; 
  }

  onViewReciept(Id: number): void {
    this.router.navigate(['/pages/reciept-category/category-reciept-sample'], { queryParams: { id: Id } });
  }

  onDeleteCategory(Id: number) {
    this.masterService.DeleteCategoryById(Id)
      .subscribe(
        res => {
          if (res == true) {
            this.success = 'Deleted Successfully';
            this.getCategorylist();
          }
          else {
            this.error = 'Category Not Deleted';
          }
        },
      )
  }

}
