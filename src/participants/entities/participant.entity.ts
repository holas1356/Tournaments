import { Player } from "src/players/entities/player.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Tournament, (tournament) => tournament.participants)
    tournament: Tournament;
  
   @ManyToOne(() => Player, (player) => player.participants)
    player: Player; 
  
    @Column({nullable: true})
    registrationDate: Date | null;
}
