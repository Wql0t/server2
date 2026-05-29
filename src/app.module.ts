import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';
import { BuyController } from './buy/buy.controller';
import { AppService2 } from './buy/buy.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username:process.env.DB_USER,
      password:process.env.DB_PASS,
      database:process.env.DB_NAME,
      autoLoadEntities:true,
      synchronize:true,
    }),
    UserModule,
    AuthModule,
    TestModule,
  ],
  controllers: [BuyController],
  providers: [AppService2]
})
export class AppModule {}
