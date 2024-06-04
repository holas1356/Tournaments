import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from 'src/participants/entities/participant.entity';
import { Player } from './entities/player.entity';
import { Result } from 'src/results/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participant, Player, Result])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
