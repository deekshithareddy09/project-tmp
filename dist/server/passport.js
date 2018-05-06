"use strict";
/**
 * Created by laurence-ho on 21/07/17.
 */
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var db = require('./database/db.service');
var config = require('./config');
var sha1 = require('sha1');
module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        db.getConnection(function (err, connection) {
            if (err) {
                console.error('error', err);
                return done(err);
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [id], function (err, rows) {
                    connection.release();
                    if (err) {
                        console.error('error', err);
                        return done(err);
                    }
                    else {
                        done(null, rows[0]);
                    }
                });
            }
        });
    });
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        console.log('---- User Signup: ' + username + ' ----');
        db.getConnection(function (err, connection) {
            if (err) {
                console.error('error', err);
                return done(err);
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [username], function (err, rows) {
                    if (err) {
                        console.error('error', err);
                        return done(err);
                    }
                    if (rows.length) {
                        return done(err, false, { message: 'This username is already taken.' });
                    }
                    else {
                        // if there is no user with that username, create the user
                        var newUserMysql_1 = {
                            username: username,
                            password: sha1(password) // use the generateHash function in our user model
                        };
                        var insertQuery = 'INSERT INTO ' + config.db_tables.USERS + ' ( username, password ) values (?,?)';
                        connection.query(insertQuery, [newUserMysql_1.username, newUserMysql_1.password], function (err, rows) {
                            connection.release();
                            if (err) {
                                console.error('error', err);
                                return done(err);
                            }
                            newUserMysql_1 = rows;
                            return done(null, newUserMysql_1);
                        });
                    }
                });
            }
        });
    }));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, function (req, username, password, done) {
        console.log('---- User login: ' + username + ' ----');
        db.getConnection(function (err, connection) {
            if (err) {
                console.error('error', err);
                return done(err);
            }
            else {
                connection.query('SELECT * FROM ' + config.db_tables.USERS + ' WHERE username = ?', [username], function (err, rows) {
                    connection.release();
                    if (err) {
                        console.error('error', err);
                        return done(err);
                    }
                    if (rows.length) {
                        // if the user is found but the password is wrong
                        if (!(sha1(password) === rows[0].password)) {
                            return done(err, false, { message: 'User name or password is wrong' });
                        }
                        else {
                            // all is well, return successful user
                            return done(null, rows[0]);
                        }
                    }
                    else {
                        return done(err, false, { message: 'User name or password is wrong' });
                    }
                });
            }
        });
    }));
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEIsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDakIsaURBQWlEO3dCQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBQyxDQUFDLENBQUM7d0JBQ3RFLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ1Asc0NBQXNDOzRCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQztvQkFDRixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBQyxDQUFDLENBQUM7b0JBQ3RFLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFDIiwiZmlsZSI6InBhc3Nwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGF1cmVuY2UtaG8gb24gMjEvMDcvMTcuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUGFzc3BvcnQgfSBmcm9tICdwYXNzcG9ydCc7XHJcblxyXG5sZXQgTG9jYWxTdHJhdGVneSA9IHJlcXVpcmUoJ3Bhc3Nwb3J0LWxvY2FsJykuU3RyYXRlZ3k7XHJcblxyXG5sZXQgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0LW5vZGVqcycpO1xyXG5sZXQgZGIgPSByZXF1aXJlKCcuL2RhdGFiYXNlL2RiLnNlcnZpY2UnKTtcclxubGV0IGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XHJcbmxldCBzaGExID0gcmVxdWlyZSgnc2hhMScpO1xyXG5cclxuZXhwb3J0ID0gKHBhc3Nwb3J0OiBQYXNzcG9ydCkgPT4ge1xyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyBwYXNzcG9ydCBzZXNzaW9uIHNldHVwID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIHJlcXVpcmVkIGZvciBwZXJzaXN0ZW50IGxvZ2luIHNlc3Npb25zXHJcblx0Ly8gcGFzc3BvcnQgbmVlZHMgYWJpbGl0eSB0byBzZXJpYWxpemUgYW5kIHVuc2VyaWFsaXplIHVzZXJzIG91dCBvZiBzZXNzaW9uXHJcblxyXG5cdC8vIHVzZWQgdG8gc2VyaWFsaXplIHRoZSB1c2VyIGZvciB0aGUgc2Vzc2lvblxyXG5cdHBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoKHVzZXI6IGFueSwgZG9uZTogYW55KSA9PiB7XHJcblx0XHRkb25lKG51bGwsIHVzZXIudXNlcm5hbWUpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyB1c2VkIHRvIGRlc2VyaWFsaXplIHRoZSB1c2VyXHJcblx0cGFzc3BvcnQuZGVzZXJpYWxpemVVc2VyKChpZCwgZG9uZSkgPT4ge1xyXG5cdFx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xyXG5cdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xyXG5cdFx0XHRcdHJldHVybiBkb25lKGVycik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29ubmVjdGlvbi5xdWVyeSgnU0VMRUNUICogRlJPTSAnK2NvbmZpZy5kYl90YWJsZXMuVVNFUlMrJyBXSEVSRSB1c2VybmFtZSA9ID8nLCBbaWRdLCAoZXJyOiBhbnksIHJvd3M6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkb25lKGVycik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRkb25lKG51bGwsIHJvd3NbMF0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vIExPQ0FMIFNJR05VUCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gd2UgYXJlIHVzaW5nIG5hbWVkIHN0cmF0ZWdpZXMgc2luY2Ugd2UgaGF2ZSBvbmUgZm9yIGxvZ2luIGFuZCBvbmUgZm9yIHNpZ251cFxyXG5cdC8vIGJ5IGRlZmF1bHQsIGlmIHRoZXJlIHdhcyBubyBuYW1lLCBpdCB3b3VsZCBqdXN0IGJlIGNhbGxlZCAnbG9jYWwnXHJcblxyXG5cdHBhc3Nwb3J0LnVzZSgnbG9jYWwtc2lnbnVwJyxcclxuXHRcdG5ldyBMb2NhbFN0cmF0ZWd5KHtcclxuXHRcdFx0XHQvLyBieSBkZWZhdWx0LCBsb2NhbCBzdHJhdGVneSB1c2VzIHVzZXJuYW1lIGFuZCBwYXNzd29yZCwgd2Ugd2lsbCBvdmVycmlkZSB3aXRoIGVtYWlsXHJcblx0XHRcdFx0dXNlcm5hbWVGaWVsZDogJ3VzZXJuYW1lJyxcclxuXHRcdFx0XHRwYXNzd29yZEZpZWxkOiAncGFzc3dvcmQnLFxyXG5cdFx0XHRcdHBhc3NSZXFUb0NhbGxiYWNrOiB0cnVlIC8vIGFsbG93cyB1cyB0byBwYXNzIGJhY2sgdGhlIGVudGlyZSByZXF1ZXN0IHRvIHRoZSBjYWxsYmFja1xyXG5cdFx0XHR9LFxyXG5cdFx0XHQocmVxOiBhbnksIHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGRvbmU6IGFueSkgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCctLS0tIFVzZXIgU2lnbnVwOiAnICsgdXNlcm5hbWUgKyAnIC0tLS0nKTtcclxuXHJcblx0XHRcdFx0ZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycik7XHJcblx0XHRcdFx0XHRcdHJldHVybiBkb25lKGVycik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NICcrY29uZmlnLmRiX3RhYmxlcy5VU0VSUysnIFdIRVJFIHVzZXJuYW1lID0gPycsIFt1c2VybmFtZV0sIChlcnI6IGFueSwgcm93czogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoZXJyKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyb3dzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoZXJyLCBmYWxzZSwge21lc3NhZ2U6ICdUaGlzIHVzZXJuYW1lIGlzIGFscmVhZHkgdGFrZW4uJ30pO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBubyB1c2VyIHdpdGggdGhhdCB1c2VybmFtZSwgY3JlYXRlIHRoZSB1c2VyXHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgbmV3VXNlck15c3FsID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR1c2VybmFtZTogdXNlcm5hbWUsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHBhc3N3b3JkOiBzaGExKHBhc3N3b3JkKSAvLyB1c2UgdGhlIGdlbmVyYXRlSGFzaCBmdW5jdGlvbiBpbiBvdXIgdXNlciBtb2RlbFxyXG5cdFx0XHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgaW5zZXJ0UXVlcnkgPSAnSU5TRVJUIElOVE8gJytjb25maWcuZGJfdGFibGVzLlVTRVJTKycgKCB1c2VybmFtZSwgcGFzc3dvcmQgKSB2YWx1ZXMgKD8sPyknO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucXVlcnkoaW5zZXJ0UXVlcnksIFtuZXdVc2VyTXlzcWwudXNlcm5hbWUsIG5ld1VzZXJNeXNxbC5wYXNzd29yZF0sIChlcnI6IGFueSwgcm93czogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBkb25lKGVycik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdG5ld1VzZXJNeXNxbCA9IHJvd3M7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZG9uZShudWxsLCBuZXdVc2VyTXlzcWwpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHQpO1xyXG5cclxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0Ly8gTE9DQUwgTE9HSU4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHQvLyB3ZSBhcmUgdXNpbmcgbmFtZWQgc3RyYXRlZ2llcyBzaW5jZSB3ZSBoYXZlIG9uZSBmb3IgbG9naW4gYW5kIG9uZSBmb3Igc2lnbnVwXHJcblx0Ly8gYnkgZGVmYXVsdCwgaWYgdGhlcmUgd2FzIG5vIG5hbWUsIGl0IHdvdWxkIGp1c3QgYmUgY2FsbGVkICdsb2NhbCdcclxuXHJcblx0cGFzc3BvcnQudXNlKCdsb2NhbC1sb2dpbicsXHJcblx0XHRuZXcgTG9jYWxTdHJhdGVneSh7XHJcblx0XHRcdFx0Ly8gYnkgZGVmYXVsdCwgbG9jYWwgc3RyYXRlZ3kgdXNlcyB1c2VybmFtZSBhbmQgcGFzc3dvcmQsIHdlIHdpbGwgb3ZlcnJpZGUgd2l0aCBlbWFpbFxyXG5cdFx0XHRcdHVzZXJuYW1lRmllbGQ6ICd1c2VybmFtZScsXHJcblx0XHRcdFx0cGFzc3dvcmRGaWVsZDogJ3Bhc3N3b3JkJyxcclxuXHRcdFx0XHRwYXNzUmVxVG9DYWxsYmFjazogdHJ1ZSAvLyBhbGxvd3MgdXMgdG8gcGFzcyBiYWNrIHRoZSBlbnRpcmUgcmVxdWVzdCB0byB0aGUgY2FsbGJhY2tcclxuXHRcdFx0fSxcclxuXHRcdFx0KHJlcTogYW55LCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBkb25lOiBhbnkpID0+IHsgLy8gY2FsbGJhY2sgd2l0aCBlbWFpbCBhbmQgcGFzc3dvcmQgZnJvbSBvdXIgZm9ybVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCctLS0tIFVzZXIgbG9naW46ICcgKyB1c2VybmFtZSArICcgLS0tLScpO1xyXG5cclxuXHRcdFx0XHRkYi5nZXRDb25uZWN0aW9uKChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoZXJyKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbm5lY3Rpb24ucXVlcnkoJ1NFTEVDVCAqIEZST00gJytjb25maWcuZGJfdGFibGVzLlVTRVJTKycgV0hFUkUgdXNlcm5hbWUgPSA/JywgW3VzZXJuYW1lXSwgKGVycjogYW55LCByb3dzOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3InLCBlcnIpO1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUoZXJyKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdGlmIChyb3dzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gaWYgdGhlIHVzZXIgaXMgZm91bmQgYnV0IHRoZSBwYXNzd29yZCBpcyB3cm9uZ1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCEoc2hhMShwYXNzd29yZCkgPT09IHJvd3NbMF0ucGFzc3dvcmQpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBkb25lKGVyciwgZmFsc2UsIHttZXNzYWdlOiAnVXNlciBuYW1lIG9yIHBhc3N3b3JkIGlzIHdyb25nJ30pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gYWxsIGlzIHdlbGwsIHJldHVybiBzdWNjZXNzZnVsIHVzZXJcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGRvbmUobnVsbCwgcm93c1swXSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBkb25lKGVyciwgZmFsc2UsIHttZXNzYWdlOiAnVXNlciBuYW1lIG9yIHBhc3N3b3JkIGlzIHdyb25nJ30pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0KTtcclxufTtcclxuIl19
