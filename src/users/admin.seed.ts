import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Role } from 'src/common/enum/role.enum';
import { UserService } from './users.service';

@Injectable()
export class AdminSeedService implements OnModuleInit {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(private readonly usersService: UserService) {}

  async onModuleInit() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      this.logger.warn(
        'ADMIN_EMAIL и ADMIN_PASSWORD не заданы',
      );
      return;
    }

    if (await this.usersService.hasAdmin()) {
      return;
    }

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      return;
    }

    await this.usersService.create({
      email,
      password,
      role: Role.ADMIN,
    });

    this.logger.log(`Создан админ: ${email}`);
  }
}
