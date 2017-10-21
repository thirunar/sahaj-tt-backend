import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

describe('## Tournament APIs', () => {
    let tournament = {
        tournamentId: 1,
        name: 'Singles Wimbleton'
    };

    describe('# POST /api/tournaments', () => {
        it('should create a new tournaments', (done) => {
            request(app)
                .post('/api/tournaments')
                .send(tournament)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.name).to.equal(tournament.name);
                    tournament = res.body;
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/tournaments/:tournamentId', () => {
        it('should get tournament details', (done) => {
            request(app)
                .get(`/api/tournaments/${tournament._id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.name).to.equal(tournament.name);
                    done();
                })
                .catch(done);
        });

        it('should report error with message - Not found, when tournamemt does not exists', (done) => {
            request(app)
                .get('/api/tournaments/56c787ccc67fc16ccc1a5e92')
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.message).to.equal('Not Found');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /api/tournaments/:tournamentId', () => {
        it('should update tournament details', (done) => {
            tournament.name = 'KK';
            request(app)
                .put(`/api/tournaments/${tournament._id}`)
                .send(tournament)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.name).to.equal(tournament.name);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/tournaments/', () => {
        it('should get all tournamemts', (done) => {
            request(app)
                .get('/api/tournaments')
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });

        it('should get all tournamemts (with limit and skip)', (done) => {
            request(app)
                .get('/api/tournaments')
                .query({ limit: 10, skip: 1 })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /api/tournaments/', () => {
        it('should delete tournamemts', (done) => {
            request(app)
                .delete(`/api/tournaments/${tournament._id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.name).to.equal(tournament.name);
                    done();
                })
                .catch(done);
        });
    });
});