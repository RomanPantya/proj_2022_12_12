import { OmitType } from '@nestjs/mapped-types';
import { FullInstrumentDto } from './full-instrument.dto';

export class CreateInstrumentDto extends OmitType(FullInstrumentDto, ['id']) {}
