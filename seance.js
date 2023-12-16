$(document).ready(function () {
    let invitationInfo = {};

    function drawHair(ctx, startpos) {
        ctx.beginPath();
        ctx.arc(startpos.x, startpos.y, 50, 0, Math.PI * 2, true);
        ctx.fill();
        if (invitationInfo.hairLength == "long") {
            ctx.beginPath();
            ctx.moveTo(startpos.x - 50, startpos.y);
            ctx.lineTo(startpos.x - 75, startpos.y + 120);
            ctx.lineTo(startpos.x + 75, startpos.y + 120);
            ctx.lineTo(startpos.x + 50, startpos.y);
            ctx.fill();
        } else if (invitationInfo.hairLength == "mid") {
            ctx.beginPath();
            ctx.moveTo(startpos.x - 50, startpos.y);
            ctx.lineTo(startpos.x - 60, startpos.y + 60);
            ctx.lineTo(startpos.x + 60, startpos.y + 60);
            ctx.lineTo(startpos.x + 50, startpos.y);
            ctx.fill();
        }
    }
    $("#invitation-button").click(function (e) {
        //Don't do default operations
        e.preventDefault();

        const CANVAS_WIDTH = 500;
        const CANVAS_HEIGHT = 300;

        // Reading values from form inputs
        invitationInfo.name = $("#nameInput").val();
        invitationInfo.birthday = $("#birthdayInput").val();
        invitationInfo.seanceType = $("#seanceTypeInput").val();
        invitationInfo.hairColor = $("#hairColorPicker").val();
        invitationInfo.eyeColor = $("#eyeColorPicker").val();
        invitationInfo.skinColor = $("#skinColorPicker").val();
        invitationInfo.motivation = $("#motivationInput").val();
        invitationInfo.hairLength = $("input[name='hairLength']:checked").val();
        invitationInfo.acceptCheck = $("#acceptCheck").is(":checked");

        let startpos = { "x": 110, "y": 100 }
        let canvas = document.createElement("canvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext("2d");

        const backgroundImage = new Image();
        backgroundImage.src = "resources/backdrop.jpg";
        backgroundImage.width = CANVAS_WIDTH;
        backgroundImage.height = CANVAS_HEIGHT;
        backgroundImage.addEventListener(
            "load",
            () => {
                ctx.drawImage(backgroundImage, 0, 0);

                ctx.fillStyle = "rgba(255,255,255,0.4)";
                ctx.fillRect(20, 20, CANVAS_WIDTH-40, CANVAS_HEIGHT-40);

                ctx.fillStyle = invitationInfo.hairColor;
                drawHair(ctx, startpos);

                //Clothes
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.moveTo(startpos.x, startpos.y + 30);
                ctx.lineTo(startpos.x + 80, startpos.y + 150);
                ctx.lineTo(startpos.x - 80, startpos.y + 150);
                ctx.fill();

                //Face
                ctx.fillStyle = invitationInfo.skinColor;
                ctx.beginPath();
                ctx.arc(startpos.x, startpos.y + 10, 45, 0, Math.PI * 2, true);
                ctx.fill();

                //Eyes
                ctx.fillStyle = invitationInfo.eyeColor;
                ctx.beginPath();
                ctx.arc(startpos.x - 15, startpos.y, 5, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(startpos.x + 15, startpos.y, 5, 0, Math.PI * 2, true);
                ctx.fill();

                //Mouth
                ctx.fillStyle = "#000000";
                ctx.beginPath();
                ctx.arc(startpos.x, startpos.y + 10, 25, 4 * Math.PI / 6, 2 * Math.PI / 6, true);
                ctx.stroke();

                //Text
                //ctx.fillStyle ="#ffffff";
                ctx.font = "35px serif";
                ctx.fillText("VARÁZSDOBOZ", startpos.x + 85, startpos.y - 10);
                ctx.font = "25px serif";
                ctx.fillText("Meghívó:", startpos.x + 85, startpos.y + 30);
                ctx.fillText(invitationInfo.seanceType, startpos.x + 85, startpos.y + 60);
                ctx.font = "20px serif";
                ctx.fillText(invitationInfo.name, startpos.x + 85, startpos.y + 90);
                ctx.font = "15px serif";
                ctx.fillText("Szül: " + invitationInfo.birthday, startpos.x + 85, startpos.y + 140);



                $("#invitation").empty();
                $("#invitation").append(canvas);
            },
            false,
        );



        // Displaying values (you can modify this part based on your needs)
        console.log("Name:", invitationInfo.name);
        console.log("Birthday:", invitationInfo.birthday);
        console.log("Seance Type:", invitationInfo.seanceType);
        console.log("Hair Color:", invitationInfo.hairColor);
        console.log("Eye Color:", invitationInfo.eyeColor);
        console.log("Skin Color:", invitationInfo.skinColor);
        console.log("Motivation:", invitationInfo.motivation);
        console.log("Hair Length:", invitationInfo.hairLength);
        console.log("Accept Check:", invitationInfo.acceptCheck);

        // You can perform further actions with the collected data here
    });
});