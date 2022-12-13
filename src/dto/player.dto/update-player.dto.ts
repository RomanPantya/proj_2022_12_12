import { PartialType, OmitType } from '@nestjs/mapped-types';
import { FullPlayerDto } from './full-player.dto';

export class UpdatePlayerDto extends PartialType(OmitType(FullPlayerDto, ['id', 'email'])) {}
