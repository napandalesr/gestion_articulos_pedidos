import { type OrderPorts } from "../../AccesData/Ports/order.port";
import { type OrderDtoResponse, type OrderDto } from "../Controller/OrderController/order.dto";

export class OrderAdapter {
  constructor (private readonly orderPort: OrderPorts) {}
  async post (orderDto: OrderDto): Promise<OrderDtoResponse> {
    return await this.orderPort.post(orderDto);
  }
}
