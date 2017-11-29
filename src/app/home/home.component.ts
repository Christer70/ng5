import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { PipeTransform, Pipe } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    
        trigger('orders', [
          transition('* => *', [
            query(':enter', style({ opacity: 0 }), {optional: true}),
            
            query(':enter', stagger('300ms', [
              animate('.6s ease-in', keyframes([
                style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
                style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
              ]))]), {optional: true}),

            query(':leave', stagger('300ms', [
              animate('.6s ease-out', keyframes([
                style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
                style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
              ]))]), {optional: true})

          ])
        ])
    
      ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add order';
  nameText: string = '';
  emailText:string = '';
  dateText: string = '';
  noteText:string = '';
  phonenumberText: string = '';
  currentAddressText: string = '';
  newAddressText: string = '';
  serviceText: string = '';
  orders = [];
  editingItemIndex:number = -1;
  
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.order.subscribe(res => this.orders = res);
    this._data.changeOrder(this.orders);
    this.itemCount = this.orders.length;
  }

  addUpdateItem() {
    if(this.editingItemIndex > -1)
    {
      let item = this.orders[this.editingItemIndex];
      item.Name = this.nameText;
      item.PhoneNumber = this.phonenumberText;
      item.Email = this.emailText;
      item.CurrentAddress = this.currentAddressText;
      item.NewAddress = this.newAddressText;
      item.Service = this.serviceText;
      item.DateOfService = this.dateText;
      item.Note = this.noteText;
      
      this._data.updateOrder(this.orders);
      this.editingItemIndex = -1;
    }
    else
    {
      this.orders.push({Name:this.nameText, PhoneNumber:this.phonenumberText,
        DateOfService:this.dateText, Email:this.emailText});
        this._data.addOrder(this.orders);
    }
    this.nameText = '';
    this.phonenumberText = '';
    this.emailText = '';
    this.currentAddressText = '';
    this.newAddressText = '';
    this.serviceText = '';
    this.dateText = '';
    this.noteText = '';
    this.itemCount = this.orders.length;
    this.btnText = "Add order";
    
  }

  removeItem(i) {
    this.orders.splice(i, 1);
    this.nameText = '';
    this.phonenumberText = '';
    this.itemCount = this.orders.length;
    
    this._data.deleteOrder(this.orders);
  }
  editItem(i) {
    //this._data.updateOrder(this.orders);
    let editItem = this.orders[i];
    this.nameText = editItem.Name;
    this.phonenumberText = editItem.PhoneNumber;
    this.emailText = editItem.Email;
    this.currentAddressText = editItem.CurrentAddress;
    this.newAddressText = editItem.NewAddress;
    this.serviceText = editItem.Service;
    this.dateText= editItem.DateOfService;
    this.noteText = editItem.Note;
  
    this.editingItemIndex =  i;
    this.btnText = "Update order";
  }

}
