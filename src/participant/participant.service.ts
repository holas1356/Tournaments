import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { Player } from 'src/players/entities/player.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private participantnRepository: Repository<Participant>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}
  async create(createParticipantDto: CreateParticipantDto) {
    const { tournamentId, playerId } = createParticipantDto;
    const tournament = await this.tournamentRepository.findOne({where:{id: tournamentId}});
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    const player = await this.playerRepository.findOne({where:{id: playerId}});
    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }
    const participant = this.participantnRepository.create({
      ...createParticipantDto,
      tournament,
      player
    })
  
    return await this.participantnRepository.save(participant)
  }
  

  async findAll() {
    return await this.participantnRepository
    .createQueryBuilder('participants')
      .leftJoinAndSelect('participants.tournament', 'tournament')
      .leftJoinAndSelect('participants.player', 'player')
      .getMany();;
  }

  async findOne(id: number) {
    const participants = await this.participantnRepository
    .createQueryBuilder('participants')
    .leftJoinAndSelect('participants.tournament', 'tournament')
    .leftJoinAndSelect('participants.player', 'player')
    .where('participants.id = :id', { id })
    .getOne();
    if (!participants) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
    return participants
  }
  

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    const { tournamentId, playerId } = updateParticipantDto;
    const ExistingParticipant = await this.participantnRepository.findOneBy({id})
    if (!ExistingParticipant) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
    const tournament = await this.tournamentRepository.findOne({where:{id: tournamentId}});
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }
    const player = await this.playerRepository.findOne({where:{id: playerId}});
    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }
    ExistingParticipant.tournament = tournament;
    ExistingParticipant.player = player;

    return await this.participantnRepository.save(ExistingParticipant);
  
  }

   

  async remove(id: number) {
    const participantRemove = await this.participantnRepository
    .createQueryBuilder('participants')
    .leftJoinAndSelect('participants.tournament', 'tournament')
    .leftJoinAndSelect('participants.player', 'player')
    .where('participants.id = :id', { id })
    .getOne();
    if (!participantRemove) {
      throw new NotFoundException(`Participant with ID ${id} not found`);
    }
    await this.participantnRepository.softDelete({id})
    return participantRemove;
  }
}
