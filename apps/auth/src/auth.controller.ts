import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {Ctx, MessagePattern, RmqContext} from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() ctx: RmqContext){
    console.log('getting user fakie auth');
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
    return {user: 'USER auth'};
  }


  @MessagePattern({ cmd: 'get-user' })
  async getAuth(@Ctx() ctx: RmqContext){
    console.log('getting user fakie auth')
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
    return {user: 'USER auth'};
  }


}
