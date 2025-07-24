-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_employee_id_fkey`;

-- DropForeignKey
ALTER TABLE `scanlog` DROP FOREIGN KEY `ScanLog_employee_id_fkey`;

-- DropIndex
DROP INDEX `Attendance_employee_id_fkey` ON `attendance`;

-- DropIndex
DROP INDEX `ScanLog_employee_id_fkey` ON `scanlog`;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScanLog` ADD CONSTRAINT `ScanLog_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
