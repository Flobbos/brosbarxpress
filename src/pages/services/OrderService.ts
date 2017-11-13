import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import {Order} from '../../app/models/order';

@Injectable()

export class OrderService {
    
    constructor(private storage: Storage){}
    
    public getOrders():any{
        return this.getOrdersPromise().then(orders => { return orders; })
    }
    
    public getOrdersPromise():Promise<Order[]>{
        return this.storage.get('orders');
    }
    
    public setOrders(orders): void{
        this.storage.set('orders',orders);
    }
    
    public removeOrder(id: number): Promise<void>{
        return Promise.resolve(this.getOrdersPromise().then((orders)=>{
            let index = orders.indexOf(orders.find(order => order.id == id));
            orders.splice(index, 1);
            this.setOrders(orders);
        }));
    }
    
    public spliceOrders(id: number,orders: Array<Order>):Array<Order>{
        let index = orders.indexOf(orders.find(order => order.id == id));
        orders.splice(index, 1);
        return orders;
    }
    
    public getAddress(order: Order): string{
        return order.city+order.district+order.street+order.street_number+order.house_number;
    }
    
    public removeAllOrders(){
        this.storage.set('orders',[]);
    }
    
    
}

