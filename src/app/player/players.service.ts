/* eslint-disable camelcase */
import { PoolClient } from 'pg';
import { CreatePlayerDto } from '../../dto/player.dto/create-player.dto';
import { UpdatePlayerDto } from '../../dto/player.dto/update-player.dto';

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

export async function updatePlayer(
    connection: PoolClient,
    id: string,
    realyData: UpdatePlayerDto,
    // Partial<Omit<PlayerEntity, 'id' | 'email'>>

) {
    const entries = Object.entries(realyData);
    entries.push(['id', id]);

    const { rows: [result] } = await connection.query(`
    update players
    set
    ${entries.slice(0, -1).map(([k], i) => {
        const dollar = `$${i + 1}`;
        return `${k} = ${dollar}`;
    }).join(', ')}
    where id = $${entries.length}
    returning *
    `, entries.map(([, v]) => v));

    // const { rows: [result1] } = await connection.query(`
    // select name, ganre, instrument_id
    // from players
    // where id = $1
    // `, [id]);

    // const { name: n, ganre: g, instrument_id: inId } = result1;
    // const { name = n, ganre = g, instrument_id = inId } = changeData;

    // const { rows: [result] } = await connection.query(`
    // update players
    // set
    // name = $1,
    // ganre = $2,
    // instrument_id = $3
    // where id = $4
    // returning *
    // `, [name, ganre, instrument_id, id]);

    return result;
}

export async function allPlayersWithInstruments(
    connection: PoolClient,
    limit: any,
    skip: any,
) {
    const { rows } = await connection.query(`
    select *
    from players
    where instrument_id is not null
    limit $1
    offset $2
    `, [limit, skip]);

    return rows;
}

export async function allPlayersWithoutInstruments(
    connection: PoolClient,
) {
    const { rows } = await connection.query(`
    select *
    from players
    where instrument_id is null
    `);

    return rows;
}
