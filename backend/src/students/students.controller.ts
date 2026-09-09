import { Controller, Get } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll() {
    // Return mock data for now since DB is not connected
    return [
      { id: '1', name: 'Alice Smith', email: 'alice@example.com', skills: ['React', 'Node.js'] },
      { id: '2', name: 'Bob Jones', email: 'bob@example.com', skills: ['NestJS', 'PostgreSQL'] },
      { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', skills: ['Next.js', 'TypeScript'] },
    ];
  }
}
