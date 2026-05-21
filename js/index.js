$(function () {
  //mainBg
  const mainTl = gsap.timeline({
    scrollTrigger: {
      id: "mainTimeline",
      trigger: "#mainBg",
      start: "top top",
      end: "+=500%",
      scrub: 1.5,
      pin: true,
      snap: 1 / 6,

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
  let step = 3;
  let go = false;
  let stop;

  $(window).on("wheel scroll touchmove", function () {
    if (go) return;
    go = true;

    // notice
    stop = setInterval(function () {
      count++;

      $(".notice")
        .stop()
        .animate({ "margin-top": "-50px" }, 500, function () {
          $(this).append($(".notice li:first-child"));
          $(this).css({ "margin-top": "0" });
        });

      // bar
      let progress = (count / step) * 100;
      $("#intro02 .txtBox .bar")
        .stop()
        .animate({ width: progress + "%" }, 500);

      // next page
      if (count >= step) {
        clearInterval(stop);

        setTimeout(function () {
          let triggerInstance = ScrollTrigger.getById("mainTimeline");

          if (triggerInstance) {
            let targetPercent = 2 / 6;
            let targetScrollPos =
              triggerInstance.start +
              (triggerInstance.end - triggerInstance.start) * targetPercent;

            gsap.to(window, {
              duration: 1.5,
              scrollTo: targetScrollPos,
              ease: "power2.inOut",
            });
          }
        }, 900);
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

    // 메뉴 불 켜기 (모든 navi 동기화)
    $(".navi li").removeClass("on");
    $(".navi").each(function () {
      $(this).find("li").eq(i).addClass("on");
    });
  });

  // aboutMe
  //center
  const TOP_OFFSET = 150;

  const items = [
    { el: ".drop1", top: TOP_OFFSET },
    { el: ".drop2", top: TOP_OFFSET + 100 },
    { el: ".drop3", top: TOP_OFFSET - 80 },
    { el: ".drop4", top: TOP_OFFSET - 20 },
    { el: ".drop5", top: TOP_OFFSET + 120 },
    { el: ".drop6", top: TOP_OFFSET + 250 },
    { el: ".drop7", top: TOP_OFFSET + 160 },
    { el: ".drop8", top: TOP_OFFSET + 280 },
    { el: ".drop9", top: TOP_OFFSET + 80 },
    { el: ".drop10", top: TOP_OFFSET + 300 },
  ];

  items.forEach((item, index) => {
    setTimeout(() => {
      $(item.el)
        .animate(
          {
            top: item.top,
            opacity: 1,
          },
          700,
        )

        .animate(
          {
            top: item.top - 10,
          },
          100,
        )
        .animate(
          {
            top: item.top,
          },
          100,
          function () {
            if (item.rotate) {
              $(this).css("transform", "rotate(0deg)");
            }
          },
        );
    }, index * 200);
  });

  //right
  $(function () {
    $("#aboutMe .card > div").on("mouseenter", function () {
      $(this).stop().animate({ height: "500px" });
    });

    $("#aboutMe .card > div").on("mouseleave", function () {
      $("#aboutMe .card > div").stop().animate({ height: "25%" });
    });
  });

  // coding
  // [주의] 전역 변수 codingi를 꼭 맨 위에 선언해 주셔야 합니다!
  let codingi = 0;

  function slide() {
    $(".light li").removeClass("lights");
    $(".light li").eq(codingi).addClass("lights");
  }

  $(function () {
    // 전체 슬라이드 개수를 자동으로 잽니다.
    let total = $(".panel li").length;

    $(".next").on("click", function () {
      $(".panel")
        .stop()
        .animate({ "margin-left": "-100%" }, function () {
          $(".panel li:first-child").appendTo(".panel");
          $(".panel").css({ "margin-left": "0%" });

          // 💡 [여기에 한 줄 추가] 다음 버튼을 누르면 번호가 1씩 증가합니다.
          // 만약 마지막 장 번호(total - 1)를 넘어가면 다시 0번으로 리셋합니다.
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

  // slider
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
