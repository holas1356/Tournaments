import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/match/entities/match.entity';


@Injectable()
export class TournamentsService {

  constructor(
    @InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Match) private readonly matchRepository: Repository<Match>
  ) { }
  async create(createTournamentDto: CreateTournamentDto) {
    const existingTournament = await this.tournamentRepository.findOneBy({name: createTournamentDto.name})
    if (existingTournament) {
      throw new Error(`Tournament with name ${createTournamentDto.name} already exists`)
    }
    const tournament = this.tournamentRepository.create(createTournamentDto)
    return await this.tournamentRepository.save(tournament)
  }

  async generateRandomMatches(tournamentId: number){
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: ["participants"],
    });

    if (!tournament) {
      throw new Error("Tournament not found");
    }
    const participants = tournament.participants;

    if (participants.length % 2 !== 0) {
      throw new Error("Number of participants must be even");
    }
    const shuffledParticipants = participants.slice();
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledParticipants[i], shuffledParticipants[j]] = [
        shuffledParticipants[j],
        shuffledParticipants[i],
      ];
    }
    for (let round = 0; round < Math.log2(participants.length); round++) {
      const matches: Match[] = [];

      for (let i = 0; i < participants.length / 2; i++) {
        const participant1 = shuffledParticipants[i * 2];
        const participant2 = shuffledParticipants[i * 2 + 1];

        const match = new Match();
        match.participant1 = participant1;
        match.participant2 = participant2;
        match.tournamentId = tournamentId;

        matches.push(match);
      }

      const savedMatchIds = await this.matchRepository.save(matches);
      return savedMatchIds;
    }
   }

   async registerMatchResult(
    matchId: number,
    winnerId: number,
    loserId: number,
    winnerScore: number,
    loserScore: number,
  ){
    const match = await this.matchRepository.findOne({
      where: { id: matchId },
      relations: ["participant1", "participant2"],
    });

    if (!match) {
      throw new Error("Match not found");
    }

    const participants = [match.participant1, match.participant2];
    const winnerParticipant = participants.find((participant) => participant.id === winnerId);
    const loserParticipant = participants.find((participant) => participant.id === loserId);

    if (!winnerParticipant || !loserParticipant) {
      throw new Error("Invalid winner or loser ID");
    }
    match.winnerId = winnerId;
    match.loserId = loserId;
    match.winnerScore = winnerScore;
    match.loserScore = loserScore;

    await this.matchRepository.save(match);
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
