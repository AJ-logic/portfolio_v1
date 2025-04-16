(function ($) {
  // $('html, body').animate({
  // 	scrollTop:0
  // }, 400);
  var elem = $.jInvertScroll(
    [".scroll"], // an array containing the selector(s) for the elements you want to animate
    {
      height: 10000, // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
      onScroll: function (percent) {
        //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
        if (percent > 0.97) {
          $("#musicBtn,.join").fadeOut(1500);
        } else {
          $("#musicBtn,.join").fadeIn(1500);
        }
        // if(percent>0.06){
        // 	$(".ste").fadeOut(1500);
        // }else {
        // 	$(".ste").fadeIn(1500);
        // }
        ///////////
        if (percent > 0.15) {
          $(".ffBar,.role2").fadeIn(1500);
        } else {
          $(".ffBar,.role2").fadeOut(1500);
        }
        if (percent > 0.41) {
          $(".movieBar,.role3").fadeIn(1500);
        } else {
          $(".movieBar,.role3").fadeOut(1500);
        }
        if (percent > 0.72) {
          $(".swp2,.role4_1,.role4_2").fadeIn(1500);
        } else {
          $(".swp2,.role4_1,.role4_2").fadeOut(1500);
        }
        if (percent > 0.92) {
          $(".ffBar2").fadeIn(1500);
        } else {
          $(".ffBar2").fadeOut(1500);
        }
        ///////////
        if (percent > 0.137) {
          document.getElementById("v1").pause();
        } else {
          document.getElementById("v1").play();
        }
        if (percent > 0.46) {
          document.getElementById("v2").pause();
        } else {
          document.getElementById("v2").play();
        }
        if (percent > 0.62) {
          $(".swp1").fadeIn(1500);
          document.getElementById("v3").pause();
        } else {
          $(".swp1").fadeOut(1500);
          document.getElementById("v3").play();
        }
        if (percent > 0.9) {
          document.getElementById("v4").pause();
        } else {
          document.getElementById("v4").play();
        }
      },
    }
  );

  $(".backBtn").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      400
    );
  });
  // $(window).resize(function() {
  // 页面图文预加载
  // 浏览器大小自适应适配
  // 横向长页面滚动
  // 横向滑动位置监听触发动画衔接
  // 元素动画衔接、微调
  // 视频动画
  // 音乐播放控制
  //
  //   if ($(window).width() <= 768) {
  //     elem.destroy();
  //   }
  //   else {
  //     elem.reinitialize();
  //   }
  // });
})(jQuery);
//音频
var window_first = true;
var playaudio = true;
var audio = document.getElementById("music");
var musicBtn = document.getElementById("musicBtn");
if (document.addEventListener && musicBtn) {
  musicBtn.addEventListener("mousedown", clickMusic);
  document.addEventListener(
    "mousedown",
    function () {
      if (window_first == true) {
        audio.play();
        window_first = false;
        playaudio = true;
        $(".music").removeClass("pause");
      }
    },
    false
  );
  document.addEventListener(
    "WeixinJSBridgeReady",
    function () {
      audio.play();
    },
    false
  );
} else if (musicBtn) {
  musicBtn.style.display = "none";
}
$(window).bind("touchstart", function () {
  if (window_first == true) {
    audio.play();
    window_first = false;
    playaudio = true;
  }
});

function clickMusic(e) {
  window_first = false;
  e.stopPropagation();
  if ($(this).hasClass("pause")) {
    $(this).removeClass("pause");
    audio.play();
    playaudio = true;
  } else {
    $(this).addClass("pause");
    audio.pause();
    playaudio = false;
  }
}
//////
var s_dom = "";
for (var i = 0; i < s_data.length; i++) {
  s_dom +=
    '<div class="swiper-slide"><img src="' +
    s_data[i].imgUrl +
    '" alt=""></div>';
}
$("#s_dom_cont").html(s_dom);
var swiper1 = new Swiper(".mySwiper1", {
  observer: true,
  observeParents: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  effect: "fade",
  loop: true,

  pagination: {
    el: ".swiper-pagination1",
    clickable: true,
  },
});
$(".mySwiper1").onmouseover = function () {
  swiper1.autoplay.stop();
};
$(".mySwiper1").onmouseout = function () {
  swiper1.autoplay.start();
};
var a_dom = "";
for (var i = 0; i < art_data.length; i++) {
  a_dom +=
    '<div class="swiper-slide"><i><a href="' +
    art_data[i].url +
    '" target="_blank"><img src="' +
    art_data[i].imgSrc +
    '" alt=""></a></i><span class="sName">Title of the work</span><span class="sAuthor">' +
    art_data[i].authorName +
    "</span></div>";
}
$("#a_dom_cont").html(a_dom);
var swiper2 = new Swiper(".mySwiper2", {
  observer: true, //开启动态检查器，监测swiper和slide
  observeParents: true, //监测Swiper 的祖/父元素
  slidesPerView: 3,
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".swiper-pagination2",
    clickable: true,
  },
});
$(".mySwiper2").onmouseover = function () {
  swiper2.autoplay.stop();
};
$(".mySwiper2").onmouseout = function () {
  swiper2.autoplay.start();
};
