import { IPlayer } from '../../entities/player/player.interface';

export class FullPlayerDto implements IPlayer {
    id!: number;

    name!: string;

    email!: string;

    ganre!: string;

    instrument_id!: number;
}
