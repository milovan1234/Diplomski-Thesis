import { Producer } from '../models/producer';
import { SubCategory } from '../models/subCategory';

export class Product {
    public id: number;
    public producer: Producer;
    public subCategory: SubCategory;
    public price: number;
    public priceWithDiscount;
    public discount: number;
    public stock: number;
    public isActive: boolean;
    public imageFile: any;
    public description: string;
}