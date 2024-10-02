import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DashboardMenu, MenuListModel } from '../../../shared/constants/menu-list';
import { Router } from '@angular/router';
import { NumberConstant } from '../../../shared/constants/number-constant';
import { MenuAim } from '@angular/cdk/menu';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-dash-side-nav',
  templateUrl: './dash-side-nav.component.html',
  styleUrl: './dash-side-nav.component.scss'
})
export class DashSideNavComponent implements OnInit, OnChanges, OnDestroy {
  menuList: MenuListModel[] = DashboardMenu;
  isActive!: MenuListModel;

  constructor(private router: Router) {
    this.setMenuData();
  }

  ngOnInit(): void {
    // this.isActive = this.menuList[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


  setMenuData() {
    const findActive = this.menuList.find((data: MenuListModel) => this.router.url === `/${data.url}`);
    this.isActive = findActive ? findActive : this.menuList[NumberConstant.ZERO];
  }

  menuClick(menu: MenuListModel, event: any) {
    if (menu.name === 'dashboard') {
      event.stopPropagation();
      event.preventDefault();
    } else {

    }
    this.isActive = menu;
    this.router.navigate([menu.url]);
  }

  isMenuActive(menu: MenuListModel): boolean {
    return this.isActive?.name === menu?.name
  }

  ngOnDestroy(): void { }
}
