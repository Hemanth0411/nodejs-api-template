const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const loggingMiddleware = require('./middleware/logging');
const env = require('./config/env');
const routes = require('./routes');

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  }),
);

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 429, message: 'Too many requests' },
});
app.use(limiter);
app.use(loggingMiddleware);
app.use(express.json());

app.use('/api', routes);

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: { title: 'Node.js API Template', version: '1.0.0' },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api/v1`,
        description: 'V1 Development server',
      },
    ],
  },
  apis: ['./src/docs/*.yaml'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
