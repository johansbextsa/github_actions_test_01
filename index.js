const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const openapiDocument = require('./openapi.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/readiness', (req, res) => {
  res.status(200).json({ status: 'ready' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`OpenAPI docs at http://localhost:${port}/api-docs`);
  });
}

module.exports = app;
