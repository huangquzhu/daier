let gulp = require("gulp");
let htmlmin = require("gulp-htmlmin");
let uglify = require("gulp-uglify");
let babel =require("gulp-babel");
let cssmin = require("gulp-clean-css");

gulp.task("default",async ()=>{
    gulp.watch("./html/*.html",async ()=>{
        gulp.src("./html/*.html")
        .pipe(htmlmin({
            collapseWhitespace:true,
            removeComments: true,
            removeEmptyAttributes: true,
        }))
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\daier2\\html"));
    });    

    // 压缩js
    gulp.watch(["./js/*.js","!./src/js/jquery-3.2.1.min.js"],async ()=>{
        gulp.src("./js/*.js")
        .pipe(babel({
            presets:['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\daier2\\js"));
    });    
    //把php文件夹里的所有代码原封不动的复制到服务器目录下
    gulp.watch("./php/**/*",async ()=>{
        gulp.src("./php/**/*")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\daier2\\php"));
    });
    gulp.watch("./php2/**/*",async ()=>{
        gulp.src("./php2/**/*")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\daier2\\php2"));
    });
    gulp.watch("./img/**/*",async ()=>{
        gulp.src("./img/**/*")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\daier2\\img"));
    });
    gulp.watch("./icon/**/*",async ()=>{
        gulp.src("./icon/**/*")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\daier2\\icon"));
    });

    gulp.watch("./css/**/*", async ()=>{
        gulp.src("./css/**/*")
        .pipe(cssmin())
        .pipe(gulp.dest("d:\\phpstudy\\www\\daier2\\css"))
    })
});