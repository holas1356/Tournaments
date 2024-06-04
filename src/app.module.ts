import { Module } from '@nestjs/common';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PlayersModule } from './players/players.module';
import { ResultsModule } from './results/results.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players/entities/player.entity';
import { Result } from './results/entities/result.entity';
import { Tournament } from './tournaments/entities/tournament.entity';
import { ParticipantModule } from './participant/participant.module';
import { Participant } from './participant/entities/participant.entity';


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
  TypeOrmModule.forFeature([ Player, Result, Tournament, Participant]),
    TournamentsModule,
    PlayersModule,
    ResultsModule,
    ParticipantModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule { }
