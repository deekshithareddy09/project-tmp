import * as express from 'express';
const router = express.Router();
const config = require('../config')
let db = require('../database/db.service');
const authentication = require('../authentication');



router.post('/termination', (req: any, res: any) => {
//req.isAuthenticated()
	if(true) {
		db.getConnection((err: any, connection: any) => {
					if (err) {
						console.error('error', err);
						connection.release();
						return res.status(500).send(err);
					} else {
						connection.query('SELECT * FROM '+config.db_tables.RENTAL_LEASEDETAILS+' WHERE username = ? AND type= ? ', [req.body.id, req.body.type], (err: any, rows: any) => {
							if (err) {
								console.error('error', err);
								connection.release();
								return res.status(500).send(err);
							}
							return res.status(200).send(rows);
	//res.status(200).json();
			});
		}
	});

}
});

export = router;
