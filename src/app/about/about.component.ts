import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
  
})
export class AboutComponent implements OnInit {

  orders: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService) {
    this.route.params.subscribe(res => console.log(res.id));
   }

  ngOnInit() {
    this._data.order.subscribe(res => this.orders = res);
  }

  sendMeHome() {
    this.router.navigate(['']);
  }

}
