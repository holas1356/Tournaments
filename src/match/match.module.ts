import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Participant } from 'src/participant/entities/participant.entity';
import { Result } from 'src/results/entities/result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Match, Participant, Result])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
