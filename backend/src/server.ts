import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';

import routes from '../routes/routes';

const app = express();
const port = 5000;

app.use(express.json());

// Using swagger page - use http://localhost:5000/api-docs for testing backend
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes found here via express router
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
