#!/usr/bin/node

(function () {
    "use strict";

    function run(cb) {
        cb(null, require("os").loadavg());
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
