import { OmitType } from '@nestjs/mapped-types';
import { FullPlayerDto } from './full-player.dto';

export class CreatePlayerDto extends OmitType(FullPlayerDto, ['id']) {}
