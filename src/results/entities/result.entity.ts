import { Player } from "src/players/entities/player.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.results)
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.results)
  player: Player;

  @Column()
  position: number;

  @Column()
  points: number;

}
