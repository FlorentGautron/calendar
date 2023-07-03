/*** Position initiale du scrolle au millieu (8h - 19h) ***/

let closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.closest('.modal');
        modal.style.display = "none";
    }
});

/** clear pop up chargement **/
window.onclick = function (event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";

        /*** CLEAR DONNER DU POPUP  ***/
        $('.debut').remove();
        $('.fin').remove();
        $('.divWrapp > *').unwrap();

        for (let y = 1; y <= 23; y++) {
            document.getElementById('idLi' + y + 'Div').style.backgroundColor = '';
            document.getElementById('idLi' + y + 'Div').className = "classLiTime";
        }
    }
}
