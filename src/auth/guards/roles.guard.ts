import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { ADMIN_KEY, PUBLIC_KEY, ROLES, ROLES_KEY } from 'src/constants';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    try {
      const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
      if (isPublic) return true;
      const roles = this.reflector.get<Array<string>>(ROLES_KEY, context.getHandler());
      const admin = this.reflector.get<Array<string>>(ADMIN_KEY, context.getHandler());
      const request = context.switchToHttp().getRequest<Request>();
      const { idUser } = request;
      const user: UsersEntity = await this.userService.findOne(idUser);
      const rolesUser = user.roles.map((rol) => rol.nombre);
      const isAuthorized = rolesUser.some((rol) => roles.includes(rol));
      if (!isAuthorized) throw new UnauthorizedException('No tienes permisos para acceder a esta ruta.');
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error al validar los permisos');
    }

  }
}
