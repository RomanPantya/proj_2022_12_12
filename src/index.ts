import { generateServer } from './app/generate-server';
import { connectToPg } from './common/connect-to-pg';
import { instrumentsController } from './app/instrument/instruments.controller';
import { playersController } from './app/player/players.controller';

async function main() {
    const app = generateServer();
    const connection = await connectToPg();

    app.use((req, _, next) => {
        req.db = connection;
        next();
    });

    app.use('/instruments', instrumentsController);
    app.use('/players', playersController);

    const port = 3000;
    app.listen(port, () => {
        console.info(`Server started on port: ${port}`);
    });
}

main();
