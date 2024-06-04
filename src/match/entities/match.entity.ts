import { ApiProperty } from "@nestjs/swagger";
import { Participant } from "src/participant/entities/participant.entity";
import { Result } from "src/results/entities/result.entity";

import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tournamentId: number;

  @Column({ nullable: true })
  winnerId: number;

  @ManyToOne(() => Participant, (participant) => participant.matchesAsParticipant1)
  participant1: Participant;

  @ManyToOne(() => Participant, (participant) => participant.matchesAsParticipant2)
  participant2: Participant;

  @OneToOne(() => Result, (result) => result.match, { cascade: true })
  @JoinColumn()
  result: Result;

  @ManyToOne(() => Participant, (participant) => participant.wins)
  winner: Participant;

  @ManyToOne(() => Participant, (participant) => participant.losses)
  loser: Participant;

  @Column({ nullable: true })
  loserId: number;

  @ApiProperty()
  @Column({ nullable: true })
  winnerScore: number;

  @ApiProperty()
  @Column({ nullable: true })
  loserScore: number;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  matchDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
