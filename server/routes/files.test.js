import request from 'supertest';
import mockFs from 'mock-fs';
import fs from 'fs';
import path from 'path';
import { app } from '../app.js';

describe('/api/files', () => {

    beforeEach(() => {
        app.locals.project = 'Test1';
        mockFs({
            'node_modules': mockFs.load(path.resolve('node_modules')),
            'configs': {
                'Test1': {
                    'config.json': '[{ "id": "1234" }, { "id": "4567" }]',
                    'test.txt': 'test',
                    'test1.txt': 'test',
                },
                'Test2': {
                    'config.json': '[{ "id": "4444" }]'
                },
                'Test3': {
                    'config.json': '[{ "id": "1111" }, { "id": "2222" }]'
                },
            }
        });
    });

    afterEach(() => {
        mockFs.restore();
    });

    describe('GET /api/files', () => {

        it('should return 200', (done) => {
            request(app)
                .get('/api/files')
                .expect(200)
                .end(done);
        });

        it('should have Content-Type application/json', (done) => {
            request(app)
                .get('/api/files')
                .expect('Content-Type', /json/)
                .end(done);
        });

        it('should return list of files', (done) => {
            request(app)
                .get('/api/files')
                .expect(200, [
                    'config.json',
                    'test.txt',
                    'test1.txt'
                ])
                .end(done);
        });
    });

    describe('DELETE /api/files/:file', () => {

        it('should return 200', (done) => {
            request(app)
                .delete('/api/files/test.txt')
                .expect(200)
                .end(done);
        });

        it('should remove file', (done) => {
            request(app)
                .delete('/api/files/test.txt')
                .expect(() => {
                    if (fs.existsSync('./configs/Test1/test.txt')) {
                        throw new Error('File was not deleted');
                    }
                })
                .end(done);
        });

        it('should return 404 when file is not found', (done) => {
            request(app)
                .delete('/api/files/test2.txt')
                .expect(404)
                .end(done);
        });
    });
});
