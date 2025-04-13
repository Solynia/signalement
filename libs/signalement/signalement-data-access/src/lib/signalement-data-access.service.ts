import { Injectable } from '@nestjs/common';
import { PrismaService } from '@signalement/prisma-client';
import {
  ObservationCreateDto,
  ObservationUpdateDto,
  SignalementCreateDto,
  SignalementDto,
  SignalementUpdateDto,
} from './signalement.dto';

@Injectable()
export class SignalementDataAccessService {
  constructor(private prismaService: PrismaService) {}

  findById(id: string): Promise<SignalementDto | null> {
    return this.prismaService.signalement.findUnique({
      where: { id },
      include: { author: true, observations: true },
    });
  }

  findAll(): Promise<SignalementDto[]> {
    return this.prismaService.signalement.findMany({
      include: { author: true, observations: true },
    });
  }

  create({
    author,
    observations,
    ...data
  }: SignalementCreateDto): Promise<SignalementDto> {
    return this.prismaService.signalement.create({
      data: {
        ...data,
        author: {
          connectOrCreate: {
            where: { id: author.email },
            create: author,
          },
        },
        observations: { createMany: { data: observations } },
      },
      include: { author: true, observations: true },
    });
  }

  update(
    id: string,
    { author, observations, ...data }: SignalementUpdateDto
  ): Promise<SignalementDto> {
    const updatedObservations = observations.filter(
      (o): o is ObservationUpdateDto => 'id' in o
    );
    const newObservations = observations.filter(
      (o): o is ObservationCreateDto => !('id' in o)
    );

    return this.prismaService.signalement.update({
      where: { id },
      data: {
        ...data,
        author: author
          ? {
              upsert: {
                where: { email: author.email },
                create: author,
                update: {},
              },
            }
          : {},
        observations: {
          deleteMany: {
            signalementId: data.id,
            id: { notIn: updatedObservations.map((o) => o.id) },
          },
          createMany: { data: newObservations },
          updateMany: updatedObservations.map((o) => ({
            data: { name: o.name },
            where: { id: o.id },
          })),
        },
      },
      include: { author: true, observations: true },
    });
  }

  delete(id: string): Promise<Pick<SignalementDto, 'id'>> {
    return this.prismaService.signalement.delete({
      where: { id },
      select: { id: true },
    });
  }
}
