import request from 'supertest';
import { app } from '../app.js';

describe('/api/fonts', () => {

    describe('GET /api/fonts', () => {

        it('should return 200', (done) => {
            request(app)
                .get('/api/fonts')
                .expect(200)
                .end(done);
        });

        it('should have Content-Type application/json', (done) => {
            request(app)
                .get('/api/fonts')
                .expect('Content-Type', /json/)
                .end(done);
        });
    });

});
