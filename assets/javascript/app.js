var card = $("#quiz-area");
var countStartNumber = 30;

var questions = [
  //#1
  {
    question: "Which MLB team has the most World Series wins?",
    answers: [
      "New York Yankees",
      "Boston Redsox",
      "Houston Astros",
      "Chicago Cubs"
    ],
    correctAnswer: "New York Yankees",
    image: "assets/images/yankees.gif"
  },
  {
    //#2
    question: "Which NFL Teams has the most Super Bowl wins?",
    answers: [
      "Miami Dolphins",
      "Dallas Cowboys",
      "New York Giants",
      "New England Patriots"
    ],
    correctAnswer: "New England Patriots",
    image: "assets/images/patriots.gif"
  },
  {
    //#3
    question:
      " Which baseball player holds the record for the most homeruns hit in a career?",
    answers: ["Barry Bonds", "Babe Ruth", "Derek Jeter", "Hank Aaron"],
    correctAnswer: "Barry Bonds",
    image: "assets/images/barryBonds.gif "
  },
  {
    //#4
    question: "Which NBA player listed below, has won the most Championships?",
    answers: ["Lebron James", "Kobe Bryant ", "Steph Curry", "Michael Jordan"],
    correctAnswer: "Michael Jordan",
    image: " assets/images/MikeJordan.gif"
  },
  {
    //#5
    question: "Which NBA team has won the most championships?",
    answers: [
      "Chicago Bulls",
      "Miami Heat",
      "Boston Celtics",
      "Los Angeles Lakers"
    ],
    correctAnswer: "Boston Celtics",
    image: "assets/images/BostonCeltics.gif "
  },
  {
    //#6
    question: "Who holds the record for the most passing yards in NFL histroy?",
    answers: ["Dan Marino", "Eli Manning", "Tom Brady", "Drew Brees"],
    correctAnswer: "Drew Brees",
    image: "assets/images/Brees.gif"
  },
  {//#7
    question: "Who's nickname is 'Mr.November' ?",
    answers: ["Derek Jeter", "Kevin Durant", "Tom Brady", "Alex Rodriguez"],
    correctAnswer: "Derek Jeter",
    image: "assets/images/Jeter.gif"
  },
  {//#8
    question: "Which player is on the NBA logo?",
    answers: ["Yao Ming", "Michael Jordan", "Jerry West", "Lebron James"],
    correctAnswer: "Jerry West",
    image: "assets/images/West.gif"
  },
  {//#9
    question: "Which NFL runningback holds the record for the most rushing touchdowns in a season?",
    answers: ["Emmitt Smith", "LaDainian Tomlinson", "Adrian Peterson", "Ezekiel Elliot"],
    correctAnswer: "LaDainian Tomlinson",
    image: "assets/images/LT.gif"
  },
  {//#10
    question: "Which NBA player scored 100 points in a game?",
    answers: ["Wilt Chamberlain", "Shaquille O'Neal", "Lebron James", "Kobe Bryant"],
    correctAnswer: "Wilt Chamberlain",
    image: "assets/images/Wilt.gif"
  }
];

// Variable to hold our setInterval
var timer;

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {
    timer = setInterval(this.countdown.bind(this), 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append(
        "<button class='answer-button' id='button' data-name='" +
          questions[this.currentQuestion].answers[i] +
          "'>" +
          questions[this.currentQuestion].answers[i] +
          "</button>"
      );
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {
    clearInterval(window.timer);

    $("#counter-number").text(this.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append(
      "<h3>The Correct Answer was: " +
        questions[this.currentQuestion].correctAnswer
    );
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    } else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(window.timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(this.counter);

    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    card.append(
      "<h3>Unanswered: " +
        (questions.length - (this.incorrect + this.correct)) +
        "</h3>"
    );
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if (
      $(e.target).attr("data-name") ===
      questions[this.currentQuestion].correctAnswer
    ) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    this.incorrect++;

    clearInterval(window.timer);

    card.html("<h2>Nope!</h2>");
    card.append(
      "<h3>The Correct Answer was: " +
        questions[this.currentQuestion].correctAnswer +
        "</h3>"
    );
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    } else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {
    clearInterval(window.timer);

    this.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    } else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend(
    "<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>"
  );
  game.loadQuestion.bind(game)();
});
