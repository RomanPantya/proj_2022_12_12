import { IInstument } from './instrument.interface';

export class InstrumentEntity implements IInstument {
    id!: number;

    name!: string;

    type!: string;

    learn!: number;
}
