import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppService2 } from './buy.service';
@Controller('buy')
export class BuyController {
    constructor(private readonly buyService: AppService2) {}
    @Post('health')
    health() {
        return this.buyService.getHealth();
    }
    @Post('buyThis')
    buyThis(@Body() body:{title:string;price:string}) {
        return this.buyService.getBill(body.title, body.price);
    }
    @Post('buyAll')
    buyAll(@Body() body:{price:string}) {
        return this.buyService.getBillAll(body.price);
    }
    @Get('getProducts')
    getProducts() {
            return this.buyService.getProducts();
        }

}
