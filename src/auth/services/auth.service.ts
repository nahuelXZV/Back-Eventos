import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import * as jwt from 'jsonwebtoken';

import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthTokenResult, IUseToken, PayloadI } from '../interfaces/auth.interface';
import { useToken } from 'src/utils/use.token';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
    ) { }

    public async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.usersService.findBy({ key: 'email', value: email });
            console.log(user);
            if (!user || !await bcrypt.compare(password, user.password)) throw new NotFoundException('Usuario o contraseña incorrectos');
            console.log('validado');
            return this.generateJWT(user);
        } catch (error) {
            throw new InternalServerErrorException('Error al validar el usuario.');
        }
    }

    async checkToken(tokenUser: { token: string }) {
        try {
            const { token } = tokenUser;
            const managerToken: IUseToken | string = useToken(token);
            console.log(managerToken);
            if (typeof managerToken === 'string') return false;
            if (managerToken.isExpired) return false;
            const user = await this.usersService.findOneAuth(managerToken.sub);
            return user;
        } catch (error) {
            throw new InternalServerErrorException('Error al validar el token.');
        }
    }

    public singJWT({ payload, secret, expiresIn }: { payload: jwt.JwtPayload, secret: string, expiresIn: number | string }) {
        return jwt.sign(payload, secret, { expiresIn });
    }

    public async generateJWT(user: UsersEntity): Promise<any> {
        const payload: PayloadI = {
            sub: user.id,
        };
        const accessToken = this.singJWT({ payload, secret: process.env.JWT_AUTH, expiresIn: '7d' });
        return {
            accessToken,
            User: user
        };
    }

    public async recoverPassword(email: string): Promise<any> {
        const user = await this.usersService.findBy({ key: 'email', value: email });
        const payload: PayloadI = {
            sub: user.id,
        }
        const accessToken = this.singJWT({ payload, secret: process.env.JWT_RECOVERY, expiresIn: '1h' });
        return {
            accessToken
        };
    }


}

