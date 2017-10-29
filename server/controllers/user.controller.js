import User from '../models/user.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    User.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

function get(req, res) {
    return res.json(req.user);
}

function create(req, res, next) {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        points: req.body.points,
        is_admin: req.body.is_admin
    });

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

function update(req, res, next) {
    const user = req.user;
    user.name = req.body.name;
    user.email = req.body.email;
    user.points = req.body.points;
    user.is_admin = req.body.is_admin;

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

function remove(req, res, next) {
    const user = req.user;
    user.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
}

export default { load, get, create, update, list, remove };