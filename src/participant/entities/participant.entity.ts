import { ApiProperty } from "@nestjs/swagger";
import { Match } from "src/match/entities/match.entity";
import { Player } from "src/players/entities/player.entity";
import { Result } from "src/results/entities/result.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Participant {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Tournament, tournament => tournament.participants)
    @JoinColumn({ name: 'tournamentId' }) 
    tournament: Tournament;
  
    @ManyToOne(() => Player, player => player.participants)
    @JoinColumn({ name: 'playerId' })
    player: Player;

    @OneToMany(() => Match, (matches) => matches.participant1)
    matchesAsParticipant1: Match[];
  
    @OneToMany(() => Match, (matches) => matches.participant2)
    matchesAsParticipant2: Match[];

    @OneToMany(() => Result, (results) => results.participants)
    results: Result[];

    @OneToMany(() => Match, (matches) => matches.winner)
    wins: Match[];

    @OneToMany(() => Match, (matches) => matches.loser)
    losses: Match[];

    @DeleteDateColumn()
    deletedAt: Date;
}
