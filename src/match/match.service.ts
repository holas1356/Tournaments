import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from 'src/participant/entities/participant.entity';

@Injectable()
export class MatchService {
  
  constructor(
    @InjectRepository(Match) private readonly matchRepository: Repository<Match>,
    @InjectRepository(Participant) private readonly participantRepository: Repository<Participant>,
  ){}
  async createMatch(createMatchDto: CreateMatchDto){
    const { tournamentId, participant1Id, participant2Id } = createMatchDto;
    const match = new Match();
    match.tournamentId = tournamentId;

    const participant1 = await this.participantRepository.findOne({where: {id: participant1Id}});
    const participant2 = await this.participantRepository.findOne({
      where: { id: participant2Id },
    });
{}
    match.participant1 = participant1;
    match.participant2 = participant2;

    await this.matchRepository.save(match);
    return match;
  }

  async findAll() {
    await this.matchRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
