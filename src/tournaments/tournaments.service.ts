import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class TournamentsService {

  constructor(
    @InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>
  ) { }
  async create(createTournamentDto: CreateTournamentDto) {
    const existingTournament = await this.tournamentRepository.findOneBy({name: createTournamentDto.name})
    if (existingTournament) {
      throw new Error(`Tournament with name ${createTournamentDto.name} already exists`)
    }
    const tournament = this.tournamentRepository.create(createTournamentDto)
    return await this.tournamentRepository.save(tournament)
  }

  async findAll() {
    return await this.tournamentRepository.find()
  }

  async findOne(id: number) {
    const Tournament = await this.tournamentRepository.findOneBy({id})
    if (!Tournament) {
      throw new NotFoundException(`Tournament with id ${id} does not exist`)
    };
    return Tournament;
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    const existingTournament = await this.tournamentRepository.findOneBy({id})
    if (!existingTournament) {
      throw new NotFoundException(`Tournament with id ${id} does not exist`)
    }
    await this.tournamentRepository.update(id, updateTournamentDto)
    const updateTournament = await this.tournamentRepository.findOneBy({id})
    if (!updateTournament) {
      throw new NotFoundException(`Could not find updated author`)
    }
    return updateTournament
  }

  async remove(id: number) {
    const TournamentToRemove = await this.tournamentRepository.findOneBy({id})
    if (!TournamentToRemove) {
      throw new NotFoundException(`Tournament with id ${id} does not exist`)
    }
    await this.tournamentRepository.softRemove({id})
    return TournamentToRemove

  }
}
