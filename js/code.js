"use strict";
let frm = document.getElementById("fcn-form");
frm.addEventListener("change", calculate);
function calculate() {
    let els = document.querySelectorAll("[value]");
    let score = 0;
    let pedalValue = 0;
    let pedalAdjustment = false;
    for (let el of els) {
        let val = parseInt(el.value);
        switch (el.tagName) {
            case "OPTION":
                if (!el.selected) {
                    continue;
                }
                pedalAdjustment = (el.value >= 2 && el.value <= 8);
                break;
            case "INPUT":
                if (el.type === "number") {
                    break;
                }
                if ((el.type !== "radio" && el.type !== "checkbox") || !el.checked) {
                    continue;
                }
                if (el.name === "rb-pedals") {
                    pedalValue = val;
                    continue;
                }
        }
        score += val;
    }
    if (pedalAdjustment) {
        score += pedalValue;
    }
    document.getElementById("output").textContent = score;
    makeBadge(score);
}
calculate();

document.getElementById("btn-reset").addEventListener("click", e => {
    frm.reset();
    document.getElementById("output").textContent = 0;
});

function makeBadge(score) {
    let canvas = document.getElementById('badge'),
            ctx = canvas.getContext('2d'),
            image;

    let link = document.getElementById('downloadLink');
    link.download = "fcn.png";
    ctx.beginPath();
    ctx.rect(0, 0, 372, 218);
    ctx.fillStyle = "#093";
    ctx.fill();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#000";
    ctx.font = "72px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.fillText("FCN", 20, 190);
    let bikeImage = new Image();
    bikeImage.onload = () => {
        ctx.shadowColor = "#000";
        ctx.drawImage(bikeImage, 20, 30);
        image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        link.href = image;
    };
    bikeImage.src = 'images/bike.svg';
    ctx.shadowColor = "#fff";
    ctx.fillStyle = "#000";
    ctx.font = "236px Comic Sans MS";
    ctx.fillText(score, 189, 195, 170);
}