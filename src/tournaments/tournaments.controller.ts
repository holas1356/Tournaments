import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Post(":tournamentId/generate-matches")
generateRandomMatches(@Param("tournamentId") tournamentId: number){
    return this.tournamentsService.generateRandomMatches(tournamentId);
}

@Post("matches/result/:matchId")
  registerMatchResult(
    @Param("matchId") matchId: number,
    @Body() matchResult: { winnerId: number; loserId: number; winnerScore: number; loserScore: number },
  ) {
    return this.tournamentsService.registerMatchResult(matchId, matchResult.winnerId, matchResult.loserId, matchResult.winnerScore, matchResult.loserScore);
  }

  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id);
  }
}
