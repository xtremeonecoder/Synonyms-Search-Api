/**
 * Synonyms Search Tool
 *
 * @category   Application_Backend
 * @package    synonym-search-backend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import request from 'supertest';

import server from '../../../index';

describe('POST /api/synonyms', () => {
  afterAll(async () => {
    // Send request to the endpoint
    await request(server).get('/api/synonyms/reset/memories');
    server.close();
  });

  it('should return 201 and add synonyms to a word', async () => {
    // Add new word and synonyms
    const response = await request(server)
      .post('/api/synonyms')
      .set('Accept', 'application/json')
      .send({ word: 'Nice', synonyms: ['Beautiful', 'Charming'] });

    // Assert response
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Synonyms added successfully!');
  });

  it('should return 400 for a bad request', async () => {
    // Send request to the endpoint
    const response = await request(server)
      .post('/api/synonyms')
      .set('Accept', 'application/json')
      .send({ word: 'example' });

    // Assert response
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"Synonyms" is required');
  });
});

describe('GET /api/synonyms/:word', () => {
  afterAll(async () => {
    // Send request to the endpoint
    await request(server).get('/api/synonyms/reset/memories');
    server.close();
  });

  it('should return 404 for a word that does not exist', async () => {
    // Send request to the endpoint
    const response = await request(server).get('/api/synonyms/Nice');

    // Assert response
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Word not found!');
  });

  it('should return 200 for a word that exists', async () => {
    // Add new word and synonyms
    await request(server)
      .post('/api/synonyms')
      .set('Accept', 'application/json')
      .send({ word: 'Nice', synonyms: ['Beautiful', 'Charming'] });

    // Fetch the word that is added
    const response = await request(server).get('/api/synonyms/Nice');

    // Assert response
    expect(response.status).toBe(200);
  });
});

describe('GET /api/synonyms/not/exist', () => {
  afterAll(async () => {
    // Send request to the endpoint
    await request(server).get('/api/synonyms/reset/memories');
    server.close();
  });

  it('should return 500 for unknown endpoint', async () => {
    // Send request to the endpoint
    const response = await request(server).get('/api/synonyms/not/exist');

    // Assert response
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Something went wrong!');
  });
});

describe('GET /api/synonyms/reset/memories', () => {
  afterAll(async () => {
    // Send request to the endpoint
    await request(server).get('/api/synonyms/reset/memories');
    server.close();
  });

  it('should return 200 for resetting memories', async () => {
    // Clear the in memories
    const response = await request(server).get('/api/synonyms/reset/memories');

    // Assert response
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Memory reset successfully!');
  });
});
