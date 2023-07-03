<!-- DISABLED DIV TIME PICKER -->
window.addEventListener('load',
    function () {
        document.getElementById("timesPickers1-2CreationDates").classList.add("classDisabledDiv");
    }, false);

/*** ****************************** ***/

<!-- SCRIPT TIME TO INPUT -->
String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

$('#idSpanHrDebut').on('DOMSubtreeModified', changementHrMinInput);
$('#idSpanMinDebut').on('DOMSubtreeModified', changementHrMinInput);
$('#idSpanHrFin').on('DOMSubtreeModified', changementHrMinInput);
$('#idSpanMinFin').on('DOMSubtreeModified', changementHrMinInput);

$('#idInputTimePickerDateDebut').on('DOMSubtreeModified', changementHrMinInput);
$('#idInputTimePickerDateFin').on('DOMSubtreeModified', changementHrMinInput);

function changementHrMinInput () {
    let dateDebut = document.getElementById('idInputDateDebut').value;
    let dateFin = document.getElementById('idInputDateFin').value;

    /* HR et MIN Début */
    let heureMin = document.getElementById('idInputTimePickerDateDebut').innerText;

    dateDebut = dateDebut.replaceAt(11, heureMin.toString().charAt(0));
    dateDebut = dateDebut.replaceAt(12, heureMin.toString().charAt(1));
    dateDebut = dateDebut.replaceAt(14, heureMin.toString().charAt(3));
    dateDebut = dateDebut.replaceAt(15, heureMin.toString().charAt(4));

    document.getElementById('idInputDateDebut').value = dateDebut;

    /* HR et MIN Début 2 */
    let heureMin2 = document.getElementById('idInputTimePickerDateFin').innerText;

    dateFin = dateFin.replaceAt(11, heureMin2.toString().charAt(0));
    dateFin = dateFin.replaceAt(12, heureMin2.toString().charAt(1));
    dateFin = dateFin.replaceAt(11, heureMin2.toString().charAt(3));
    dateFin = dateFin.replaceAt(12, heureMin2.toString().charAt(4));

    document.getElementById('idInputDateFin').value = dateFin;
}