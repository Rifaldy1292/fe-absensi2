import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ScanLogsModule } from './scan-logs/scan-logs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { WsModule } from './ws/ws.module';
@Module({
  imports: [
    PrismaModule,
    EmployeesModule,
    AttendanceModule,
    ScanLogsModule,
    UsersModule,
    AuthModule,
    // WsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
