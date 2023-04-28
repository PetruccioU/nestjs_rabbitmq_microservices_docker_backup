import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {ClientProxy} from "@nestjs/microservices";
import { RegistrationDto } from 'apps/profile/src/dto/registration.dto';

@Controller('api')
export class AppController {
  constructor(
      @Inject('PROFILE_SERVICE') private profileService: ClientProxy,
      @Inject('AUTH_SERVICE') private authService: ClientProxy
  ) {}

  @Get('get_user_profile')
  async getUserProfile(){
    return this.profileService.send({ cmd: 'get-user' }, {});
  }

  @Get('get_user_auth')
  async getUserAuth(){
    return this.authService.send({ cmd: 'get-user' }, {});
  }


  @Post('registration')
  async registration(
      @Body('createUserDto') registrationDto: RegistrationDto,
      //@Body('createProfileDto') profileDto: CreateProfileDto
  )
  {
    console.log('cmd sent from the app controller')
    // По токену 'PROFILE_SERVICE' отправляем команду через RabbitMQ
    return this.profileService.send({ cmd: 'registration' }, {
      registrationDto
      //profileDto
    });
  }
}
