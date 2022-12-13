import { generateServer } from './app/generate-server';
import { connectToPg } from './common/connect-to-pg';
import { instrumentsController } from './app/instruments/instruments.controller';

async function main() {
    const app = generateServer();
    const connection = await connectToPg();

    app.use((req, _, next) => {
        req.db = connection;
        next();
    });

    app.use('/instruments', instrumentsController);

    const port = 3000;
    app.listen(port, () => {
        console.info(`Server started on port: ${port}`);
    });
}

main();
