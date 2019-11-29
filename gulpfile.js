const gulp = require("gulp");
const path = require("path");
const util = require("gulp-util");
const yargs = require("yargs").argv;
const { protractor, webdriver_update_specific } = require("gulp-protractor");

// gulp.task("test:driver_update", webdriver_update_specific({
//     webdriverManagerArgs: ["--ie", "--chrome"]
// }));

gulp.task("test", () => {
    console.log(`mocha_e2e/${yargs.spec||"*/*.js"}`);
    gulp.src([])
        .pipe(protractor({
            configFile: path.resolve("./protractor.config.js"),
            args: ["--specs", [
                `mocha_e2e/${yargs.spec||"*/*.js"}`
            ]]
        }))
        .on("end", function () {
            console.log("E2E Testing complete");
            process.exit();
        })
        .on("error", function (error) {
            console.log("E2E Tests failed");
            process.exit(1);
        });
});