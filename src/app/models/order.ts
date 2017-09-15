export class Order{
    
    public id: number;
    
    //Order info
    public customer_note: string;
    public telecaller_note: string;
    public delivery_time: string;
    
    
    //Totals
    public total: number;
    public discount: number;
    
    //Address info
    public country: string;
    public city: string;
    public street: string;
    public street_number: string;
    public district: string;
    public estate: string;
    public house_number: string;
    
    //additional info
    public paymenttype: any;
    public items: Array<any>;
    public user: any;
    
}