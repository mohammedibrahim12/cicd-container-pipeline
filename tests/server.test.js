const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const server = require('../src/server');

test('Microservice Test Suite', async (t) => {
  await new Promise((resolve) => server.listen(3001, resolve));

  await t.test('GET /health returns 200 and status UP', async () => {
    const res = await fetch('http://localhost:3001/health');
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'UP');
    assert.ok(typeof data.uptimeSeconds === 'number');
  });

  await t.test('GET /metrics returns 200 and memory details', async () => {
    const res = await fetch('http://localhost:3001/metrics');
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.memoryUsage);
    assert.strictEqual(data.nodeVersion, process.version);
  });

  await t.test('GET /unknown returns 404', async () => {
    const res = await fetch('http://localhost:3001/unknown');
    assert.strictEqual(res.status, 404);
  });

  await new Promise((resolve) => server.close(resolve));
});
