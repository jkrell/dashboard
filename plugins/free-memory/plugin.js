#!/usr/bin/node

(function () {
    "use strict";

    var os = require("os");
    function run(cb) {
        var stats = {total: os.totalmem(),
                     free: os.freemem()};
        cb(null, stats);
    }

    function main() {
        run(function(err, table) {
            if (err) {
                console.error(err.stack);
                return ;
            }
            console.log(table);
        });
    }

    if (require.main === module) {
        main();
    }
    
    module.exports = run;
 }());
