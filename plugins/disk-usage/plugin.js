#!/usr/bin/node

(function () {
    "use strict";

    var exec = require('child_process').exec,
        os = require('os'),
        cmd = 'df -Pk',
        regex = /^([^\s]+\s?[^\s]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)%\s+[^/]*(.*?)\s*$/;

    function run(cb) {
        function format_df(err, stdout, stderr) {
            var table,
                infos = [];

            function parse_row(row) {
                var cells = row.match(regex);
                if (!cells) {
                    return;
                }
                infos.push({
                    filesystem: cells[1],
                    blocks: parseInt(cells[2], 10),
                    used: parseInt(cells[3], 10),
                    available: parseInt(cells[4], 10),
                    percent: parseInt(cells[5], 10),
                    mountpoint: cells[6]});
            }

            if (err) {
                cb(err);
                return;
            }
            if (stderr) {
                cb(new Error(stderr));
                return;
            }

            table = stdout.split(/\n/g);
            table.pop();    // Remove header row
            table.forEach(parse_row);

            cb(null, infos);
        }

        exec(cmd, format_df);
    }

    function main() {
        run(function(err, table) {
            if (err) {
                console.error(err.stack);
                return ;
            }

            console.log(JSON.stringify(table, null, ' '));
        });
    }

    if (require.main === module) {
        main();
    }
    
    module.exports = run;
 }());
