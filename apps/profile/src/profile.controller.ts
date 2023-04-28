import {Controller, Get, Inject} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {RegistrationDto} from "./dto/registration.dto";

@Controller()
export class ProfileController {
  constructor(
      private readonly profileService: ProfileService
  ) {}

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() ctx: RmqContext){
    console.log('getting user fakie profile');
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
    return {user: 'USER profile'};
  }

  @MessagePattern({ cmd: 'registration' })
  async registration(
      @Ctx() ctx: RmqContext,
      @Payload('createUserDto') regDto: RegistrationDto,
               //@Payload('createProfileDto') profileDto: CreateProfileDto,
               ){

    console.log('something is happening in the profile controller')
    await console.log(JSON.stringify(regDto));

    // Получим канал.
    const channel = ctx.getChannelRef();
    // Получим сообщение.
    const message = ctx.getMessage();
    // Подтвердим получение сообщения из канала.
    channel.ack(message)

    //this.rabbitMqService.acknowledgeMessage(ctx); // Сообщение получено.
    //return this.profileService.registration(userDto,profileDto)  // Делегировали логику
  }

}
