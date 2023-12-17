let divinations = [
    "<i>(a)</i> el fogja önt árulni. Ne szakítsa meg a kapcsolatukat, a megbocsátás mindkettejüket fel fogja szabadítani. A következő hónapban jobban teszi, ha kerüli <i>(b)</i>-t!",
    "A jövőjébe nagy vagyon lehetősége van írva, de ha <i>(a)</i> közelében marad, nincstelenül hal meg. <i>(b)</i> fontos hely lesz az életében.",
    "Ha kikapcsolódásra vágyik, <i>(b)</i> jó hely lehet erre, de ne maradjon sokáig! <i>(a)</i> hamarosan a segítségére fog szorulni.",
    "Ha nem dönt elhamarkodottan, <i>(a)</i> örökké hűséges társa maradhat. Egy közeli családtagjára veszély leselkedik, intse őt óva <i>(b)</i> meglátogatásától!"
]
$(document).ready(function () {
    $("#start-divination-button").click(function (e) {
        $(this).hide();
        $("#divination-area").show();
        $("li").animate({ marginLeft: "4.2rem" }, 1000);
        $(".ball").fadeIn("slow", function () { });
    });
    $(".cat").one("click", function (e) {
        $(this).css("--cur-left", $(this).css("margin-left"));
        $(this).css("--cur-top", $(this).css("margin-top"));
        $(this).addClass("caught");
        $(this).removeClass("cat");
        $("#divination-area").append($("<div class='divination-title'>Az Ön jóslata:</div><div class='divination-text'>" + divinations[Math.floor(Math.random() * divinations.length)] + "</div>"));
        setTimeout(function () {
            var el = $('#divination-area');
            curHeight = el.height();
            autoHeight = el.css('height', 'fit-content').height();
            el.height(curHeight).animate({ height: autoHeight+20 }, 1000);
        }, 2000);

    });
});