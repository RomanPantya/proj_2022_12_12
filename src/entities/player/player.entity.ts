import { IPlayer } from './player.interface';

export class PlayerEntity implements IPlayer {
    id!: number;

    name!: string;

    email!: string;

    ganre!: string;

    instrument_id!: number;
}
