import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from 'src/participant/entities/participant.entity';

@Injectable()
export class ResultsService {

  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    @InjectRepository(Participant)
    private participantnRepository: Repository<Participant>,
    
  ) {}
  async create(createResultDto: CreateResultDto) {
    const {participantId, points} = createResultDto

    const participants  = await this.participantnRepository.findOne({where: {id: participantId}})
    if (!participants ){
      throw new NotFoundException('Participant not found');
    }
    const result = this.resultRepository.create({
      ...createResultDto,
      participants,
      
    })
    
    return await this.resultRepository.save(result)
   
  }

  async findAll() {
    return await this.resultRepository
    .createQueryBuilder('results')
    .leftJoinAndSelect('results.participants', 'participants')
    .leftJoinAndSelect('participants.tournament', 'tournaments')
    .leftJoinAndSelect('participants.player', 'players')
    .getMany();
  }

  async findOne(id: number) {
    const results =  await this.resultRepository
   .createQueryBuilder('results')
   .leftJoinAndSelect('results.participants', 'participants')
    .leftJoinAndSelect('participants.tournament', 'tournaments')
    .leftJoinAndSelect('participants.player', 'players')
    .where('results.id = :id', { id })
    .getOne();
    if (!results) {
      throw new NotFoundException(`results with ID ${id} not found`);
    }
    return results
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    const {participantId, points} = updateResultDto
    const ExistingIdResult = await this.resultRepository.findOneBy({id})
    if (!ExistingIdResult) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    const participant = await this.participantnRepository.findOne({where:{id: participantId}});
    if (!participant) {
      throw new NotFoundException(`Tournament with ID ${participantId} not found`);
    }
    ExistingIdResult.participants = participant; 
    ExistingIdResult.points = points;

    return await this.resultRepository.save(ExistingIdResult);
  }

  async remove(id: number) {
    const resultRemove = await this.resultRepository
    .createQueryBuilder('results')
   .leftJoinAndSelect('results.participants', 'participants')
    .leftJoinAndSelect('participants.tournament', 'tournaments')
    .leftJoinAndSelect('participants.player', 'players')
    .where('results.id = :id', { id })
    .getOne();
    if (!resultRemove) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    await this.resultRepository.softDelete({id})
    return resultRemove;
  }
}
