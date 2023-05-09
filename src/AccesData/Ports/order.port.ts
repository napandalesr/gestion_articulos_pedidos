import { type OrderModel, type IOrderResponse } from "../Repositories/OrderRepository/order.model";

export interface OrderPorts {
  post: (articleModel: OrderModel) => Promise<IOrderResponse>
}
