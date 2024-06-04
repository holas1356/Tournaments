
import { Match } from "src/match/entities/match.entity";
import { Participant } from "src/participant/entities/participant.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, (match) => match.result)
  match: Match;

 
  @Column({ nullable: true })
  points: number;

 
  @Column({ nullable: true })
  position: number;

 
  @Column({ nullable: true })
  isWinner: boolean;

  @ManyToOne(() => Participant, participant => participant.results)
  @JoinColumn({ name: 'participantId' }) 
  participants: Participant;

  @DeleteDateColumn()
  deletedAt: Date;

}
