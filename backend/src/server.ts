import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import swaggerSpec from '../swagger';
import routes from './routes/routes';

const app = express();
const PORT = 5000;

// preventing cors error between front and backend for sake of testing
app.use(cors());

// automatically parsing json files
app.use(express.json());

// Using swagger page - use http://localhost:5000/api-docs for testing backend
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes found here via express router
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
