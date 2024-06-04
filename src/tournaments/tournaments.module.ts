import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { Player } from 'src/players/entities/player.entity';
import { Result } from 'src/results/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Participant, Result])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
