import { Injectable } from '@nestjs/common';
import { PrismaService } from '@signalement/prisma-client';
import { AuthorCreateDto, AuthorDto, AuthorUpdateDto } from './author.dto';

@Injectable()
export class AuthorDataAccessService {
  constructor(private prismaService: PrismaService) {}

  findById(id: string): Promise<AuthorDto | null> {
    return this.prismaService.author.findUnique({ where: { id } });
  }

  findAll(): Promise<AuthorDto[]> {
    return this.prismaService.author.findMany();
  }

  create(data: AuthorCreateDto): Promise<AuthorDto> {
    return this.prismaService.author.create({ data });
  }

  update(id: string, data: AuthorUpdateDto): Promise<AuthorDto> {
    return this.prismaService.author.update({ where: { id }, data });
  }

  delete(id: string): Promise<Pick<AuthorDto, 'id'>> {
    return this.prismaService.author.delete({
      where: { id },
      select: { id: true },
    });
  }
}
