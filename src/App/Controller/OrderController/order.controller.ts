import { OrderRepository } from '../../../AccesData/Repositories/OrderRepository/order.repository';
import { OrderAdapter } from '../../Adapter/order.adapter';
import { type OrderDto, type OrderDtoResponse } from './order.dto';

export class OrderController {
  async post (data: OrderDto): Promise<OrderDtoResponse> {
    const orderAdapter = new OrderAdapter(new OrderRepository());
    return await orderAdapter.post(data);
  }

  async getAll (): Promise<OrderDtoResponse> {
    const orderAdapter = new OrderAdapter(new OrderRepository());
    return await orderAdapter.getAll();
  }

  async remove (id: number): Promise<OrderDtoResponse> {
    const orderAdapter = new OrderAdapter(new OrderRepository());
    return await orderAdapter.remove(id);
  }

  async getId (id: number): Promise<OrderDtoResponse> {
    const orderAdapter = new OrderAdapter(new OrderRepository());
    return await orderAdapter.getId(id);
  }

  async update (id: number, dataSource: OrderDto): Promise<OrderDtoResponse> {
    const articleAdapter = new OrderAdapter(new OrderRepository());
    return await articleAdapter.update(id, dataSource);
  }
}
