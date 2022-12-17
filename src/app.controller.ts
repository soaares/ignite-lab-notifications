import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'crypto';
import { CreateNotificationBody } from './create-notification-body';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get('notifications')
  list() {
    return this.prisma.notifications.findMany();
  }

  @Post('notifications')
  async create(@Body() body: CreateNotificationBody): Promise<void> {
    const { recipientId, content, category } = body

    await this.prisma.notifications.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipient_id: recipientId
      }
    });
  }
}
