import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.listen(3383);
