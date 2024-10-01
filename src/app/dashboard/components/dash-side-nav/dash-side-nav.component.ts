import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DashboardMenu, MenuListModel } from '../../../shared/constants/menu-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-side-nav',
  templateUrl: './dash-side-nav.component.html',
  styleUrl: './dash-side-nav.component.scss'
})
export class DashSideNavComponent implements OnInit, OnChanges, OnDestroy {
  menuList: MenuListModel[] = DashboardMenu;
  isActive!: MenuListModel;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isActive = this.menuList[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  menuClick(menu: MenuListModel, event: any) {
    this.isActive = menu;
    this.router.navigate([menu.url]);
  }

  isMenuActive(menu: MenuListModel): boolean {
    return this.isActive?.name === menu?.name
  }

  ngOnDestroy(): void {}
}
