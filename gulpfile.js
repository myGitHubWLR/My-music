


var gulp = require("gulp");
//gulp中插件的应用 下载-->require()取出 -->输出到相应位置

//压缩图片
var imagemin = require("gulp-imagemin");
//压缩html
var htmlclean = require("gulp-htmlclean");

//压缩js
var uglify = require("gulp-uglify");

//在打包上线，生产环境下
//去掉js中的调试语句
var stripDebug = require("gulp-strip-debug");

var concat = require("gulp-concat");
var deporder = require("gulp-deporder");
//将less转换成css
var less = require("gulp-less");
//自动在css3属性前增加前缀
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

var cssnano = require("cssnano");
//开启服务器
var connect = require("gulp-connect");



var folder = {
    src : "src/",
    dist : "dist/"
}
//判断当前环境变量
var devMode = process.env.NODE_ENV !== "production";
//export NODE_ENV=development/production  设置环境变量

//流操作 task创建任务 running
gulp.task("html",function(){
    var page =  gulp.src(folder.src + "html/index.html")//读取你需要操作的文件
                    .pipe(connect.reload());//开启监听，自动刷新
    if(!devMode){//如果是生产环境，则压缩
        page.pipe(htmlclean());//执行插件
    }
    page.pipe(gulp.dest(folder.dist + "html/"))//gulp.dest()能被pipe进来，并且写成文件，重新输出到指定位置
})

gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist+"images/"))
})
gulp.task("js",function(){
    var js = gulp.src(folder.src+"js/*")
            .pipe(connect.reload());
    if(!devMode){
        js.pipe(uglify())
        .pipe(stripDebug())
    }   
    js.pipe(gulp.dest(folder.dist+"js/"))
})
gulp.task("css",function(){
    var css = gulp.src(folder.src+"css/*")
                .pipe(connect.reload())
                .pipe(less());
                //添加css3属性前缀
    var options = [autoprefixer()];
    if(!devMode){
        options.push(cssnano())
    }
        
    css.pipe(postcss(options))
    .pipe(gulp.dest(folder.dist + "css/"))
})

//开启监听文件变化
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "images/*",["images"]);
    gulp.watch(folder.src + "js/*",["js"]);
    gulp.watch(folder.src + "css/*",["css"]);
})

//创建开启服务器的任务
gulp.task("server",function(){
    connect.server({
        port : "8081",//改变端口号
        livereload : true//自动刷新
    });
})



gulp.task("default",["html","images","js","css","watch","server"]);