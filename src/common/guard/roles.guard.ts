// import { ROLES_KEY } from "@/common/decorators";
// import { Role } from "@/common/enums";
// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     console.log("required rules .... ", requiredRoles);
//     if (requiredRoles.some((n) => n == "ADMIN")) {
//       return true;
//     }
//     return false;
//     // if (!requiredRoles) {
//     //   return true;
//     // }
//     // const { user } = context.switchToHttp().getRequest();
//     // return requiredRoles.some(
//     //   (role) => user.roles?.includes(role) || role == Role.ANY,
//     // );
//   }
// }
