import {Module} from '@nestjs/common';
import {GatewayService} from './gateway.service';
import {MyGateway} from "./my-gateway";

@Module({
    providers: [GatewayService, MyGateway]
})
export class GatewayModule {
}
