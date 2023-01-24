import { Users } from "./user";

export class Orders {
    id:number = 0;
    item_name:string = "";
    height:number = 0;
    weight:number = 0;
    picked_date:string = "";
    picked_time:string = "";
    pickedup_location:string = "";
    delivery_location:string = "";
    delivery_date:string = "";
    delivery_time:string = "";
    customer_notes:string = "";
    driver_notes:string = "";
    customer_id:number=0;
    order_status:number=0;
    order_ref:string="";
    driver_id:number=0;
    status_name:string="";
    driver_name:string="";
    driverDetails!:Users;
    customerDetails!:Users;
    logs:Log[]=[];
}

export class Log {
    id:number = 0;
    date:string="";
    order_id:number = 0;
    message:string = "";
    status:number = 0;
}

export class Dashboard {
    value:number = 0;
    title:string = "";
}

export enum EnumOrderStatus {
    closed = 0,
    created = 1,
    Accepted = 2,
    Ready = 3,
    pickedup = 4,
    deliveryway = 5, 
}