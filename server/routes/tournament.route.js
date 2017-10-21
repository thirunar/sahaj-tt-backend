import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import tournamentCtrl from '../controllers/tournament.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .get(tournamentCtrl.list)

.post(tournamentCtrl.create);

router.route('/:tournamentId')
    .get(tournamentCtrl.get)

.put(tournamentCtrl.update)

.delete(tournamentCtrl.remove);

router.param('tournamentId', tournamentCtrl.load);

export default router;