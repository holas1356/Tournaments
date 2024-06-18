import { join } from "path";
import { Player } from "src/players/entities/player.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reward {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column({nullable: true})
    dateAssigned: Date | null;

    @ManyToOne(() => Player, Player => Player.rewards)
    @JoinColumn({name: "playerId"})
    player: Player;

    @DeleteDateColumn()
    deletedAt: Date;
}
