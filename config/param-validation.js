import Joi from 'joi';

export default {
    // POST /api/users
    createUser: {
        body: {
            name: Joi.string().required(),
            email: Joi.string().required()
        }
    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            name: Joi.string().required(),
            email: Joi.string().required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    }

};