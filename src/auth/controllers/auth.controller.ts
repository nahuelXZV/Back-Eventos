import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { AuthDTO } from '../dto/auth.dto';
import { AuthI } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    public async login(@Body() { email, password }: AuthDTO, @Query('tokenMobile') tokenMobile: string): Promise<AuthI> {
        return this.authService.validateUser(email, password, tokenMobile);
    }

    @Post('checkToken')
    public async checkToken(@Body() token: { token: string }) {
        return this.authService.checkToken(token);
    }

    // recover password  @Query('limit') limit: string
    // @Post('recover')
    // public async recover(@Body() { username }) {
    // return await this.authService.recoverPassword(username);
    // }

}
