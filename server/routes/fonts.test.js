import request from 'supertest';
import { app } from '../app.js';
import SystemFonts from 'system-font-families';

describe('/api/fonts', () => {
    describe('GET /api/fonts', () => {
        it('should return 200', (done) => {
            request(app).get('/api/fonts').expect(200).end(done);
        });

        it('should have Content-Type application/json', (done) => {
            request(app).get('/api/fonts').expect('Content-Type', /json/).end(done);
        });

        it('should return list of fonts', (done) => {
            const systemFonts = new SystemFonts.default();
            const fontList = systemFonts.getFontsExtendedSync();
            request(app).get('/api/fonts').expect(200, fontList).end(done);
        });
    });

    describe('REST /api/fonts', () => {
        it('should return 405 if method is not supported', (done) => {
            request(app).patch('/api/fonts').expect(405).end(done);
        });
    });
});
