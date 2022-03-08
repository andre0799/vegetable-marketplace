import { PrismaClient, Order } from '@prisma/client'
import { prisma } from 'backend/db/prisma'

type CreateOrderPayload = {
  listingId: string
  userId: string
}

export class Orders {
  private readonly prisma: PrismaClient['order']

  constructor() {
    this.prisma = prisma['order']
  }

  async createOrder(data: CreateOrderPayload): Promise<Order> {
    const result = await prisma.order.create({ data })
    return result
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })
    return order
  }

}
