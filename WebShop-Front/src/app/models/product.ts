import { Producer } from '../models/producer';
import { SubCategory } from '../models/subCategory';
import { Category } from './category';

export class Product {
    public id: number;
    public producer: Producer;
    public subCategory: SubCategory;
    public category: Category;
    public price: number;
    public priceWithDiscount;
    public discount: number;
    public stock: number;
    public isActive: boolean;
    public imageFile: any;
    public description: string;
    public quantity: number;
    public countSold: number;
}