import {
    PartialType, IntersectionType, PickType, OmitType,
} from '@nestjs/mapped-types';
import { FullInstrumentDto } from './full-instrument.dto';

export class UpdateInstrumentDto extends IntersectionType(
    PartialType(PickType(FullInstrumentDto, ['learn'])),
    OmitType(FullInstrumentDto, ['id', 'learn']),
) {}
