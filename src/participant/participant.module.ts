import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Participant } from './entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Player, Tournament, Participant])],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
