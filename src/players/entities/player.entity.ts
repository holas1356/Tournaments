import { Participant } from "src/participants/entities/participant.entity";
import { Result } from "src/results/entities/result.entity";
import { Reward } from "src/rewards/entities/reward.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @Column()
  nationality: string;

  @Column()
  age: number;
  
 @OneToMany(() => Participant, (participant) => participant.player)
 participants: Participant[];

 @OneToMany(() => Result, (result) => result.player)
  results: Result[];

  @OneToMany(()=> Reward, Reward => Reward.player)
   rewards: Reward[];
}
