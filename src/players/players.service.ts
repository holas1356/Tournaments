import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {

  constructor(
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>
  ) { }
  async create(createPlayerDto: CreatePlayerDto) {
    const existingPlayer = await this.playerRepository.findOneBy({email: createPlayerDto.email});
    if (existingPlayer) {
      throw new BadRequestException(`Player with email ${createPlayerDto.email} already exists`);
    }
    const player = this.playerRepository.create(createPlayerDto);
    return await this.playerRepository.save(player);

  }

  async findAll() {
    return await this.playerRepository.find()
  }

  async findOne(id: number) {
    const player = await this.playerRepository.findOneBy({id})
    if (!player) {
      throw new NotFoundException(`Player with id ${id} does not exist`);
    }
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    const existingPlayer = this.playerRepository.findOneBy({id})
    if (!existingPlayer) {
      throw new NotFoundException(`Player with id ${id} does not exist`);
    }
    await this.playerRepository.update(id,updatePlayerDto)
    const updatePlayer = await this.playerRepository.findOneBy({id})
    if (!updatePlayer) {
      throw new NotFoundException('Could not find updated player');
    }
    return updatePlayer;
  }

  async remove(id: number) {
   const playerRemove = this.playerRepository.findOneBy({id})
   if (!playerRemove) {
     throw new NotFoundException(`Player with id ${id} does not exist`);
   }
   await this.playerRepository.softDelete({id})
   return playerRemove;

  }
}
