import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepository: Repository<Reward>,

  ) { }

  async create(CreateRewardDto: CreateRewardDto): Promise<Reward> {
    return this.rewardRepository.save(CreateRewardDto);
  }

    
  async findAll(page: number = 1, limit: number = +process.env.LIMIT): Promise<Reward[]> {
    const skip = (page - 1) * limit;
    return this.rewardRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.rewardRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async update(id: number, UpdateRewardDto: UpdateRewardDto): Promise<Reward> {
    const result = await this.rewardRepository.update(id, UpdateRewardDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }

    const dataUpdated = this.rewardRepository.findOneBy({ id })
    return dataUpdated
  }

  async remove(id: number) {
    const autor = await this.rewardRepository.findOne({ where: { id } });
    if (!autor) {
      throw new NotFoundException('Author not found');
    }

    await this.rewardRepository.softRemove(autor);

   /*  await this.playerRepository.update({ tournament: { id } }, { deletedAt: new Date() }); */

  }
}
