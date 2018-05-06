import * as express from 'express';
const router = express.Router();
const config = require('../config')
let db = require('../database/db.service');
const authentication = require('../authentication');



router.post('/maintenance', (req: any, res: any) => {
//req.isAuthenticated()
	if(true) {
		db.getConnection((err: any, connection: any) => {
					if (err) {
						console.error('error', err);
						connection.release();
						return res.status(500).send(err);
					} else {
						connection.query('SELECT * FROM '+config.db_tables.RENTAL_MAINTENANCE+' WHERE username = ? AND type= ? AND location= ?', [req.body.id, req.body.type, req.body.location], (err: any, rows: any) => {
							if (err) {
								console.error('error', err);
								connection.release();
								return res.status(500).send(err);
							}

							if (rows.length > 0) {
							//update db with the repeated value
							let updateMysql = {
									username: req.body.id,
									type: req.body.type, // use the generateHash function in our 
									location: req.body.location,
									description: req.body.description || 'default desc',
									cost: config.maintenance_cost[req.body.type+"_"+req.body.location] || 100
								};
							let updateQuery = 'UPDATE  '+config.db_tables.RENTAL_MAINTENANCE+' set repeated= true';
							connection.query(updateQuery, [],(err: any, rows: any)=>{

								//connection.release();
								if(err){
									connection.release();
									return res.status(500).send(err);
								}
								let selectQuery = 'SELECT * from '+config.db_tables.RENTAL_MAINTENANCE+ ' WHERE username = ? AND type= ? AND location= ?'; 
								connection.query(selectQuery,[req.body.id, req.body.type, req.body.location],(err: any, rows: any)=>{
									if(err){
									connection.release();
									return res.status(500).send(err);
									}
									connection.release();
									return res.status(200).send(rows);
								});
							}); 
								
							} else {
								// if there is no user with that username, create the user
								let newUserMysql = {
									username: req.body.id,
									type: req.body.type, // use the generateHash function in our 
									location: req.body.location,
									description: req.body.description || 'default desc',
									cost: config.maintenance_cost[req.body.type+"_"+req.body.location] || 100
								};

								let insertQuery = 'INSERT INTO '+config.db_tables.RENTAL_MAINTENANCE+' (username, type, location, repeated, description, cost ) values (?,?,?,?,?,?)'; 

								connection.query(insertQuery, [newUserMysql.username, newUserMysql.type, newUserMysql.location, false, newUserMysql.description, newUserMysql.cost ], (err: any, rows: any) => {
									
									if (err) {
										connection.release();
										console.error('error', err);
										return res.status(500).send(err);
									}

									let selectQuery = 'SELECT * from '+config.db_tables.RENTAL_MAINTENANCE+' where type='+newUserMysql.type+' && location='+newUserMysql.location+' && username='+newUserMysql.username; 
									connection.query(selectQuery,[],(err: any, rows: any)=>{
									if(err){
										connection.release();
										return res.status(500).send(err);
									}
									connection.release();
									return res.status(200).send(rows);
									});

									return res.status(200).send(newUserMysql);
								});
							}
						});
					}
				});
	}
	//res.status(200).json();
});

export = router;
