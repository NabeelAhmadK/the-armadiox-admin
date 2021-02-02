import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

// Menu
export interface Menu {
	headTitle1?: string,
	headTitle2?: string,
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService implements OnDestroy {

	private unsubscriber: Subject<any> = new Subject();
	public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

	// Search Box
	public search: boolean = false;

	// Language
	public language: boolean = false;

	// Mega Menu
	public megaMenu: boolean = false;
	public levelMenu: boolean = false;
	public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

	// Collapse Sidebar
	public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

	// Full screen
	public fullScreen: boolean = false;

	constructor(private router: Router) {
		this.setScreenWidth(window.innerWidth);
		fromEvent(window, 'resize').pipe(
			debounceTime(1000),
			takeUntil(this.unsubscriber)
		).subscribe((evt: any) => {
			this.setScreenWidth(evt.target.innerWidth);
			if (evt.target.innerWidth < 991) {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			}
			if (evt.target.innerWidth < 1199) {
				this.megaMenuColapse = true;
			}
		});
		if (window.innerWidth < 991) { // Detect Route change sidebar close
			this.router.events.subscribe(event => {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			});
		}
	}

	ngOnDestroy() {
		this.unsubscriber.next();
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}

	MENUITEMS: Menu[] = [
		{
			headTitle1: 'Applications', headTitle2: 'The Armadiox.pk',
		},
		{
			path: '/pages/dashboard', title: ' Dashboard', icon: 'home', type: 'link', bookmark: true
		},
		{
			title: 'Customers', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/pages/customer-management/customers', title: 'Customers', type: 'link' },
				{ path: '/pages/customer-management/customer', title: 'Add Customer', type: 'link' }
			]
		},
		{
			title: 'Product', icon: 'package', type: 'sub', active: false, children: [
				{ path: '/pages/product-management/products', title: 'Products', type: 'link' },
				{ path: '/pages/product-management/product', title: 'Add Product', type: 'link' }
			]
		},
		{
			title: 'Manage Order', icon: 'shopping-bag', type: 'sub', active: false, children: [
				{ path: '/pages/order-management/order', title: 'Create Order', type: 'link' },
				{ path: '/pages/order-management/orders', title: 'View Orders', type: 'link' }
			]
		},
		{
			title: 'Reports', icon: 'trending-up', type: 'sub', active: false, children: [
				{ path: '/pages/user/team-details', title: 'Daily Report', type: 'link' },
				{ path: '/pages/user/profile', title: 'Inventory Reports', type: 'link' },
				{ path: '/pages/user/profile', title: 'Summary Report', type: 'link' }
			]
		},
	];

	MEGAMENUITEMS: Menu[] = [

	];

	LEVELMENUITEMS: Menu[] = [
		
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	megaItems = new BehaviorSubject<Menu[]>(this.MEGAMENUITEMS);
	levelmenuitems = new BehaviorSubject<Menu[]>(this.LEVELMENUITEMS);

}
