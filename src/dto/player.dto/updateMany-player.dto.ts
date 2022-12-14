import { OmitType } from '@nestjs/mapped-types';
import { UpdatePlayerDto } from './update-player.dto';

export class UpdateManyPlayersDto extends OmitType(UpdatePlayerDto, ['name']) {}
