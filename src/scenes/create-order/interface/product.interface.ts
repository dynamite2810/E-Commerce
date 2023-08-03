export interface ProductType {
     id: number;
     productName: string;
     img: string;
     size: string;
     color: string;
     price: number;
     quantity: number;
     select?: boolean;
     total?:number;
   }