import {Body, Controller, Get, HttpStatus, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {ITokenPair} from "../token/interfaces/token-pair.interface";
import {LoginUserDto} from "./dto/login-user.dto";
import {AuthGuard} from "./guards/auth.guard";
import {TokenService} from "../token/token.service";
import {RefreshGuard} from "./guards/refresh.guard";
import {
    ApiBearerAuth,
    ApiBody,
    ApiForbiddenResponse,
    ApiOkResponse,
} from "@nestjs/swagger";
import {RefreshTokenPairDto} from "../token/dto/refresh-token-pair.dto";
import {TokenPairDto} from "../token/dto/token-pair.dto";

@Controller('auth')
export class AuthController {

    constructor(private _authService: AuthService,
                private _tokenService: TokenService) {
    }

    @Post('register')
    registerUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
        return this._authService.registerUser(user);
    }


    @Post('login')
    login(@Body() userPartial: LoginUserDto): Promise<ITokenPair> {
        return this._authService.loginUser(userPartial);
    }

    @ApiOkResponse({type: TokenPairDto, status: HttpStatus.OK})
    @ApiForbiddenResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden resource'})
    @ApiBody({type: RefreshTokenPairDto})
    @UseGuards(RefreshGuard)
    @Post('refresh')
    refreshTokenPair(@Body('refreshToken') refreshToken: string) {
        return this._tokenService.refreshTokenPair(refreshToken);
    }

    @ApiBearerAuth('accessToken')
    @UseGuards(AuthGuard)
    @Get('test')
    testGuard() {
        return 'Guard Test has just been executed !';
    }
}
