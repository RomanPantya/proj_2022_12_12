import { PoolClient } from 'pg';
import { CreatePlayerDto } from '../../dto/player.dto/create-player.dto';

export async function createPlayer(
    connection: PoolClient,
    player: CreatePlayerDto,
    // Omit<PlayerEntity, 'id' | 'instrument_id'> & Partial<Pick<PlayerEntity, 'instrument_id'>>,
) {
    const entries = Object.entries(player);
    const dollars:string[] = [];
    const { rows: [result] } = await connection.query(`
    insert into players(
      ${entries.map(([k], i) => {
        dollars.push(`$${i + 1}`);
        return k;
    }).join(', ')}
    )
    values(
      ${dollars.join(', ')}
    )
    returning *
    `, entries.map(([, v]) => v));

    //   const { rows: [result] } = await connection.query(`
    //   insert into players(
    //     name,
    //     email,
    //     ${player.instrument_id
    //       ? 'ganre, instrument_id'
    //       : 'ganre'}
    //   )
    //   values(
    //     $1,
    //     $2,
    //     ${player.instrument_id
    //       ? '$3, $4'
    //       : '$3'}
    //  )
    //   returning *
    //   `, Object.entries(player).map(([, v]) => v));
    return result;
}

export async function getPlayer(
    connection: PoolClient,
    id: string,
) {
    const { rows: [result] } = await connection.query(`
    select * 
    from players
    where id = $1
    `, [id]);

    return result;
}

export async function getAllPlayers(
    connection: PoolClient,
) {
    const { rows } = await connection.query(`
    select * 
    from players
    `);

    return rows;
}

export async function removePlayer(
    connection: PoolClient,
    id: string,
) {
    const { rows: [result] } = await connection.query(`
    delete from players
    where id = $1
    returning *
    `, [id]);

    return result;
}
