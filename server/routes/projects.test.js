import request from 'supertest';
import mockFs from 'mock-fs';
import fs from 'fs';
import path from 'path';
import { app } from '../app.js';

beforeEach(() => {
    mockFs({
        'node_modules': mockFs.load(path.resolve('node_modules')),
        'configs': {
            'Test1': {
                'config.json': '[{ "id": "1234" }, { "id": "4567" }]'
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

describe('GET /api/projects', () => {

    it('should return 200', (done) => {
        request(app)
            .get('/api/projects')
            .expect(200)
            .end(done);
    });

    it('should have Content-Type application/json', (done) => {
        request(app)
            .get('/api/projects')
            .expect('Content-Type', /json/)
            .end(done);
    });

    it('should return list of projects', (done) => {
        request(app)
            .get('/api/projects')
            .expect(200, [
                'Test1',
                'Test2',
                'Test3'
            ])
            .end(done);
    });
});

describe('GET /api/projects/:project', () => {

    it('should return 200', (done) => {
        request(app)
            .get('/api/projects/Test1')
            .expect(200)
            .end(done);
    });

    it('should have Content-Type application/json', (done) => {
        request(app)
            .get('/api/projects/Test1')
            .expect('Content-Type', /json/)
            .end(done);
    });

    it('should return project name and config', (done) => {
        request(app)
            .get('/api/projects/Test1')
            .expect(200, {
                project: 'Test1',
                config: [
                    { id: '1234' },
                    { id: '4567' }
                ]
            })
            .end(done);
    });

    it('should return 404 when project doesn\'t exist', (done) => {
        request(app)
            .get('/api/projects/Test4')
            .expect(404)
            .end(done);
    });
});

describe('POST /api/projects', () => {

    it('should return 200', (done) => {
        request(app)
            .post('/api/projects')
            .send({
                project: 'Test4'
            })
            .expect(200)
            .end(done);
    });

    it('should have Content-Type application/json', (done) => {
        request(app)
            .post('/api/projects')
            .send({
                project: 'Test4'
            })
            .expect('Content-Type', /json/)
            .end(done);
    });

    it('should create directory for the project', (done) => {
        request(app)
            .post('/api/projects')
            .send({
                project: 'Test4'
            })
            .expect(() => {
                if (!fs.existsSync('./configs/Test4')) {
                    throw new Error('File was not created');
                }
            })
            .end(done);
    });

    it('should return project and empty config', (done) => {
        request(app)
            .post('/api/projects')
            .send({
                project: 'Test4'
            })
            .expect(200, {
                project: 'Test4',
                config: []
            })
            .end(done);
    });

    it('should return 400 when "project" is missing from body', (done) => {
        request(app)
            .post('/api/projects')
            .send({})
            .expect(400)
            .end(done);
    });
});

describe('PUT /api/projects/:project', () => {

    it('should return 200', (done) => {
        request(app)
            .put('/api/projects/Test1')
            .send({
                config: []
            })
            .expect(200)
            .end(done);
    });

    it('should have Content-Type application/json', (done) => {
        request(app)
            .put('/api/projects/Test1')
            .send({
                config: []
            })
            .expect('Content-Type', /json/)
            .end(done);
    });

    it('should write config to file', (done) => {
        request(app)
            .put('/api/projects/Test1')
            .send({
                config: []
            })
            .expect(() => {
                const content = fs.readFileSync('./configs/Test1/config.json');
                if (String(content) !== '[]') {
                    throw new Error('Config was not written');
                }
            })
            .end(done);
    });

    it('should return 400 when "config" is missing from body', (done) => {
        request(app)
            .put('/api/projects/Test1')
            .send({})
            .expect(400)
            .end(done);
    });
});

describe('DELETE /api/projects/:project', () => {

    it('should return 200', (done) => {
        request(app)
            .delete('/api/projects/Test1')
            .expect(200)
            .end(done);
    });

    it('should remove directory', (done) => {
        request(app)
            .delete('/api/projects/Test1')
            .expect(() => {
                if (fs.existsSync('./configs/Test1')) {
                    throw new Error('File was not deleted');
                }
            })
            .end(done);
    });
});

describe('POST /api/projects/change', () => {

    it('should return 200', (done) => {
        request(app)
            .post('/api/projects/change')
            .send({
                project: 'Test1'
            })
            .expect(200)
            .end(done);
    });

    it('should have Content-Type application/json', (done) => {
        request(app)
            .post('/api/projects/change')
            .send({
                project: 'Test1'
            })
            .expect('Content-Type', /json/)
            .end(done);
    });

    it('should return project and config', (done) => {
        request(app)
            .post('/api/projects/change')
            .send({
                project: 'Test1'
            })
            .expect(200, {
                project: 'Test1',
                config: [
                    { id: '1234' },
                    { id: '4567' }
                ]
            })
            .end(done);
    });

    it('should return 404 when project doesn\'t exist', (done) => {
        request(app)
            .post('/api/projects/change')
            .send({
                project: 'Test4'
            })
            .expect(404)
            .end(done);
    });

    it('should return 400 when "project" is missing from body', (done) => {
        request(app)
            .post('/api/projects/change')
            .send({})
            .expect(400)
            .end(done);
    });
});
