
//实现页面渲染 img + info + like-btn
(function($,root){
    var $scope = $(document.body);
   
    //渲染当前这首歌的信息
    function renderInfo(info){
        var html = '<div class="song-name">'+info.song+'</div>'+
        '<div class="singer-name">'+info.singer+'</div>'+
        '<div class="album-name">'+info.album+'</div>';
        $scope.find(".song-info").html(html)
    }
    //渲染当前这首歌的图片
    function renderImg(src){
        var img = new Image();
        img.onload = function(){
            root.blurImg(img,$scope);
            $scope.find(".song-img img").attr("src",src)
        }
        img.src = src;
    }
    //是否喜欢当前的歌曲
    function renderIsLike(isLike){
        if(isLike){
            $scope.find(".like-btn").addClass("liking");
        }else{
            $scope.find(".like-btn").removeClass("liking");
            
        }
    }
    root.render = function(data){
        renderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike)
    }
    //暴露在window上自定义的属性
})(window.Zepto,window.player || (window.player = {}))