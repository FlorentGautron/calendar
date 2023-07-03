<!--  CHARGEMENT TIME PICKER -->
$(document).ready(function () {
    when_doc_ready()

});
function when_doc_ready(){
    chargementTimerPickerSimple( '08:00', '18:00', '00:00',  '23:59');

    /*  DEFAUT INPUT DATEDEBUT ET DATEFIN */
    document.getElementById('idInputDateDebut').value = "jj-mm-YYYY";
    document.getElementById('idInputDateFin').value = "jj-mm-YYYY";
}

let inputTimePickerDateDebut = document.getElementById('idInputTimePickerDateDebut');
let inputTimePickerDateFin = document.getElementById('idInputTimePickerDateFin');

let spanTimePickerDateDebut = document.getElementById('idSpanTimePickerDateDebut');
let spanTimePickerDateFin = document.getElementById('idSpanTimePickerDateFin');

function chargementTimerPickerSimple(timeDebutDefault, timeFinDefault, timeMinimumDebut, timeMaximumFin ) {
    // MAX ET MIN
    inputTimePickerDateDebut.min = timeMinimumDebut;
    inputTimePickerDateFin.max = timeMaximumFin;

    // default value
    inputTimePickerDateDebut.value = timeDebutDefault;
    inputTimePickerDateFin.value = timeFinDefault;

    if(timeMinimumDebut === '0:0' || timeMinimumDebut === '00:00' ){
        spanTimePickerDateDebut.innerText = '';
    } else {
        spanTimePickerDateDebut.innerText = 'Minimum : '+timeMinimumDebut;
    }
    if(timeMaximumFin !== '23:59'){
        spanTimePickerDateFin.innerText = 'Maximum : '+timeMaximumFin;
    } else {
        spanTimePickerDateFin.innerText = '';
    }
}

inputTimePickerDateDebut.addEventListener('change', function () {
    const div =  document.querySelector('.active-a');
    if( div.classList.contains('active-b') ){
        inputTimePickerDateFin.min = inputTimePickerDateDebut.value;
        spanTimePickerDateFin.innerText = 'Minimum : '+inputTimePickerDateDebut.value;
    }
}, false);

inputTimePickerDateFin.addEventListener('change', function () {
    const div =  document.querySelector('.active-a');
    if( div.classList.contains('active-b') ){
        inputTimePickerDateDebut.max = inputTimePickerDateFin.value;
        inputTimePickerDateDebut.innerText = 'Maximum : '+inputTimePickerDateFin.value;
    }
}, false);


