// ==========================================================
// NOVASCALEADS — PREMIUM INTERACTIONS
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================================
     YEAR
     ======================================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ========================================================
     REDUCED MOTION
     ======================================================== */

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* ========================================================
     MOBILE NAV
     ======================================================== */

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* ========================================================
     NAV SCROLL EFFECT
     ======================================================== */

  const nav = document.getElementById("nav");

  function updateNav() {

    if (!nav) return;

    if (window.scrollY > 30) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

  }

  updateNav();

  window.addEventListener(
    "scroll",
    updateNav,
    { passive: true }
  );


  /* ========================================================
     SCROLL REVEAL
     ======================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (!prefersReducedMotion) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: .12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* ========================================================
     PROOF NUMBER COUNTER
     ======================================================== */

  const statNums =
    document.querySelectorAll(".proof-num");

  function animateCount(element) {

    const target =
      parseFloat(element.dataset.target || "0");

    const prefix =
      element.dataset.prefix || "";

    const suffix =
      element.dataset.suffix || "";

    const decimals =
      parseInt(
        element.dataset.decimals || "0",
        10
      );


    if (prefersReducedMotion) {

      element.textContent =
        prefix +
        target.toFixed(decimals) +
        suffix;

      return;

    }


    const duration = 1400;
    const startTime = performance.now();


    function tick(now) {

      const progress =
        Math.min(
          (now - startTime) / duration,
          1
        );


      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      const current =
        target * eased;


      element.textContent =
        prefix +
        current.toFixed(decimals) +
        suffix;


      if (progress < 1) {

        requestAnimationFrame(tick);

      }

    }


    requestAnimationFrame(tick);

  }


  if (statNums.length) {

    const statObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateCount(entry.target);

            statObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: .4
        }
      );


    statNums.forEach(element => {

      statObserver.observe(element);

    });

  }


  /* ========================================================
     PREMIUM 3D TILT
     ======================================================== */

  const tiltCards =
    document.querySelectorAll(".tilt-card");


  if (
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    tiltCards.forEach(card => {

      let frame = null;


      card.addEventListener(
        "mousemove",
        event => {

          if (frame) {
            cancelAnimationFrame(frame);
          }


          frame =
            requestAnimationFrame(() => {

              const rect =
                card.getBoundingClientRect();


              const x =
                event.clientX -
                rect.left;

              const y =
                event.clientY -
                rect.top;


              const centerX =
                rect.width / 2;

              const centerY =
                rect.height / 2;


              const rotateX =
                ((y - centerY) /
                  centerY) *
                -4;


              const rotateY =
                ((x - centerX) /
                  centerX) *
                5;


              card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;

            });

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

        }
      );

    });

  }


  /* ========================================================
     HERO PARALLAX
     ======================================================== */

  const heroVisual =
    document.querySelector(".hero-visual");


  if (
    heroVisual &&
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    let frame = null;


    heroVisual.addEventListener(
      "mousemove",
      event => {

        if (frame) {
          cancelAnimationFrame(frame);
        }


        frame =
          requestAnimationFrame(() => {

            const rect =
              heroVisual.getBoundingClientRect();


            const x =
              (event.clientX -
                rect.left) /
              rect.width -
              .5;


            const y =
              (event.clientY -
                rect.top) /
              rect.height -
              .5;


            const dashboard =
              heroVisual.querySelector(
                ".dashboard-card"
              );


            const orb =
              heroVisual.querySelector(
                ".orb-main"
              );


            const ring =
              heroVisual.querySelector(
                ".ring-one"
              );


            if (dashboard) {

              dashboard.style.transform =
                `perspective(1200px)
                 rotateX(${y * -7}deg)
                 rotateY(${x * 9}deg)
                 translateZ(15px)`;

            }


            if (orb) {

              orb.style.transform =
                `translate(${x * 20}px, ${y * 20}px)`;

            }


            if (ring) {

              ring.style.marginLeft =
                `${x * 12}px`;

              ring.style.marginTop =
                `${y * 12}px`;

            }

          });

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        const dashboard =
          heroVisual.querySelector(
            ".dashboard-card"
          );


        const orb =
          heroVisual.querySelector(
            ".orb-main"
          );


        if (dashboard) {

          dashboard.style.transform =
            "";

        }


        if (orb) {

          orb.style.transform =
            "";

        }

      }
    );

  }


  /* ========================================================
     MAGNETIC BUTTONS
     ======================================================== */

  const magneticButtons =
    document.querySelectorAll(".magnetic");


  if (
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    magneticButtons.forEach(button => {

      button.addEventListener(
        "mousemove",
        event => {

          const rect =
            button.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left -
            rect.width / 2;


          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          button.style.transform =
            `translate(${x * .08}px, ${y * .08}px)`;

        }
      );


      button.addEventListener(
        "mouseleave",
        () => {

          button.style.transform = "";

        }
      );

    });

  }


  /* ========================================================
     FORM
     ======================================================== */

  const leadForm =
    document.getElementById("leadForm");

  const formNote =
    document.getElementById("formNote");


  if (leadForm) {

    leadForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const name =
          document
            .getElementById("name")
            .value
            .trim();


        const brokerage =
          document
            .getElementById("brokerage")
            .value
            .trim();


        const email =
          document
            .getElementById("email")
            .value
            .trim();


        const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
          !name ||
          !brokerage ||
          !emailPattern.test(email)
        ) {

          formNote.textContent =
            "Please fill in your name, brokerage, and a valid email.";

          formNote.style.color =
            "#D6472B";

          return;

        }


        /*
          IMPORTANT:

          This is still FRONT-END ONLY.

          Before launching the website,
          connect this form to your CRM,
          email service, webhook or backend.

          Example:
          fetch("/api/leads", {
            method: "POST",
            body: new FormData(leadForm)
          });
        */


        formNote.textContent =
          "Thanks — we'll be in touch within one business day.";

        formNote.style.color =
          "#178A48";


        leadForm.reset();

      }
    );

  }

});
