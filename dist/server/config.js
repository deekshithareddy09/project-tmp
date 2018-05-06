/**
 * config
 */
var fs = require('fs');
exports.db_options = {
    connectionLimit: 12,
    host: 'sl-us-south-1-portal.22.dblayer.com',
    port: 39849,
    user: 'admin',
    password: 'YUNVSJBQKEHIOIQJ',
    ssl: {
        ca: fs.readFileSync(__dirname + '/cert/cert.crt')
    },
    database: 'rental',
    charset: 'utf8'
};
exports.db_tables = {
    USERS: 'rental_users',
    RENTAL_MAINTENANCE: 'rental_maintenance'
};
exports.maintenance_cost = {
    electrical_bedroom: 202,
    electrical_kitchen: 25,
    heating_bedroom: 201,
    heating_kitchen: 205,
    aircondition_kitchen: 209,
    aircondition_bedroom: 210,
    dryervent_kitchen: 75,
    plumbing_bathroom: 30
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV2QixPQUFPLENBQUMsVUFBVSxHQUFHO0lBQ25CLGVBQWUsRUFBRSxFQUFFO0lBQ2IsSUFBSSxFQUFFLHFDQUFxQztJQUMzQyxJQUFJLEVBQUUsS0FBSztJQUNYLElBQUksRUFBRSxPQUFPO0lBQ2IsUUFBUSxFQUFFLGtCQUFrQjtJQUM1QixHQUFHLEVBQUU7UUFDRCxFQUFFLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7S0FDcEQ7SUFDRCxRQUFRLEVBQUUsUUFBUTtJQUNsQixPQUFPLEVBQUUsTUFBTTtDQUN0QixDQUFDO0FBRUYsT0FBTyxDQUFDLFNBQVMsR0FBRztJQUNuQixLQUFLLEVBQUcsY0FBYztJQUNuQixrQkFBa0IsRUFBRSxvQkFBb0I7Q0FDM0MsQ0FBQztBQUVGLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBSTtJQUN4QixrQkFBa0IsRUFBRyxHQUFHO0lBQ3hCLGtCQUFrQixFQUFHLEVBQUU7SUFDdkIsZUFBZSxFQUFHLEdBQUc7SUFDckIsZUFBZSxFQUFHLEdBQUc7SUFDckIsb0JBQW9CLEVBQUcsR0FBRztJQUMxQixvQkFBb0IsRUFBRyxHQUFHO0lBQzFCLGlCQUFpQixFQUFFLEVBQUU7SUFDckIsaUJBQWlCLEVBQUUsRUFBRTtDQUN4QixDQUFBIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBjb25maWdcclxuICovXHJcbmxldCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XHJcblxyXG5leHBvcnRzLmRiX29wdGlvbnMgPSB7XHJcblx0XHRjb25uZWN0aW9uTGltaXQ6IDEyLFxyXG4gICAgICAgIGhvc3Q6ICdzbC11cy1zb3V0aC0xLXBvcnRhbC4yMi5kYmxheWVyLmNvbScsXHJcbiAgICAgICAgcG9ydDogMzk4NDksXHJcbiAgICAgICAgdXNlcjogJ2FkbWluJyxcclxuICAgICAgICBwYXNzd29yZDogJ1lVTlZTSkJRS0VISU9JUUonLFxyXG4gICAgICAgIHNzbDoge1xyXG4gICAgICAgICAgICBjYTogZnMucmVhZEZpbGVTeW5jKF9fZGlybmFtZSArICcvY2VydC9jZXJ0LmNydCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhYmFzZTogJ3JlbnRhbCcsXHJcbiAgICAgICAgY2hhcnNldDogJ3V0ZjgnXHJcbn07XHJcblxyXG5leHBvcnRzLmRiX3RhYmxlcyA9IHtcclxuXHRVU0VSUyA6ICdyZW50YWxfdXNlcnMnLFxyXG4gICAgUkVOVEFMX01BSU5URU5BTkNFOiAncmVudGFsX21haW50ZW5hbmNlJ1xyXG59O1xyXG5cclxuZXhwb3J0cy5tYWludGVuYW5jZV9jb3N0ICA9IHtcclxuICAgIGVsZWN0cmljYWxfYmVkcm9vbSA6IDIwMixcclxuICAgIGVsZWN0cmljYWxfa2l0Y2hlbiA6IDI1LFxyXG4gICAgaGVhdGluZ19iZWRyb29tIDogMjAxLFxyXG4gICAgaGVhdGluZ19raXRjaGVuIDogMjA1LFxyXG4gICAgYWlyY29uZGl0aW9uX2tpdGNoZW4gOiAyMDksXHJcbiAgICBhaXJjb25kaXRpb25fYmVkcm9vbSA6IDIxMCxcclxuICAgIGRyeWVydmVudF9raXRjaGVuOiA3NSxcclxuICAgIHBsdW1iaW5nX2JhdGhyb29tOiAzMFxyXG59XHJcblxyXG5cclxuXHQiXX0=