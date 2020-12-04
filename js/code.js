"use strict";
let frm = document.getElementById("fcn-form");
        frm.addEventListener("change", calculate);
function calculate () {
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
}
calculate();
document.getElementById("btn-reset").addEventListener("click",e => { frm.reset(); calculate(); });