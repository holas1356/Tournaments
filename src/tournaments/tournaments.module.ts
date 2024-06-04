import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Result } from 'src/results/entities/result.entity';
import { Participant } from 'src/participant/entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Result, Participant])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
