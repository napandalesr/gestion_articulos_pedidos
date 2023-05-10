import { type OrderModel, type IOrderResponse } from "../Repositories/OrderRepository/order.model";

export interface OrderPorts {
  post: (articleModel: OrderModel) => Promise<IOrderResponse>
  getAll: () => Promise<IOrderResponse>
  remove: (id: number) => Promise<IOrderResponse>
  getId: (id: number) => Promise<IOrderResponse>
  update: (id: number, dataSource: OrderModel) => Promise<IOrderResponse>
}
