let divinations = [
    "<i>(1)</i> el fogja önt árulni. Ne szakítsa meg a kapcsolatukat, a megbocsátás mindkettejüket fel fogja szabadítani. A következő hónapban jobban teszi, ha kerüli <i>(2)</i>-t!",
    "A jövőjébe nagy vagyon lehetősége van írva, de ha <i>(1)</i> közelében marad, nincstelenül hal meg. <i>(2)</i> fontos hely lesz az életében.",
    "Ha kikapcsolódásra vágyik, <i>(2)</i> jó hely lehet erre, de ne maradjon sokáig! <i>(1)</i> hamarosan a segítségére fog szorulni.",
    "Ha nem dönt elhamarkodottan, <i>(1)</i> örökké hűséges társa maradhat. Egy közeli családtagjára veszély leselkedik, intse őt óva <i>(2)</i> meglátogatásától!"
]
$(document).ready(function () {
    $("#start-divination-button").click(function (e) {
        $(this).hide();
        $("#divination-area").show();
        $("li").animate({ marginLeft: "4.2rem" }, 1000);
        $(".ball").fadeIn("slow", function () { });
    });
    $(".cat").click(function (e) {
        $(this).css("--cur-left", $(this).css("margin-left"));
        $(this).css("--cur-top", $(this).css("margin-top"));
        $(this).addClass("caught");
        $(this).removeClass("cat");
        $("#divination-area").append($("<div class='divination-title'>Az Ön jóslata:</div><div class='divination-text'>" + divinations[Math.floor(Math.random() * divinations.length)] + "</div>"));
        //$('#divination-area').css("height", "fit-content");
        setTimeout(function () {
            var el = $('#divination-area');
            curHeight = el.height();
            autoHeight = el.css('height', 'fit-content').height();
            el.height(curHeight).animate({ height: autoHeight+20 }, 1000);
        }, 2000);

    });
});