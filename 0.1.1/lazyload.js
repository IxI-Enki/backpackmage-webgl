document.addEventListener("DOMContentLoaded", function () {
      var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazyload"));

      if ("IntersectionObserver" in window) {
            let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
                  entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                              let element = entry.target;
                              element.classList.remove("lazyload");
                              let bgImage = element.getAttribute('data-bg');
                              element.style.backgroundImage = `url('${bgImage}')`;
                              lazyBackgroundObserver.unobserve(element);
                        }
                  });
            });

            lazyBackgrounds.forEach(function (lazyBackground) {
                  lazyBackgroundObserver.observe(lazyBackground);
            });
      } else {
            // Fallback für Browser, die IntersectionObserver nicht unterstützen
            var lazyLoadFallback = function () {
                  lazyBackgrounds.forEach(function (lazyBackground) {
                        let bgImage = lazyBackground.getAttribute('data-bg');
                        lazyBackground.style.backgroundImage = `url('${bgImage}')`;
                        lazyBackground.classList.remove('lazyload');
                  });
            };

            // Lade Bilder, wenn die Seite geladen wird
            lazyLoadFallback();
      }
});
