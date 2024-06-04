import { ApiProperty } from "@nestjs/swagger";
import { Participant } from "src/participant/entities/participant.entity";
import { Result } from "src/results/entities/result.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email:string

  @ApiProperty()
  @Column()
  alias: string;

  @ApiProperty()
  @Column()
  nationality: string;

  @ApiProperty()
  @Column()
  age: number;

  @OneToMany(() => Participant, (participants) => participants.player)
  participants: Participant[];

  @DeleteDateColumn()
    deletedAt: Date;
}
