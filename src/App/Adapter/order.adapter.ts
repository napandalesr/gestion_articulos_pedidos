import { type OrderPorts } from "../../AccesData/Ports/order.port";
import { type OrderDtoResponse, type OrderDto } from "../Controller/OrderController/order.dto";

export class OrderAdapter {
  constructor (private readonly orderPort: OrderPorts) {}
  async post (orderDto: OrderDto): Promise<OrderDtoResponse> {
    return await this.orderPort.post(orderDto);
  }

  async getAll (): Promise<OrderDtoResponse> {
    return await this.orderPort.getAll();
  }

  async remove (id: number): Promise<OrderDtoResponse> {
    return await this.orderPort.remove(id);
  }

  async getId (id: number): Promise<OrderDtoResponse> {
    return await this.orderPort.getId(id);
  }

  async update (id: number, dataSource: OrderDto): Promise<OrderDtoResponse> {
    return await this.orderPort.update(id, dataSource);
  }
}
