
import { Participant } from "src/participants/entities/participant.entity";
import { Result } from "src/results/entities/result.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    startDate: Date | null;

    @Column({nullable: true})
    endDate: Date | null;
    
    @Column()
    state: string;

   @OneToMany(() => Participant, (participant) => participant.tournament)
    participants: Participant[]; 

    @OneToMany(() => Result, (result) => result.tournament)
  results: Result[]; 



}
