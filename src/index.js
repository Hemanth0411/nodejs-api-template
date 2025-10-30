const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Swagger Configuration ---
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API Template',
      version: '1.0.0',
      description: 'A production-ready REST API template for Node.js.',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
  },
  // Path to the API docs
  apis: ['./src/index.js'], // This can be changed to look for route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// --- End Swagger Configuration ---

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a welcome message.
 *     description: This is the root endpoint of the API which returns a simple greeting.
 *     responses:
 *       200:
 *         description: A successful response.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello, World!
 */
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});