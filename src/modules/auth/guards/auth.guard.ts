import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {configuration} from "../../../config";

import {TokenService} from "../../token/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _tokenService: TokenService,
                private _jwtService: JwtService) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const header = req.headers.authorization;
        if (!header) {
            throw new UnauthorizedException();
        }
        const [bearer, token] = [...header.split(' ')];
        const res = (bearer === 'Bearer' && this._jwtService.verify(token,
            {
                secret: configuration().token_secret
            }
        ));
        if (!res) {
            throw new UnauthorizedException();
        }
        return res;
    }
}
