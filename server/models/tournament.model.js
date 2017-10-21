import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import uuid from 'node-uuid';
import APIError from '../helpers/APIError';

const TournamentSchema = new mongoose.Schema({
    tournamentId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

TournamentSchema.method({});

TournamentSchema.statics = {
    get(id) {
        return this.findById(id)
            .exec()
            .then((tournament) => {
                if (tournament) {
                    return tournament;
                }
                const err = new APIError('No such tournament exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

export default mongoose.model('Tournament', TournamentSchema);