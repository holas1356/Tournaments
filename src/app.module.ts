import { Module } from '@nestjs/common';

import { TournamentsModule } from './tournaments/tournaments.module';
import { PlayersModule } from './players/players.module';
import { ResultsModule } from './results/results.module';
import { ConfigModule } from '@nestjs/config';
import { ParticipantsModule } from './participants/participants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participants/entities/participant.entity';
import { Player } from './players/entities/player.entity';
import { Result } from './results/entities/result.entity';
import { Tournament } from './tournaments/entities/tournament.entity';
import { RewardsModule } from './rewards/rewards.module';
import { Reward } from './rewards/entities/reward.entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.DB_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    extra: {
      ssl: true,
    }
  }),
  TypeOrmModule.forFeature([Participant, Player, Result, Tournament, Reward]),
    TournamentsModule,
    PlayersModule,
    ResultsModule,
    ParticipantsModule,
    RewardsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
