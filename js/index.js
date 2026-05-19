$(function () {
  // 1. [수정] 구역이 총 6개이므로 가짜 스크롤 공간을 화면의 6배(+=600%)로 넉넉하게 늘려줍니다.
  const mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#mainBg",
      start: "top top",
      end: "+=500%",
      scrub: 1.5,
      pin: true,
      snap: 1 / 6,
      id: "mainTimeline",
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
  const step = 3;
  let go = false;

  $(window).on("wheel scroll touchmove", function () {
    if (go) return;
    go = true;

    stop = setInterval(function () {
      count++;
      $(".notice")
        .stop()
        .animate({ "margin-top": "-50px" }, 500, function () {
          $(this).append($(".notice li:first-child"));
          $(this).css({ "margin-top": "0" });
        });

      let progress = (count / step) * 100;
      $("#intro02 .txtBox .bar")
        .stop()
        .animate({ width: progress + "%" }, 500);

      if (count >= step) {
        clearInterval(stop);
      }
    }, 2000);
  });

  // navi
  $(".navi li").on("click", function (e) {
    e.preventDefault();

    let i = $(this).index(); // 클릭한 메뉴의 순서 (0, 1, 2, 3)

    // 전체 6단계 애니메이션 중 내가 가야 할 지점을 정확한 비율(0 ~ 1 사이)로 계산
    // About Me(2번째 전환점) -> 2/6, Coding -> 3/6, Java -> 4/6, Design -> 5/6
    let targetPercent = (i + 2) / 6;

    let triggerInstance = ScrollTrigger.getById("mainTimeline");

    if (triggerInstance) {
      // 플러그인 충돌 없는 정석 계산법: 전체 가짜 스크롤 범위 내에서 픽셀 위치를 구합니다.
      let targetScrollPos =
        triggerInstance.start +
        (triggerInstance.end - triggerInstance.start) * targetPercent;

      // 브라우저의 진짜 스크롤바 위치를 강제로 밀어줍니다.
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

  //aboutMe
  $(function () {
    $("#aboutMe .card li").on("mouseenter", function () {
      $(this)
        .stop()
        .animate({ height: "150%" }, function () {
          $(this).find("img").stop().animate({ opacity: "1" });
        });
    });

    $("#aboutMe .card li").on("mouseleave", function () {
      $("#aboutMe .card img").stop().animate({ opacity: "0" });
      $("#aboutMe .card li").stop().animate({ height: "25%" });
    });
  });

  // coding
  let total = $(".panel li").length;
  let codingIndex = 0;

  function slide() {
    $(".panel")
      .stop()
      .animate({ "margin-left": codingIndex * -100 + "%" }, 500);

    $(".light li").removeClass("lights");
    $(".light li").eq(codingIndex).addClass("lights");
  }

  $(".next").on("click", function () {
    if (codingIndex == total - 1) {
      codingIndex = 0;
    } else {
      codingIndex++;
    }
    slide();
  });

  $(".prev").on("click", function () {
    if (codingIndex == 0) {
      codingIndex = total - 1;
    } else {
      codingIndex--;
    }
    slide();
  });

  $(".light li").on("click", function () {
    codingIndex = $(this).index();
    slide();
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
