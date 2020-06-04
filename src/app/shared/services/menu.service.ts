import { Injectable } from '@angular/core';
//import { MENU_ITEM } from '../../pages/menu';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { LocalStorageService } from './common/localstorage.service';

@Injectable()
export class menuService {
  constructor(public _globalService: GlobalService, private _router: Router, private lsservice: LocalStorageService) {
    if (this.lsservice.getloginRole() == 'customer') {
      MENU_ITEM = MENU_CUSTOMER_ITEM;
      this.getNodePath(MENU_ITEM);
    }
    else {
      this.getNodePath(MENU_ITEM);
    }
  }

  private parent_node = null;
  private node = null;
  private path_item = [];

  protected queryParentNode(json: any, node_id: any) {
    for (let i = 0; i < json.length; i++) {
      if (this.node)
        break;
      const object = json[i];
      if (!object || !object.path)
        continue;
      if (object.path === node_id) {
        this.node = object;
        break;
      } else {
        if (object.children) {
          this.parent_node = object;
          this.queryParentNode(object.children, node_id);
        } else {
          continue;
        }
      }
    }
    if (!this.node)
      this.parent_node = null;
    return {
      parent_node: this.parent_node,
      node: this.node
    };
  }

  protected creatRouterLink(nodeId: any) {
    this.node = null;
    this.parent_node = null;
    const menuObj = this.queryParentNode(MENU_ITEM, nodeId);
    if (menuObj.parent_node && menuObj.parent_node.path) {
      this.path_item.unshift(menuObj.parent_node.path);
      return this.creatRouterLink(menuObj.parent_node.path);
    } else {
      return this.path_item;
    }
  }

  protected getNodePath(json: any): void {
    json.forEach((index) => {
      if (index.children) {
        //delete index.routerLink;
        this.getNodePath(index.children);
        index.toggle = 'init';
      } else {
        this.path_item = [index.path];
        index.routerLink = this.creatRouterLink(index.path);
        index.routerLink.unshift('/', 'pages');
      }
    })
  }

  public putSidebarJson() {
    return MENU_ITEM;
  }

  public selectItem(item) {
    item.forEach(element => {
      if (element.routerLink) {
        element.isActive = this._router.isActive(this._router.createUrlTree(element.routerLink), true);
        if (element.isActive)
          //this._globalService._isActived(element);
          this._globalService.dataBusChanged('isActived', element);
      } else if (element.children)
        this.selectItem(element.children);
    });
  }

}

export let MENU_ITEM = [
  { path: 'index', title: 'Dashboard', icon: 'dashboard' },
  { path: 'customer-list', title: 'Customer List', icon: 'list' },
  { path: 'subscription-plan-payment', title: 'Subscription Plan Payment', icon: 'database' },
  {
    path: 'configuration', title: 'Configuration', icon: 'gear',
    children: [
      { path: 'tax-master', title: 'Tax Master' },
      { path: 'subscription-plan', title: 'Subscription Plan' },
      { path: 'currency-master', title: 'Currency Master' }
    ]
  },
  { path: 'profile', title: 'User Profile', icon: 'user' },
  { path: 'reciept-category', title: 'Category', icon: 'file' },
  { path: 'generate-bill-reciept', title: 'Generate Reciept', icon: 'file' },
  { path: 'customer-bill-reciept', title: 'Customer Bill Reciept', icon: 'file' },
  { path: 'login', title: 'Logout', icon: 'sign-out' }, 
  //  {
  //   path: 'ui', title: 'UI Element', icon: 'paint-brush',
  //   children: [
  //     { path: 'grid', title: 'Bootstrap Grid' },
  //     { path: 'buttons', title: 'Buttons' },
  //     { path: 'notification', title: 'Notification' },
  //     { path: 'tabs', title: 'Tabs' },
  //     { path: 'file-tree', title: 'File Tree' },
  //     { path: 'modals', title: 'Modals' },
  //     { path: 'progress-bar', title: 'ProgressBar' },
  //     { path: 'loading', title: 'Loading' },
  //   ]
  // },
  // { path: 'editor', title: 'Pell Editor', icon: 'pencil' },
  // {
  //   path: 'table', title: 'Tables', icon: 'table',
  //   children: [
  //     { path: 'basic-tables', title: 'Basic Tables' },
  //     { path: 'data-table', title: 'Data Table' }
  //   ]
  // },
  // { path: 'icon', title: 'Icon', icon: 'diamond' },
  // {
  //   path: 'ui', title: 'UI Element', icon: 'paint-brush',
  //   children: [
  //     { path: 'grid', title: 'Bootstrap Grid' },
  //     { path: 'buttons', title: 'Buttons' },
  //     { path: 'notification', title: 'Notification' },
  //     { path: 'tabs', title: 'Tabs' },
  //     { path: 'file-tree', title: 'File Tree' },
  //     { path: 'modals', title: 'Modals' },
  //     { path: 'progress-bar', title: 'ProgressBar' },
  //     { path: 'loading', title: 'Loading' },
  //   ]
  // },
  // {
  //   path: 'form', title: 'Forms', icon: 'check-square-o',
  //   children: [
  //     { path: 'form-inputs', title: 'Form Inputs' },
  //     { path: 'form-layouts', title: 'Form Layouts' },
  //     { path: 'file-upload', title: 'File Upload' },
  //     { path: 'ng2-select', title: 'Ng2-Select' }
  //   ]
  // },
  // {
  //   path: 'charts', title: 'Charts', icon: 'bar-chart',
  //   children: [
  //     { path: 'echarts', title: 'Echarts' }
  //   ]
  // },
  // {
  //   path: 'menu-levels', title: 'Menu Levels', icon: 'sitemap',
  //   children: [
  //     {
  //       path: 'levels1', title: 'Menu Level1', children: [
  //         {
  //           path: 'levels1-1', title: 'Menu Level1-1'
  //         }
  //       ]
  //     },
  //     {
  //       path: 'levels2', title: 'Menu Level2'
  //     }
  //   ]
  // },
];

export let MENU_CUSTOMER_ITEM = [
  // { path: 'index', title: 'Dashboard', icon: 'dashboard' },
  //{ path: 'subscription-plan-payment', title: 'Subscription Plan Payment', icon: 'database' },
  { path: 'generate-bill-reciept', title: 'Generate Receipt', icon: 'file' },
  { path: 'customer-bill-reciept', title: 'My Receipts', icon: 'file' },
  //{ path: 'profile', title: 'User Profile', icon: 'user' },
  //{ path: 'login', title: 'Logout', icon: 'sign-out' },
];
