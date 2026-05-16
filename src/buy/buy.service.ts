import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService2 {
   
  getHealth() {
    return { status: 'ok'};
  }
  getBill(title:string,price:string) {
    return { status: `${title} был успешно куплен\nцена: ${price}` };
  }
}
