
import { Participant } from "src/participant/entities/participant.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
  id: number;


  @Column()
  points: number;

  @ManyToOne(() => Participant, participant => participant.results)
  @JoinColumn({ name: 'participantId' }) 
  participants: Participant;

  @DeleteDateColumn()
  deletedAt: Date;

}
