$(document).ready(function () {

    var correctAnswers = 0;
    var wrongAnswers = 0;


    var count = 60;

    var counter = setInterval(timer, 1000);


 
    function timer() {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);
            
            return;
        }

        $("#timer").text(count);
    }
    window.onload = function () {
        $("#start").on("click", timer);
    };





























    $("#start").on("click", function () {
        $(".container").hide();
        $(".Game").show();
        $(".Timer").show();
        $("header").show();


    })

    $("#submit").on("click", function () {
        $(".results").show();
        $(".container").hide();
        $(".Game").hide();
        $(".Timer").hide();
        $("header").hide();
    })



})
