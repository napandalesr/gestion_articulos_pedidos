import { Config, httpClient, urlBase } from "../../../Config/HttpClient";
import { type OrderPorts } from "../../Ports/order.port";
import { type OrderModel, type IOrderResponse } from "./order.model";

export class OrderRepository implements OrderPorts {
  async post (data: OrderModel): Promise<IOrderResponse> {
    return await httpClient().post(`${urlBase}/pedidos`, data, Config);
  }
}
