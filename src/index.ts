import 'reflect-metadata'
import bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './inversify.config'
import * as env from "dotenv"
import Database from './config/Database'
import ErrorHandler from './Middleware/ErrorHandler';
env.config();

let server = new InversifyExpressServer(container);

server.setConfig((app)=>{
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
});

let app = server.build();
app.use(ErrorHandler)

const MONGO_URI = process.env.mongoURL;
const PORT = process.env.PORT || 3000;

const db = new Database(MONGO_URI);
db.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
