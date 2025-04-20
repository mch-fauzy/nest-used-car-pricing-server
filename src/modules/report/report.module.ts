import { Module } from '@nestjs/common';
import { ReportController } from './controllers/v1/report.controller';
import { ReportService } from './services/report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';

@Module({
  /* TypeOrmModule.forFeature to connect entity to its parent module for create a repository */
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
