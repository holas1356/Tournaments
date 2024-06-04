
import { Participant } from "src/participant/entities/participant.entity";
import { Result } from "src/results/entities/result.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    startDate: Date;

    @Column()
    state: string;

    @OneToMany(() => Participant, (participants) => participants.tournament)
    participants: Participant[];


    @DeleteDateColumn()
    deletedAt: Date;
}
