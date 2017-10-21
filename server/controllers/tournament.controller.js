import Tournament from '../models/tournament.model';

/**
 * Load tournament and append to req.
 */
function load(req, res, next, id) {
    Tournament.get(id)
        .then((tournament) => {
            req.tournament = tournament;
            return next();
        })
        .catch(e => next(e));
}

function get(req, res) {
    return res.json(req.tournament);
}

function create(req, res, next) {
    const tournament = new Tournament({
        tournamentId: req.body.tournamentId,
        name: req.body.name
    });
    console.log("New tournament: " + res.json(tournament));
    tournament.save()
        .then(savedTournament => res.json(savedTournament))
        .catch(e => next(e));
}

function update(req, res, next) {
    const tournament = req.tournament;
    tournament.name = req.body.name;

    tournament.save()
        .then(savedTournament => res.json(savedTournament))
        .catch(e => next(e));
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Tournament.list({ limit, skip })
        .then(tournaments => res.json(tournaments))
        .catch(e => next(e));
}

function remove(req, res, next) {
    const tournament = req.tournament;
    tournament.remove()
        .then(deletedTournament => res.json(deletedTournament))
        .catch(e => next(e));
}

export default { load, get, create, update, list, remove };