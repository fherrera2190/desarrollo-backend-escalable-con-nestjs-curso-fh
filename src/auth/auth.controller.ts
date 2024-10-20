import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetRawHeaders, GetUser, RoleProtected } from './decorators/';
import { User } from './entities/user.entity';
import { UseRoleGuard } from './guards/use-role/use-role.guard';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @GetRawHeaders() rawHeaders: string[],
  ) {
    //console.log(user);
    //console.log(request);
    //console.log(rawHeaders)
    return {
      ok: true,
      message: 'testing private route',
      user,
      userEmail,
      rawHeaders,
    };
  }
  @Get('private2')
  //@SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards(AuthGuard(), UseRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return { ok: true, user };
  }

  @Get('private3')
  @Auth(ValidRoles.superUser)
  @RoleProtected(ValidRoles.superUser)
  //@SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards(AuthGuard(), UseRoleGuard)
  privateRoute3(@GetUser() user: User) {
    return { ok: true, user };
  }
}
