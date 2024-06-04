import { ApiProperty } from "@nestjs/swagger";
import { Participant } from "src/participant/entities/participant.entity";

import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

 /*  @ManyToOne(() => Participant, (participant) => participant.matches)
  participant1: Participant;

  @ManyToOne(() => Participant, (participant) => participant.matches)
  participant2: Participant;

  @ManyToOne(() => Participant, (participant) => participant.wins)
  winner: Participant;

  @ManyToOne(() => Participant, (participant) => participant.losses)
  loser: Participant; */

  @ApiProperty()
  @Column({ nullable: true })
  scoreWinner: number;

  @ApiProperty()
  @Column({ nullable: true })
  scoreLoser: number;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  matchDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
