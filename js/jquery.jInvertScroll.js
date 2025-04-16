(function ($) {
  "use strict";

  $.jInvertScroll = function (sel, options) {
    var defaults = {
      width: "auto",
      height: "auto",
      onScroll: function (percent) {},
    };

    var config = $.extend(defaults, options);

    if (typeof sel === "Object" && sel.length > 0) {
      return;
    }

    var elements = [],
      longest = 0,
      totalHeight,
      winHeight,
      winWidth;

    function init() {
      // Extract all selected elements from dom and save them into an array
      $.each(sel, function (i, val) {
        $(val).each(function (e) {
          elements.push($(this));

          var w = $(this).width();
          if (longest < w) {
            longest = w;
          }
        });
      });

      // Use the longest elements width + height if set to auto
      if (config.width == "auto") {
        config.width = longest;
      }

      if (config.height == "auto") {
        config.height = longest;
      }

      // Set the body to the selected height
      $("body").css("height", config.height + "px");
    }

    function calc() {
      totalHeight = $(document).height();
      winHeight = $(window).height();
      winWidth = $(window).width();
    }

    function onscroll(e) {
      var currY = $(this).scrollTop();
      // Make calculations
      calc();
      var diff = totalHeight - winHeight;
      var scrollPercent = 0;

      if (diff != 0) {
        // Current percentual position
        scrollPercent = (currY / diff).toFixed(4);
      }

      // Call the onScroll callback
      if (typeof config.onScroll === "function") {
        config.onScroll.call(this, scrollPercent);
      }

      // do the position calculation for each element
      $.each(elements, function (i, el) {
        var deltaW = el.width() - winWidth;
        if (deltaW <= 0) {
          deltaW = el.width();
        }
        var pos = Math.floor(deltaW * scrollPercent) * -1;
        // el.css({'left':pos});
        el.stop(0).css({
          transform: "translateX(" + pos + "px)",
          "-webkit-transform": "translateX(" + pos + "px)",
        });
      });
    }

    function setlisteners() {
      // Listen for the actual scroll event
      $(window).on("scroll resize", onscroll);
      $([document, window]).on("ready resize", calc);
    }

    // Init actions
    init();
    setlisteners();

    return {
      reinitialize: function () {
        init();
        setlisteners();
      },
      destroy: function () {
        // Remove previously added inline styles
        $("body").attr("style", "");

        // Remove listeners
        $(window).off("scroll resize", onscroll);
        $([document, window]).off("ready resize", calc);
      },
    };
  };
})(jQuery);
