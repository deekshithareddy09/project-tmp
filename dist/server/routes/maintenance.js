"use strict";
var express = require("express");
var router = express.Router();
var config = require('../config');
var db = require('../database/db.service');
var authentication = require('../authentication');
router.post('/maintenance', function (req, res) {
    //req.isAuthenticated()
    if (true) {
        db.getConnection(function (err, connection) {
            if (err) {
                console.error('error', err);
                connection.release();
                return res.status(500).send(err);
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.RENTAL_MAINTENANCE + ' WHERE username = ? AND type= ? AND location= ?', [req.body.id, req.body.type, req.body.location], function (err, rows) {
                    if (err) {
                        console.error('error', err);
                        connection.release();
                        return res.status(500).send(err);
                    }
                    if (rows.length > 0) {
                        //update db with the repeated value
                        var updateMysql = {
                            username: req.body.id,
                            type: req.body.type,
                            location: req.body.location,
                            description: req.body.description || 'default desc',
                            cost: config.maintenance_cost[req.body.type + "_" + req.body.location] || 100
                        };
                        var updateQuery = 'UPDATE  ' + config.db_tables.RENTAL_MAINTENANCE + ' set repeated= true';
                        connection.query(updateQuery, [], function (err, rows) {
                            //connection.release();
                            if (err) {
                                connection.release();
                                return res.status(500).send(err);
                            }
                            var selectQuery = 'SELECT * from ' + config.db_tables.RENTAL_MAINTENANCE + ' WHERE username = ? AND type= ? AND location= ?';
                            connection.query(selectQuery, [req.body.id, req.body.type, req.body.location], function (err, rows) {
                                if (err) {
                                    connection.release();
                                    return res.status(500).send(err);
                                }
                                connection.release();
                                return res.status(200).send(rows);
                            });
                        });
                    }
                    else {
                        // if there is no user with that username, create the user
                        var newUserMysql_1 = {
                            username: req.body.id,
                            type: req.body.type,
                            location: req.body.location,
                            description: req.body.description || 'default desc',
                            cost: config.maintenance_cost[req.body.type + "_" + req.body.location] || 100
                        };
                        var insertQuery = 'INSERT INTO ' + config.db_tables.RENTAL_MAINTENANCE + ' (username, type, location, repeated, description, cost ) values (?,?,?,?,?,?)';
                        connection.query(insertQuery, [newUserMysql_1.username, newUserMysql_1.type, newUserMysql_1.location, false, newUserMysql_1.description, newUserMysql_1.cost], function (err, rows) {
                            if (err) {
                                connection.release();
                                console.error('error', err);
                                return res.status(500).send(err);
                            }
                            var selectQuery = 'SELECT * from ' + config.db_tables.RENTAL_MAINTENANCE + ' where type=' + newUserMysql_1.type + ' && location=' + newUserMysql_1.location + ' && username=' + newUserMysql_1.username;
                            connection.query(selectQuery, [], function (err, rows) {
                                if (err) {
                                    connection.release();
                                    return res.status(500).send(err);
                                }
                                connection.release();
                                return res.status(200).send(rows);
                            });
                            return res.status(200).send(newUserMysql_1);
                        });
                    }
                });
            }
        });
    }
    //res.status(200).json();
});
module.exports = router;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDO2dDQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2xDLENBQUMsQ0FBQyxDQUFDOzRCQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFZLENBQUMsQ0FBQzt3QkFDM0MsQ0FBQyxDQUFDLENBQUM7b0JBQ0osQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDRCx5QkFBeUI7QUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFFSCxpQkFBUyxNQUFNLENBQUMiLCJmaWxlIjoicm91dGVzL21haW50ZW5hbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJylcclxubGV0IGRiID0gcmVxdWlyZSgnLi4vZGF0YWJhc2UvZGIuc2VydmljZScpO1xyXG5jb25zdCBhdXRoZW50aWNhdGlvbiA9IHJlcXVpcmUoJy4uL2F1dGhlbnRpY2F0aW9uJyk7XHJcblxyXG5cclxuXHJcbnJvdXRlci5wb3N0KCcvbWFpbnRlbmFuY2UnLCAocmVxOiBhbnksIHJlczogYW55KSA9PiB7XHJcbi8vcmVxLmlzQXV0aGVudGljYXRlZCgpXHJcblx0aWYodHJ1ZSkge1xyXG5cdFx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XHJcblx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gJytjb25maWcuZGJfdGFibGVzLlJFTlRBTF9NQUlOVEVOQU5DRSsnIFdIRVJFIHVzZXJuYW1lID0gPyBBTkQgdHlwZT0gPyBBTkQgbG9jYXRpb249ID8nLCBbcmVxLmJvZHkuaWQsIHJlcS5ib2R5LnR5cGUsIHJlcS5ib2R5LmxvY2F0aW9uXSwgKGVycjogYW55LCByb3dzOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKHJvd3MubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdC8vdXBkYXRlIGRiIHdpdGggdGhlIHJlcGVhdGVkIHZhbHVlXHJcblx0XHRcdFx0XHRcdFx0bGV0IHVwZGF0ZU15c3FsID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR1c2VybmFtZTogcmVxLmJvZHkuaWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IHJlcS5ib2R5LnR5cGUsIC8vIHVzZSB0aGUgZ2VuZXJhdGVIYXNoIGZ1bmN0aW9uIGluIG91ciBcclxuXHRcdFx0XHRcdFx0XHRcdFx0bG9jYXRpb246IHJlcS5ib2R5LmxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogcmVxLmJvZHkuZGVzY3JpcHRpb24gfHwgJ2RlZmF1bHQgZGVzYycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvc3Q6IGNvbmZpZy5tYWludGVuYW5jZV9jb3N0W3JlcS5ib2R5LnR5cGUrXCJfXCIrcmVxLmJvZHkubG9jYXRpb25dIHx8IDEwMFxyXG5cdFx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0XHRsZXQgdXBkYXRlUXVlcnkgPSAnVVBEQVRFICAnK2NvbmZpZy5kYl90YWJsZXMuUkVOVEFMX01BSU5URU5BTkNFKycgc2V0IHJlcGVhdGVkPSB0cnVlJztcclxuXHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHVwZGF0ZVF1ZXJ5LCBbXSwoZXJyOiBhbnksIHJvd3M6IGFueSk9PntcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvL2Nvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYoZXJyKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDUwMCkuc2VuZChlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdFF1ZXJ5ID0gJ1NFTEVDVCAqIGZyb20gJytjb25maWcuZGJfdGFibGVzLlJFTlRBTF9NQUlOVEVOQU5DRSsgJyBXSEVSRSB1c2VybmFtZSA9ID8gQU5EIHR5cGU9ID8gQU5EIGxvY2F0aW9uPSA/JzsgXHJcblx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHNlbGVjdFF1ZXJ5LFtyZXEuYm9keS5pZCwgcmVxLmJvZHkudHlwZSwgcmVxLmJvZHkubG9jYXRpb25dLChlcnI6IGFueSwgcm93czogYW55KT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZihlcnIpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKGVycik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZChyb3dzKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdH0pOyBcclxuXHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBubyB1c2VyIHdpdGggdGhhdCB1c2VybmFtZSwgY3JlYXRlIHRoZSB1c2VyXHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgbmV3VXNlck15c3FsID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR1c2VybmFtZTogcmVxLmJvZHkuaWQsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IHJlcS5ib2R5LnR5cGUsIC8vIHVzZSB0aGUgZ2VuZXJhdGVIYXNoIGZ1bmN0aW9uIGluIG91ciBcclxuXHRcdFx0XHRcdFx0XHRcdFx0bG9jYXRpb246IHJlcS5ib2R5LmxvY2F0aW9uLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogcmVxLmJvZHkuZGVzY3JpcHRpb24gfHwgJ2RlZmF1bHQgZGVzYycsXHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvc3Q6IGNvbmZpZy5tYWludGVuYW5jZV9jb3N0W3JlcS5ib2R5LnR5cGUrXCJfXCIrcmVxLmJvZHkubG9jYXRpb25dIHx8IDEwMFxyXG5cdFx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgaW5zZXJ0UXVlcnkgPSAnSU5TRVJUIElOVE8gJytjb25maWcuZGJfdGFibGVzLlJFTlRBTF9NQUlOVEVOQU5DRSsnICh1c2VybmFtZSwgdHlwZSwgbG9jYXRpb24sIHJlcGVhdGVkLCBkZXNjcmlwdGlvbiwgY29zdCApIHZhbHVlcyAoPyw/LD8sPyw/LD8pJzsgXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeShpbnNlcnRRdWVyeSwgW25ld1VzZXJNeXNxbC51c2VybmFtZSwgbmV3VXNlck15c3FsLnR5cGUsIG5ld1VzZXJNeXNxbC5sb2NhdGlvbiwgZmFsc2UsIG5ld1VzZXJNeXNxbC5kZXNjcmlwdGlvbiwgbmV3VXNlck15c3FsLmNvc3QgXSwgKGVycjogYW55LCByb3dzOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5zZW5kKGVycik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBzZWxlY3RRdWVyeSA9ICdTRUxFQ1QgKiBmcm9tICcrY29uZmlnLmRiX3RhYmxlcy5SRU5UQUxfTUFJTlRFTkFOQ0UrJyB3aGVyZSB0eXBlPScrbmV3VXNlck15c3FsLnR5cGUrJyAmJiBsb2NhdGlvbj0nK25ld1VzZXJNeXNxbC5sb2NhdGlvbisnICYmIHVzZXJuYW1lPScrbmV3VXNlck15c3FsLnVzZXJuYW1lOyBcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeShzZWxlY3RRdWVyeSxbXSwoZXJyOiBhbnksIHJvd3M6IGFueSk9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZXJyKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzLnN0YXR1cyg1MDApLnNlbmQoZXJyKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKHJvd3MpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZChuZXdVc2VyTXlzcWwpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHR9XHJcblx0Ly9yZXMuc3RhdHVzKDIwMCkuanNvbigpO1xyXG59KTtcclxuXHJcbmV4cG9ydCA9IHJvdXRlcjtcclxuIl19
