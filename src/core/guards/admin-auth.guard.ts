import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import JwtHelper from "../jwt/jwt.helper";
import { UsersRepository } from "src/modules/users/users.repository";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(
        private readonly jwtHelper: JwtHelper,
        private readonly usersRepository: UsersRepository
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        return await this.validateRequest(req);
    }

    async validateRequest(req: any): Promise<boolean> {
        try {
            const bearerToken = req.headers.authorization;
            const bearer = 'Bearer ';
            if (!bearerToken || !bearerToken.startsWith(bearer)) {
                return false;
            }
            const token = bearerToken.replace(bearer, '');
            const jwtPayload = this.jwtHelper.verifyToken(token);
            const data = await this.usersRepository.findOne(jwtPayload.userId);
            if (!data || data instanceof Error || (data.role !== 1 && data.role !== 2)) {
                return false;
            }
            req.user = data;
            return true;
        } catch (e) {
            return false;
        }
    }
}