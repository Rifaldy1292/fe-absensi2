import { Controller, Get, Param } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  findAll() {
    return this.attendanceService.findAll(); // ✅ Ini betul
  }

  @Get('daily')
  findDaily() {
    return this.attendanceService.findDaily();
  }

  @Get('weekly')
  findWeekly() {
    return this.attendanceService.findWeekly();
  }

  @Get('monthly')
  findMonthly() {
    return this.attendanceService.findMonthly();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.attendanceService.findOne(id);
  }
}
