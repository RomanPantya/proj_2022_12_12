import { IInstument } from '../../entities/instrument/instrument.interface';

export class FullInstrumentDto implements IInstument {
    id!: number;

    name!: string;

    type!: string;

    learn!: number;
}
