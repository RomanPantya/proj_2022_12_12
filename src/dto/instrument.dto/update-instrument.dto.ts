import { PickType } from '@nestjs/mapped-types';
import { FullInstrumentDto } from './full-instrument.dto';

export class UpdateInstrumentDto extends PickType(FullInstrumentDto, ['learn']) {}
