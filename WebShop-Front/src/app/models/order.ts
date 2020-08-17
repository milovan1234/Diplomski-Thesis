import { OrderItem } from "./orderItem";

export class Order {
    public id: number;
    public userId: number;
    public city: string;
    public street: string;
    public houseNumber: string;
    public orderItems: OrderItem[];
}