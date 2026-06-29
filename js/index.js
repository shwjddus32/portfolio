$(function () {
  //mainBg
  const mainTl = gsap.timeline({
    scrollTrigger: {
      id: "mainTimeline",
      trigger: "#mainBg",
      start: "top top",
      end: "+=1000%",
      scrub: 1.5,
      pin: true,
      snap: 1 / 7,

      // navi lights
      onUpdate: (self) => {
        let currentProgress = self.progress;
        let currentStep = Math.round(currentProgress * 6);
        let menuIndex = currentStep - 2;

        if (menuIndex >= 0 && menuIndex <= 3) {
          $(".navi li").removeClass("on");

          $(".navi").each(function () {
            $(this).find("li").eq(menuIndex).addClass("on");
          });
        } else {
          $(".navi li").removeClass("on");
        }
      },
    },
  });

  mainTl
    .to("#intro01", { yPercent: -100 })
    .from("#intro02", { yPercent: 100 }, "<")

    .to("#intro02", { yPercent: -100 })
    .from("#aboutMe", { yPercent: 100 }, "<")

    .to("#aboutMe", { yPercent: -100 })
    .from("#coding", { yPercent: 100 }, "<")

    .to("#coding", { yPercent: -100 })
    .from("#java", { yPercent: 100 }, "<")

    .to("#java", { yPercent: -100 })
    .from("#design", { yPercent: 100 }, "<")

    .to("#design", { yPercent: -100 })
    .from("#footer", { yPercent: 100 }, "<");

  // intro02
  let count = 0;
  let stop;

  $(window).on("wheel scroll touchmove", function () {
    if (stop) return;

    stop = setInterval(function () {
      count++;

      $(".notice")
        .stop()
        .animate({ "margin-top": "-30px" }, function () {
          $(this).append($(".notice li:first-child"));
          $(this).css({ "margin-top": "0" });
        });

      let barWidth = Math.min(count * 33.3, 100) + "%";
      $("#intro02 .bar").stop().animate({ width: barWidth }, 500);

      if (count >= 3) {
        clearInterval(stop);
      }
    }, 2000);
  });

  // navi
  $(".navi li").on("click", function (e) {
    e.preventDefault();

    let i = $(this).index();

    let targetPercent = (i + 2) / 6;

    let triggerInstance = ScrollTrigger.getById("mainTimeline");

    if (triggerInstance) {
      let targetScrollPos =
        triggerInstance.start +
        (triggerInstance.end - triggerInstance.start) * targetPercent;

      gsap.to(window, {
        duration: 0.6,
        scrollTo: targetScrollPos,
        ease: "power2.out",
      });
    }

    $(".navi li").removeClass("on");
    $(".navi").each(function () {
      $(this).find("li").eq(i).addClass("on");
    });
  });

  // coding
  let codingi = 0;

  function slide() {
    $(".light li").removeClass("lights");
    $(".light li").eq(codingi).addClass("lights");
  }

  $(function () {
    let total = $(".panel li").length;

    $(".next").on("click", function () {
      $(".panel")
        .stop()
        .animate({ "margin-left": "-100%" }, function () {
          $(".panel li:first-child").appendTo(".panel");
          $(".panel").css({ "margin-left": "0%" });

          if (codingi == total - 1) {
            codingi = 0;
          } else {
            codingi++;
          }

          slide();
        });
    });

    $(".prev").on("click", function () {
      $(".panel li:last-child").prependTo(".panel");
      $(".panel").css({ "margin-left": "-100%" });

      if (codingi == 0) {
        codingi = total - 1;
      } else {
        codingi--;
      }

      slide();

      $(".panel").stop().animate({ "margin-left": "0%" });
    });

    $(".light li").on("click", function () {
      codingi = $(this).index();

      let currentIdx = $(".panel li:first-child").index();
      while (codingi !== $(".panel li:first-child").index()) {
        $(".panel li:first-child").appendTo(".panel");
      }

      $(".panel").stop().animate({ "margin-left": "-100%" });

      slide();
    });
  });

  // folio
  $(window).on("scroll", function () {
    let triggerInstance = ScrollTrigger.getById("mainTimeline");

    if (triggerInstance) {
      let currentProgress = triggerInstance.progress;
      if (currentProgress >= 0.46 && currentProgress < 0.56) {
        $(".folio").addClass("active");
      } else {
        $(".folio").removeClass("active");
      }
    }
  });

  // java
  let small = document.querySelectorAll("#java .small li");
  let large = document.querySelectorAll("#java .large li");

  small.forEach((list, index) => {
    list.addEventListener("click", () => {
      large.forEach((item) => {
        item.classList.remove("active");
      });
      large[index].classList.add("active");
    });
  });

  // design
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: -60,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
