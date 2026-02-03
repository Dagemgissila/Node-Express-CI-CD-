const request = require('supertest');
const app = require('./index');

describe('Basic API Endpoints', () => {

  test('GET /health → should return status ok', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(typeof response.body.uptime).toBe('number');
  });

  test('GET /greet → should greet anonymous user', async () => {
    const response = await request(app).get('/greet');
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello Guest! Welcome to CI/CD practice.');
  });

  test('GET /greet?name=Dagem → should greet with name', async () => {
    const response = await request(app).get('/greet?name=Dagem');
    
    expect(response.body.message).toBe('Hello Dagem! Welcome to CI/CD practice.');
  });

  test('POST /add → 5 + 7 = 12', async () => {
    const response = await request(app)
      .post('/add')
      .send({ a: 5, b: 7 })
      .set('Accept', 'application/json');
      
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(12);
  });

  test('POST /add → invalid input → 400 error', async () => {
    const response = await request(app)
      .post('/add')
      .send({ a: "five", b: 3 });
      
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Both a and b must be numbers');
  });

});