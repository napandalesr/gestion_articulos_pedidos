import { Config, httpClient, urlBase } from "../../../Config/HttpClient";
import { type OrderPorts } from "../../Ports/order.port";
import { type OrderModel, type IOrderResponse } from "./order.model";

export class OrderRepository implements OrderPorts {
  async getAll (): Promise<IOrderResponse> {
    return await httpClient().get(`${urlBase}/pedidos`, Config);
  }

  async post (data: OrderModel): Promise<IOrderResponse> {
    return await httpClient().post(`${urlBase}/pedidos`, data, Config);
  }

  async remove (id: number): Promise<IOrderResponse> {
    return await httpClient().delete(`${urlBase}/pedidos/${id}`, Config);
  }

  async getId (id: number): Promise<IOrderResponse> {
    return await httpClient().get(`${urlBase}/pedidos/${id}`, Config);
  }

  async update (id: number, dataSource: OrderModel): Promise<IOrderResponse> {
    return await httpClient().put(`${urlBase}/pedidos/${id}`, dataSource, Config);
  }
}
