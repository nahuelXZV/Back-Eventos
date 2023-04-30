import { SetMetadata } from "@nestjs/common";
import { ROLES, ROLES_KEY } from "src/constants";

export const RolesAccess = (...roles: Array<string>) => SetMetadata(ROLES_KEY, roles);