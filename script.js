/* =========================================================
   NovaScaleads — script.js
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");


  /* =======================================================
     STICKY NAVBAR
     ======================================================= */

  function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 12) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  updateNavbar();


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;

    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  function toggleMobileMenu(event) {
    event.stopPropagation();

    if (!mobileMenu || !hamburger) return;

    const isOpen = mobileMenu.classList.toggle("open");

    hamburger.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  }

  if (hamburger) {
    hamburger.addEventListener(
      "click",
      toggleMobileMenu
    );
  }


  /* =======================================================
     CLOSE MOBILE MENU ON OUTSIDE CLICK
     ======================================================= */

  document.addEventListener("click", function (event) {

    if (!navbar || !mobileMenu) return;

    if (!navbar.contains(event.target)) {
      closeMobileMenu();
    }

  });


  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (anchor) {

      anchor.addEventListener(
        "click",
        function (event) {

          const targetId =
            this.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(targetId);

          if (!target) return;

          event.preventDefault();

          const navHeight =
            navbar ? navbar.offsetHeight : 0;

          const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            navHeight -
            14;

          window.scrollTo({
            top: Math.max(targetTop, 0),
            behavior: "smooth"
          });

          closeMobileMenu();

        }
      );

    });


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    document
      .querySelectorAll(".reveal")
      .forEach(function (element) {
        element.classList.add("visible");
      });

  } else {

    const revealElements =
      document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

      const revealObserver =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(function (entry) {

              if (entry.isIntersecting) {

                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            });

          },
          {
            threshold: 0.12,
            rootMargin:
              "0px 0px -40px 0px"
          }
        );


      revealElements.forEach(function (element) {
        revealObserver.observe(element);
      });

    } else {

      revealElements.forEach(function (element) {
        element.classList.add("visible");
      });

    }

  }


  /* =======================================================
     COUNT UP
     ======================================================= */

  function animateValue(
    element,
    start,
    end,
    duration,
    suffix,
    prefix
  ) {

    const startTime =
      performance.now();

    function update(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      const value =
        Math.round(
          start +
          (end - start) *
          eased
        );

      element.textContent =
        (prefix || "") +
        value.toLocaleString() +
        (suffix || "");

      if (progress < 1) {
        requestAnimationFrame(update);
      }

    }

    requestAnimationFrame(update);
  }


  /* =======================================================
     HERO STAT OBSERVER
     ======================================================= */

  const heroStats =
    document.querySelector(".hero-stats");


  if (
    heroStats &&
    !prefersReducedMotion &&
    "IntersectionObserver" in window
  ) {

    let countUpDone = false;

    const statsObserver =
      new IntersectionObserver(
        function (entries) {

          if (
            entries[0].isIntersecting &&
            !countUpDone
          ) {

            countUpDone = true;

            const statNumbers =
              document.querySelectorAll(
                ".stat-num"
              );

            if (statNumbers[0]) {

              animateValue(
                statNumbers[0],
                0,
                4151,
                1500,
                "%",
                "+"
              );

            }

            statsObserver.disconnect();
          }

        },
        {
          threshold: 0.35
        }
      );

    statsObserver.observe(heroStats);

  }

})();
