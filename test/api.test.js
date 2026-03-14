const request = require('supertest');
const assert = require('assert');

const app = require('../index');

describe('API Endpoints', () => {
  it('GET / should return landing HTML', async () => {
    const res = await request(app).get('/');
    assert.strictEqual(res.status, 200);
    assert.ok(res.text.includes('<h1>Welcome to your Node landing page</h1>'));
  });

  it('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.body, { status: 'ok' });
  });

  it('GET /readiness should return status ready', async () => {
    const res = await request(app).get('/readiness');
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(res.body, { status: 'ready' });
  });

  it('GET /api-docs should return swagger html', async () => {
    const res = await request(app).get('/api-docs').redirects(1);
    assert.strictEqual(res.status, 200);
    assert.ok(res.text.includes('Swagger UI'));
  });
});
