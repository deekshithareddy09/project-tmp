"use strict";
var _this = this;
var mysql = require("mysql");
var config = require('../config');
var db = (function () {
    _this.pool = mysql.createPool(config.db_options);
    _this.getConnection = function (cb) {
        _this.pool.getConnection(cb);
    };
    _this.query = function (sql, values) { return new Promise(function (resolve, reject) {
        _this.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            }
            else {
                connection.query(sql, values, function (err, results) {
                    connection.release();
                    if (err) {
                        console.log(err);
                    }
                    else {
                        resolve(results);
                    }
                });
            }
        });
    }); };
    return _this;
})();
module.exports = db;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFiYXNlL2RiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlCQStCWTtBQS9CWiw2QkFBZ0M7QUFDaEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRWxDLElBQU0sRUFBRSxHQUFHLENBQUM7SUFDWCxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBQyxFQUFPO1FBQzVCLEtBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztJQUVGLEtBQUksQ0FBQyxLQUFLLEdBQUcsVUFBQyxHQUFRLEVBQUUsTUFBVyxJQUFLLE9BQUEsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNuRSxLQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFDLEdBQVEsRUFBRSxVQUFlO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQUMsR0FBUSxFQUFFLE9BQVk7b0JBQ3BELFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFckIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNQLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbEIsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxFQWhCc0MsQ0FnQnRDLENBQUM7SUFFSCxNQUFNLENBQUMsS0FBSSxDQUFDO0FBQ2IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMLGlCQUFTLEVBQUUsQ0FBQyIsImZpbGUiOiJkYXRhYmFzZS9kYi5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG15c3FsID0gcmVxdWlyZSgnbXlzcWwnKTtcclxubGV0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xyXG5cclxuY29uc3QgZGIgPSAoKCkgPT4ge1xyXG5cdHRoaXMucG9vbCA9IG15c3FsLmNyZWF0ZVBvb2woY29uZmlnLmRiX29wdGlvbnMpO1xyXG5cclxuXHR0aGlzLmdldENvbm5lY3Rpb24gPSAoY2I6IGFueSkgPT4ge1xyXG5cdFx0dGhpcy5wb29sLmdldENvbm5lY3Rpb24oY2IpO1xyXG5cdH07XHJcblxyXG5cdHRoaXMucXVlcnkgPSAoc3FsOiBhbnksIHZhbHVlczogYW55KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHR0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xyXG5cdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHNxbCwgdmFsdWVzLCAoZXJyOiBhbnksIHJlc3VsdHM6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHRzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0ID0gZGI7Il19
