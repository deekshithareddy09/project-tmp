"use strict";
var schema = function (db) {
    // let sql_user = 'CREATE TABLE IF NOT EXISTS `users` (' +
    // 	'`id` int(11) NOT NULL AUTO_INCREMENT,' +
    // 	'`username` varchar(255) NOT NULL,' +
    // 	'`password` varchar(255) NOT NULL,' +
    // 	'PRIMARY KEY(`id`)' +
    // 	') ENGINE = InnoDB DEFAULT CHARSET = utf8';
    // let sql_camp = 'CREATE TABLE IF NOT EXISTS `campgrounds` (' +
    // 	'`id` int(11) NOT NULL AUTO_INCREMENT,' +
    // 	'`name` varchar(255) NOT NULL,' +
    // 	'`image` varchar(255) NOT NULL,' +
    // 	'`username` varchar(255) NOT NULL,' +
    // 	'`price` int(11),' +
    // 	'`user_id` int(11) NOT NULL,' +
    // 	'`description` TEXT,' +
    // 	'PRIMARY KEY(`id`),' +
    // 	'CONSTRAINT `FK_USER_CAMP` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)' +
    // 	') ENGINE = InnoDB DEFAULT CHARSET = utf8';
    // let sql_commemt = 'CREATE TABLE IF NOT EXISTS `comments` (' +
    // 	'`id` int(11) NOT NULL AUTO_INCREMENT,' +
    // 	'`username` varchar(255) NOT NULL,' +
    // 	'`user_id` int(11) NOT NULL,' +
    // 	'`text` TEXT NOT NULL,' +
    // 	'`campground_id` int(11) NOT NULL,' +
    // 	'PRIMARY KEY(`id`),' +
    // 	'CONSTRAINT `FK_USER_COMMENT` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),' +
    // 	'CONSTRAINT `FK_CAMP_COMMENT` FOREIGN KEY (`campground_id`) REFERENCES `campgrounds` (`id`)' +
    // 	') ENGINE = InnoDB DEFAULT CHARSET = utf8';
    // db.getConnection((err: any, connection: any) => {
    // 	if (err) {
    // 		console.log(err);
    // 	} else {
    // 		connection.query(sql_user, (err: any) => {
    // 			if (err) {
    // 				console.log(err);
    // 			}
    // 		});
    // 		connection.query(sql_camp, (err: any) => {
    // 			if (err) {
    // 				console.log(err);
    // 			}
    // 		});
    // 		connection.query(sql_commemt, (err: any) => {
    // 			if (err) {
    // 				console.log(err);
    // 			}
    // 		});
    // 		connection.release();
    // 	}
    // });
};
module.exports = schema;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFiYXNlL2RiLnNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBTSxNQUFNLEdBQUcsVUFBQyxFQUFPO0lBQ3RCLDBEQUEwRDtJQUMxRCw2Q0FBNkM7SUFDN0MseUNBQXlDO0lBQ3pDLHlDQUF5QztJQUN6Qyx5QkFBeUI7SUFDekIsK0NBQStDO0lBRS9DLGdFQUFnRTtJQUNoRSw2Q0FBNkM7SUFDN0MscUNBQXFDO0lBQ3JDLHNDQUFzQztJQUN0Qyx5Q0FBeUM7SUFDekMsd0JBQXdCO0lBQ3hCLG1DQUFtQztJQUNuQywyQkFBMkI7SUFDM0IsMEJBQTBCO0lBQzFCLG1GQUFtRjtJQUNuRiwrQ0FBK0M7SUFFL0MsZ0VBQWdFO0lBQ2hFLDZDQUE2QztJQUM3Qyx5Q0FBeUM7SUFDekMsbUNBQW1DO0lBQ25DLDZCQUE2QjtJQUM3Qix5Q0FBeUM7SUFDekMsMEJBQTBCO0lBQzFCLHVGQUF1RjtJQUN2RixrR0FBa0c7SUFDbEcsK0NBQStDO0lBRS9DLG9EQUFvRDtJQUNwRCxjQUFjO0lBQ2Qsc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWiwrQ0FBK0M7SUFDL0MsZ0JBQWdCO0lBQ2hCLHdCQUF3QjtJQUN4QixPQUFPO0lBQ1AsUUFBUTtJQUNSLCtDQUErQztJQUMvQyxnQkFBZ0I7SUFDaEIsd0JBQXdCO0lBQ3hCLE9BQU87SUFDUCxRQUFRO0lBQ1Isa0RBQWtEO0lBQ2xELGdCQUFnQjtJQUNoQix3QkFBd0I7SUFDeEIsT0FBTztJQUNQLFFBQVE7SUFFUiwwQkFBMEI7SUFDMUIsS0FBSztJQUNMLE1BQU07QUFDUCxDQUFDLENBQUM7QUFFRixpQkFBUyxNQUFNLENBQUMiLCJmaWxlIjoiZGF0YWJhc2UvZGIuc2NoZW1hLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2NoZW1hID0gKGRiOiBhbnkpID0+IHtcclxuXHQvLyBsZXQgc3FsX3VzZXIgPSAnQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgYHVzZXJzYCAoJyArXHJcblx0Ly8gXHQnYGlkYCBpbnQoMTEpIE5PVCBOVUxMIEFVVE9fSU5DUkVNRU5ULCcgK1xyXG5cdC8vIFx0J2B1c2VybmFtZWAgdmFyY2hhcigyNTUpIE5PVCBOVUxMLCcgK1xyXG5cdC8vIFx0J2BwYXNzd29yZGAgdmFyY2hhcigyNTUpIE5PVCBOVUxMLCcgK1xyXG5cdC8vIFx0J1BSSU1BUlkgS0VZKGBpZGApJyArXHJcblx0Ly8gXHQnKSBFTkdJTkUgPSBJbm5vREIgREVGQVVMVCBDSEFSU0VUID0gdXRmOCc7XHJcblxyXG5cdC8vIGxldCBzcWxfY2FtcCA9ICdDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBgY2FtcGdyb3VuZHNgICgnICtcclxuXHQvLyBcdCdgaWRgIGludCgxMSkgTk9UIE5VTEwgQVVUT19JTkNSRU1FTlQsJyArXHJcblx0Ly8gXHQnYG5hbWVgIHZhcmNoYXIoMjU1KSBOT1QgTlVMTCwnICtcclxuXHQvLyBcdCdgaW1hZ2VgIHZhcmNoYXIoMjU1KSBOT1QgTlVMTCwnICtcclxuXHQvLyBcdCdgdXNlcm5hbWVgIHZhcmNoYXIoMjU1KSBOT1QgTlVMTCwnICtcclxuXHQvLyBcdCdgcHJpY2VgIGludCgxMSksJyArXHJcblx0Ly8gXHQnYHVzZXJfaWRgIGludCgxMSkgTk9UIE5VTEwsJyArXHJcblx0Ly8gXHQnYGRlc2NyaXB0aW9uYCBURVhULCcgK1xyXG5cdC8vIFx0J1BSSU1BUlkgS0VZKGBpZGApLCcgK1xyXG5cdC8vIFx0J0NPTlNUUkFJTlQgYEZLX1VTRVJfQ0FNUGAgRk9SRUlHTiBLRVkgKGB1c2VyX2lkYCkgUkVGRVJFTkNFUyBgdXNlcnNgIChgaWRgKScgK1xyXG5cdC8vIFx0JykgRU5HSU5FID0gSW5ub0RCIERFRkFVTFQgQ0hBUlNFVCA9IHV0ZjgnO1xyXG5cclxuXHQvLyBsZXQgc3FsX2NvbW1lbXQgPSAnQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgYGNvbW1lbnRzYCAoJyArXHJcblx0Ly8gXHQnYGlkYCBpbnQoMTEpIE5PVCBOVUxMIEFVVE9fSU5DUkVNRU5ULCcgK1xyXG5cdC8vIFx0J2B1c2VybmFtZWAgdmFyY2hhcigyNTUpIE5PVCBOVUxMLCcgK1xyXG5cdC8vIFx0J2B1c2VyX2lkYCBpbnQoMTEpIE5PVCBOVUxMLCcgK1xyXG5cdC8vIFx0J2B0ZXh0YCBURVhUIE5PVCBOVUxMLCcgK1xyXG5cdC8vIFx0J2BjYW1wZ3JvdW5kX2lkYCBpbnQoMTEpIE5PVCBOVUxMLCcgK1xyXG5cdC8vIFx0J1BSSU1BUlkgS0VZKGBpZGApLCcgK1xyXG5cdC8vIFx0J0NPTlNUUkFJTlQgYEZLX1VTRVJfQ09NTUVOVGAgRk9SRUlHTiBLRVkgKGB1c2VyX2lkYCkgUkVGRVJFTkNFUyBgdXNlcnNgIChgaWRgKSwnICtcclxuXHQvLyBcdCdDT05TVFJBSU5UIGBGS19DQU1QX0NPTU1FTlRgIEZPUkVJR04gS0VZIChgY2FtcGdyb3VuZF9pZGApIFJFRkVSRU5DRVMgYGNhbXBncm91bmRzYCAoYGlkYCknICtcclxuXHQvLyBcdCcpIEVOR0lORSA9IElubm9EQiBERUZBVUxUIENIQVJTRVQgPSB1dGY4JztcclxuXHJcblx0Ly8gZGIuZ2V0Q29ubmVjdGlvbigoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkgPT4ge1xyXG5cdC8vIFx0aWYgKGVycikge1xyXG5cdC8vIFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdC8vIFx0fSBlbHNlIHtcclxuXHQvLyBcdFx0Y29ubmVjdGlvbi5xdWVyeShzcWxfdXNlciwgKGVycjogYW55KSA9PiB7XHJcblx0Ly8gXHRcdFx0aWYgKGVycikge1xyXG5cdC8vIFx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHQvLyBcdFx0XHR9XHJcblx0Ly8gXHRcdH0pO1xyXG5cdC8vIFx0XHRjb25uZWN0aW9uLnF1ZXJ5KHNxbF9jYW1wLCAoZXJyOiBhbnkpID0+IHtcclxuXHQvLyBcdFx0XHRpZiAoZXJyKSB7XHJcblx0Ly8gXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdC8vIFx0XHRcdH1cclxuXHQvLyBcdFx0fSk7XHJcblx0Ly8gXHRcdGNvbm5lY3Rpb24ucXVlcnkoc3FsX2NvbW1lbXQsIChlcnI6IGFueSkgPT4ge1xyXG5cdC8vIFx0XHRcdGlmIChlcnIpIHtcclxuXHQvLyBcdFx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0Ly8gXHRcdFx0fVxyXG5cdC8vIFx0XHR9KTtcclxuXHJcblx0Ly8gXHRcdGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0ID0gc2NoZW1hO1xyXG4iXX0=