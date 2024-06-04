import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Result } from 'src/results/entities/result.entity';
import { Participant } from 'src/participant/entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Player, Result, Participant])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
