let invitationInfo = {};
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 300;
const PERSON_START_POS = { "x": 110, "y": 100 };
const BACKGROUND_IMAGE = "resources/media/background.jpg";

$(document).ready(function () {

    $("#invitation-button").click(function (e) {
        //Don't do default operations
        e.preventDefault();

        //Read form input
        invitationInfo.name = $("#nameInput").val();
        invitationInfo.birthday = $("#birthdayInput").val();
        invitationInfo.seanceType = $("#seanceTypeInput").val();
        invitationInfo.hairColor = $("#hairColorPicker").val();
        invitationInfo.eyeColor = $("#eyeColorPicker").val();
        invitationInfo.skinColor = $("#skinColorPicker").val();
        invitationInfo.motivation = $("#motivationInput").val();
        invitationInfo.hairLength = $("input[name='hairLength']:checked").val();
        invitationInfo.acceptCheck = $("#acceptCheck").is(":checked");

        //Validate form input and make invitation
        if(!validateInput()){
            return;
        }
        makeInvitation();
      
        //Reset accept field
        $("#acceptCheck").prop( "checked", false );
    });
});

function validateInput(){
    valid = true;

    if(invitationInfo.name == "" || invitationInfo.name === null){
        $("#name-error").show();
        $("#nameInput").addClass("is-invalid");
        valid = false;
    } else{
        $("#name-error").hide();
        $("#nameInput").removeClass("is-invalid");
    }

    birthDate = new Date(Date.parse(invitationInfo.birthday));
    today = new Date();
    birthDate.setFullYear(birthDate.getFullYear()+18);
    if( today < birthDate){
        $("#birthday-error").show();
        $("#birthdayInput").addClass("is-invalid");
        valid = false;
    } else{
        $("#birthdayInput").removeClass("is-invalid");
        $("#birthday-error").hide();
    }

    if(invitationInfo.motivation.length < 10 || invitationInfo.motivation === null){
        $("#motivation-error").show();
        $("#motivationInput").addClass("is-invalid");
        valid = false;
    } else{
        $("#motivationInput").removeClass("is-invalid");
        $("#motivation-error").hide();
    }

    if(!invitationInfo.acceptCheck){
        $("#accept-error").show();
        $("#acceptCheck").addClass("is-invalid");
        valid = false;
    } else{
        $("#acceptCheck").removeClass("is-invalid");
        $("#accept-error").hide();
    }

    return valid;

}

function makeInvitation() {
    let canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d");

    const backgroundImage = new Image();
    backgroundImage.src = BACKGROUND_IMAGE;
    backgroundImage.width = CANVAS_WIDTH;
    backgroundImage.height = CANVAS_HEIGHT;
    backgroundImage.addEventListener(
        "load",
        () => {
            //Background and base layer
            ctx.drawImage(backgroundImage, 0, 0);
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.fillRect(20, 20, CANVAS_WIDTH - 40, CANVAS_HEIGHT - 40);
            
            //Person
            drawPerson(ctx);

            //Text
            ctx.font = "35px serif";
            ctx.fillText("VARÁZSDOBOZ", PERSON_START_POS.x + 85, PERSON_START_POS.y - 10);
            ctx.font = "25px serif";
            ctx.fillText("Meghívó:", PERSON_START_POS.x + 85, PERSON_START_POS.y + 30);
            ctx.fillText(invitationInfo.seanceType, PERSON_START_POS.x + 85, PERSON_START_POS.y + 60);
            ctx.font = "20px serif";
            ctx.fillText(invitationInfo.name, PERSON_START_POS.x + 85, PERSON_START_POS.y + 90);
            ctx.font = "15px serif";
            ctx.fillText("Szül: " + invitationInfo.birthday, PERSON_START_POS.x + 85, PERSON_START_POS.y + 140);

            $("#invitation").empty();
            $("#invitation").append(canvas);
        },
        false,
    );
}

function drawPerson(ctx) {

    //Hair
    drawHair(ctx);

    //Clothes
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(PERSON_START_POS.x, PERSON_START_POS.y + 30);
    ctx.lineTo(PERSON_START_POS.x + 80, PERSON_START_POS.y + 150);
    ctx.lineTo(PERSON_START_POS.x - 80, PERSON_START_POS.y + 150);
    ctx.fill();

    //Face
    ctx.fillStyle = invitationInfo.skinColor;
    drawArc(ctx, PERSON_START_POS.x, PERSON_START_POS.y + 10, 45, 0, Math.PI * 2, true);

    //Eyes
    ctx.fillStyle = invitationInfo.eyeColor;
    drawArc(ctx, PERSON_START_POS.x - 15, PERSON_START_POS.y, 5, 0, Math.PI * 2, true);
    drawArc(ctx, PERSON_START_POS.x + 15, PERSON_START_POS.y, 5, 0, Math.PI * 2, true);

    //Mouth
    ctx.fillStyle = "#000000";
    drawArc(ctx, PERSON_START_POS.x, PERSON_START_POS.y + 10, 25, 4 * Math.PI / 6, 2 * Math.PI / 6, true);
}

function drawHair(ctx) {
    ctx.fillStyle = invitationInfo.hairColor;
    ctx.beginPath();
    ctx.arc(PERSON_START_POS.x, PERSON_START_POS.y, 50, 0, Math.PI * 2, true);
    ctx.fill();
    if (invitationInfo.hairLength == "long") {
        ctx.beginPath();
        ctx.moveTo(PERSON_START_POS.x - 50, PERSON_START_POS.y);
        ctx.lineTo(PERSON_START_POS.x - 75, PERSON_START_POS.y + 120);
        ctx.lineTo(PERSON_START_POS.x + 75, PERSON_START_POS.y + 120);
        ctx.lineTo(PERSON_START_POS.x + 50, PERSON_START_POS.y);
        ctx.fill();
    } else if (invitationInfo.hairLength == "mid") {
        ctx.beginPath();
        ctx.moveTo(PERSON_START_POS.x - 50, PERSON_START_POS.y);
        ctx.lineTo(PERSON_START_POS.x - 60, PERSON_START_POS.y + 60);
        ctx.lineTo(PERSON_START_POS.x + 60, PERSON_START_POS.y + 60);
        ctx.lineTo(PERSON_START_POS.x + 50, PERSON_START_POS.y);
        ctx.fill();
    }
}

function drawArc(ctx, startX, startY, radius, startAngle, endAngle, counterClockwise){
    ctx.beginPath();
    ctx.arc(startX, startY, radius, startAngle, endAngle, counterClockwise);
    ctx.fill();
}