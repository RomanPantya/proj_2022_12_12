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
