import { OrderRepository } from '../../../AccesData/Repositories/OrderRepository/order.repository';
import { OrderAdapter } from '../../Adapter/order.adapter';
import { type OrderDto, type OrderDtoResponse } from './order.dto';

export class OrderController {
  async post (data: OrderDto): Promise<OrderDtoResponse> {
    const orderAdapter = new OrderAdapter(new OrderRepository());
    return await orderAdapter.post(data);
  }
}
