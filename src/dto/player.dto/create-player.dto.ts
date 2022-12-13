import {
    OmitType, PartialType, PickType, IntersectionType,
} from '@nestjs/mapped-types';
import { FullPlayerDto } from './full-player.dto';

export class CreatePlayerDto extends IntersectionType(
    OmitType(FullPlayerDto, ['id', 'instrument_id']),
    PartialType(PickType(FullPlayerDto, ['instrument_id'])),
) {}
