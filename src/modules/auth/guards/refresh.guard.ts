import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {TokenService} from "../../token/token.service";

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(private _tokenService: TokenService) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const refreshToken = req.body.refreshToken;
        return this._tokenService.findOne(refreshToken)
            .then(res => res !== null);
    }
}
