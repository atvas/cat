import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';

@Module({
  imports:[AuthModule],
  providers: [GroupsService,UserService],
  controllers: [GroupsController]
})
export class GroupsModule {}
