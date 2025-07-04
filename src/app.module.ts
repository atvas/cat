import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [PrismaModule.forRoot({
    isGlobal: true
  }), UserModule, AuthModule, TransactionModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
