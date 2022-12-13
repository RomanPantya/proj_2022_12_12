import { PoolClient } from 'pg';
import { CreateInstrumentDto } from '../../dto/instrument.dto/create-instrument.dto';

export async function createInstrument(
    connection: PoolClient,
    instrument: CreateInstrumentDto,
    // Omit<InstrumentEntity, 'id'>,
) {
    const { rows: [result] } = await connection.query(`
    insert into instruments(
        name,
        type,
        learn
    )
    values(
        $1,
        $2,
        $3
    )
    returning *
    `, [instrument.name, instrument.type, instrument.learn]);

    return result;
}

export async function getOneInstrument(
    connection: PoolClient,
    id: string,
) {
    const { rows: [result] } = await connection.query(`
    select *
    from instruments
    where id = $1
    `, [id]);

    return result;
}

export async function getAllInstruments(
    connection: PoolClient,
) {
    const { rows } = await connection.query(`
    select *
    from instruments
    `);

    return rows;
}

export async function removeInstrument(
    connection: PoolClient,
    id: string,
) {
    const { rows: [result] } = await connection.query(`
    delete from instruments
    where id = $1
    returning *
    `, [id]);

    return result;
}
