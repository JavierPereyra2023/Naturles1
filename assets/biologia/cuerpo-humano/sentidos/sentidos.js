(function () {
  var readingBar = document.getElementById("reading-bar");
  function updateReadingBar() {
    if (!readingBar) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    readingBar.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + "%";
  }
  window.addEventListener("scroll", updateReadingBar, { passive: true });
  updateReadingBar();

  var sections = Array.prototype.slice.call(document.querySelectorAll(".book-section"));
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll("[data-toc]"));
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: .08 });
    sections.forEach(function (section) {
      section.classList.add("reveal");
      revealObserver.observe(section);
    });

    var tocObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-22% 0px -68% 0px" });
    sections.forEach(function (section) { tocObserver.observe(section); });
  } else {
    sections.forEach(function (section) { section.classList.add("visible"); });
  }

  var quiz = document.getElementById("sense-quiz");
  var quizResult = document.getElementById("quiz-result");
  var quizButton = document.getElementById("quiz-check");
  var questions = window.SENSE_QUIZ || [];
  var selected = {};
  if (quiz && questions.length) {
    questions.forEach(function (item, index) {
      var article = document.createElement("article");
      article.className = "content-card p-5";
      article.innerHTML = '<p class="font-heading text-lg font-semibold text-white mb-4">' + (index + 1) + ". " + item.q + '</p><div class="grid gap-2"></div>';
      var options = article.querySelector("div");
      item.o.forEach(function (option, optionIndex) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-option";
        button.textContent = option;
        button.addEventListener("click", function () {
          selected[index] = optionIndex;
          Array.prototype.forEach.call(options.children, function (child, childIndex) {
            child.classList.toggle("selected", childIndex === optionIndex);
          });
        });
        options.appendChild(button);
      });
      quiz.appendChild(article);
    });
  }
  if (quizButton) {
    quizButton.addEventListener("click", function () {
      var score = 0;
      questions.forEach(function (item, index) {
        var article = quiz.children[index];
        Array.prototype.forEach.call(article.querySelectorAll(".quiz-option"), function (button, optionIndex) {
          button.classList.remove("selected");
          if (optionIndex === item.a) button.classList.add("correct");
          if (selected[index] === optionIndex && optionIndex !== item.a) button.classList.add("wrong");
        });
        if (selected[index] === item.a) score += 1;
      });
      quizResult.classList.remove("hidden");
      quizResult.textContent = "Resultado: " + score + " de " + questions.length + ". " +
        (score === questions.length ? "¡Excelente! Comprendiste el recorrido sensorial." :
          score >= Math.ceil(questions.length / 2) ? "Muy bien. Revisá las respuestas marcadas en rojo." :
            "Volvé a leer las secciones y probá nuevamente.");
    });
  }
})();
