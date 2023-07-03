<!-- ------------------------------------------------------ SCRIPT RANGE PICKER ------------------------------------------- -->
let dragging = false;
let days = document.querySelectorAll('.day');
let offset = 0;

function activateDay () {
    let activeElement = document.activeElement;
    let activeAItem = document.querySelector('.active-a');
    let activeBItem = document.querySelector('.active-b');

    if (activeAItem && activeBItem) {
        clearActiveDays();
        clearRange();
        activeElement.classList.add('active-a');
        return;
    }
    if (activeAItem) activeElement.classList.add('active-b');
    else activeElement.classList.add('active-a');
}

function clearActiveDays () {
    let activeAItem = document.querySelector('.active-a');
    let activeBItem = document.querySelector('.active-b');

    if (activeAItem){
        activeAItem.classList.remove('active-a');
        activeAItem.classList.remove('active-b');
    }
    if (activeBItem){
        activeBItem.classList.remove('active-a');
        activeBItem.classList.remove('active-b');
    }

    /*** TRANSFORMATION TEXTE TIMES ET DÉSACTIVATION TIMER ***/
    document.getElementById('spanJourPourHeureDepart').innerText = '';
    document.getElementById('spanJourPourHeureFin').innerText = '';
    // RETIRER MSG LIMITE TEMPS
    document.getElementById('idSpanTimePickerDateDebut').innerText = '';
    document.getElementById('idSpanTimePickerDateFin').innerText = '';
    // REMETTRE HR DÉFAUT
    let spanInfo1 =  document.getElementById('idSpanTimePickerDateDebut');
    spanInfo1.value = '08:00';
    spanInfo1.min = '';
    spanInfo1.max = '';

    let spanInfo2 =  document.getElementById('idInputTimePickerDateFin');
    spanInfo2.value = '18:00';
    spanInfo2.min = '';
    spanInfo2.max = '';

    document.getElementById("timesPickers1-2CreationDates").classList.add("classDisabledDiv");
}

function clearRange () {
    days.forEach(item => {
        item.classList.remove('range');
        item.classList.remove('bgBorderRightRadiusSelect');
        item.classList.remove('bgBorderLeftRadiusSelect');
    });
}

function calculateRange () {
    let i;
    let activeAIndex, activeBIndex, nameMonthA, nameMonthB;

    function calculeNomMonth () {
        /*** RECUPERATION INDEX && le NOM de CHAQUE MOIS  ***/
        days.forEach((item, index) => {
            let id_item_parent = item.parentElement.parentElement.id;
            let id = id_item_parent.replace('divCalendrier', '');
            id = id.replace('CreationDates', '');
            id = parseInt(id);

            if (item.classList.contains('active-a')) {
                activeAIndex = index;
                nameMonthA = document.getElementById('titreCalendarDate'+id).innerText; // PB ici cas décroissant
            }
            if (item.classList.contains('active-b')) {
                activeBIndex = index;
                nameMonthB = document.getElementById('titreCalendarDate'+id).innerText; // PB ici cas décroissant
            }

        });
    }

    calculeNomMonth();

    /*** Activation CLASS pour CSS lors de la selection : ORDRE CROISSANT ***/
    if (activeAIndex < activeBIndex) {
        for (i = activeAIndex; i <= activeBIndex; i++) {
            if (!days[i].classList.contains('dayBook') && i > activeAIndex || days[i].classList.contains('dayBook') && activeBIndex === i && !days[i].classList.contains('bgBorderLeftRadius')) {
                days[i].classList.add('range');
            } else {
                days.forEach(item => {
                    if (!item.classList.contains('active-b')) {
                        item.classList.remove('range');
                        item.classList.remove('active-a');
                        item.classList.remove('bgBorderRightRadiusSelect')
                    }
                });
                if (!days[i].classList.contains('dayOff')) {
                    days[i].classList.add('active-a');
                }
            }
        }
    }

    /*** Activation CLASS pour CSS lors de la selection : ORDRE DÉCROISSANT ***/          // TODO ICI POURLE PROBLEME SENS
    if (activeAIndex > activeBIndex) {
        for (i = activeAIndex; i >= activeBIndex; i--) {
            if (!days[i].classList.contains('dayBook') && i < activeAIndex || days[i].classList.contains('dayBook') && activeBIndex === i && !days[i].classList.contains('bgBorderRightRadius')) {
                days[i].classList.add('range');
            } else {
                days.forEach(item => {
                    if (!item.classList.contains('active-b')) {
                        item.classList.remove('range');
                        item.classList.remove('active-a');
                    }
                });
                if (!days[i].classList.contains('dayOff')) {
                    days[i].classList.add('active-a');
                }
            }
        }
    }

    /*** APPLICATION RADIUS SELECTION ***/
    days.forEach(item => {
        if (activeAIndex < activeBIndex) {
            if (item.classList.contains('active-a')) {
                item.classList.add('bgBorderRightRadiusSelect');
            }
            if (item.classList.contains('active-b')) {
                item.classList.add('bgBorderLeftRadiusSelect');
            }
        }
        if (activeAIndex > activeBIndex) {
            if (item.classList.contains('active-a')) {
                item.classList.add('bgBorderLeftRadiusSelect');
            }
            if (item.classList.contains('active-b')) {
                item.classList.add('bgBorderRightRadiusSelect');
            }
        }
    });

    // RE-CALCULE MOIS & ANNÉE Après possible Modification
    calculeNomMonth();

    // TRANSMISSION DATE AU HEURE
    if (document.querySelector('.active-b') != null) {
        function transmitionAuHeure (integer) {
            // TRANSMISSION AU HEURE
            if (integer === 1) {
                document.getElementById('spanJourPourHeureDepart').innerText = '(Pour le ' + document.querySelector('.active-a span').innerText + ' ' + nameMonthA + ') ';
                document.getElementById('spanJourPourHeureFin').innerText = '(Pour le ' + document.querySelector('.active-b span').innerText + ' ' + nameMonthB + ') ';
            }
            if (integer === 2) {
                document.getElementById('spanJourPourHeureFin').innerText = '(Pour le ' + document.querySelector('.active-a span').innerText + ' ' + nameMonthA + ') ';
                document.getElementById('spanJourPourHeureDepart').innerText = '(Pour le ' + document.querySelector('.active-b span').innerText + ' ' + nameMonthB + ') ';
            }
            document.getElementById("timesPickers1-2CreationDates").classList.remove("classDisabledDiv");

            changeJourInput();
            changementHrMinInput();
        }

        if (activeAIndex < activeBIndex) {
            transmitionAuHeure(1);
        }
        if (activeAIndex > activeBIndex) {
            transmitionAuHeure(2);
        }

        // RAJOUTER CONDITION SI ACTIVE-A CONTAINS dayBook ...
        // OU RAJOUTER LIMITE TEMPS ??????
        if (parseInt(activeAIndex) === parseInt(activeBIndex) && !document.querySelector('.active-a').classList.contains('dayBook')) {
            transmitionAuHeure(1);
        }

        let active1, active2, active1Span, active2Span;               // ==> BOOLEEAN
        if (activeAIndex < activeBIndex) {
            active1 = document.querySelector('.active-a').classList.contains('dayBook');
            active2 = document.querySelector('.active-b').classList.contains('dayBook');
            active1Span = document.querySelector('.active-a span').innerText;
            active2Span = document.querySelector('.active-b span').innerText;
        }
        if (activeAIndex > activeBIndex) {
            active1 = document.querySelector('.active-b').classList.contains('dayBook');
            active2 = document.querySelector('.active-a').classList.contains('dayBook');
            active1Span = document.querySelector('.active-b span').innerText;
            active2Span = document.querySelector('.active-a span').innerText;
        }

        /*** MEME Jour -- SANS Dotations ***/
        if (parseInt(activeAIndex) === parseInt(activeBIndex) && !document.querySelector('.active-a').classList.contains('dayBook')) {
            active1 = document.querySelector('.active-a').classList.contains('dayBook');
            active2 = document.querySelector('.active-b').classList.contains('dayBook');
            active1Span = document.querySelector('.active-a span').innerText;
            active2Span = document.querySelector('.active-b span').innerText;
        }

        /*** MEME Jour --- AVEC Dotations ==> POP-UP ***/
        if (parseInt(activeAIndex) === parseInt(activeBIndex) && document.querySelector('.active-a').classList.contains('dayBook')) {

        }

        limiteTemps(active1, active2, active1Span, active2Span);

        function limiteTemps (active1, active2, active1Span, active2Span) {
            //  LIMITE TIME
            // SI Active-a OU Active-B et sur un jour avec DOTATION
            let heure, min;
            // Variable pour vérification dates plus Grande
            if (active1 || active2) {
                //      CAS SELECT A -> DOTATION && B -> LIBRE
                if (active1 && !active2) {
                    let nomMoisA = '';
                    let annee = '';
                    for (i = 0; i < nameMonthA.length - 5; i++) {
                        nomMoisA += nameMonthA.charAt(i);
                    }
                    for (i = nameMonthA.length - 4; i < nameMonthA.length; i++) {
                        annee += nameMonthA.charAt(i);
                    }
                    let numMoisA = cal_months_labels.indexOf(nomMoisA) + 1;

                    // REGARDER POUR RECUPERER HEURE DE LA DATE MEME JOUR
                    for (let i = 0; i < dates.length; i++) {
                        if (parseInt(annee, 10) === parseInt(dates[i].dateFin_y, 10) && parseInt(numMoisA, 10) === parseInt(dates[i].dateFin_m, 10) && parseInt(active1Span, 10) === parseInt(dates[i].dateFin_d, 10)) {
                            // Conserver Heure la plus Grande
                            if (!heure) {
                                heure = dates[i].dateFin_h;
                                min = dates[i].dateFin_i;
                            } else {
                                if (heure < dates[i].dateFin_h) {
                                    heure = dates[i].dateFin_h;
                                    min = dates[i].dateFin_i;
                                }
                                if (parseInt(heure, 10) === parseInt(dates[i].dateFin_h, 10)) {
                                    if (min < dates[i].dateFin_i) {
                                        min = dates[i].dateFin_i;
                                    }
                                }
                            }
                        }
                    }
                    // Modifier heure défaut
                    let heureDefaut = 8;
                    let minuteDefaut = 0;

                    if( heureDefaut < heure){
                        heureDefaut = heure;
                        if(minuteDefaut < min){
                            minuteDefaut = min;
                        }
                    }
                    // Format de l'heure par défaut
                    if(heure.toString().length < 2){
                        heure = '0'+heure;
                    }
                    if(min.toString().length < 2){
                        min = '0'+min;
                    }
                    if(heureDefaut.toString().length < 2){
                        heureDefaut = '0'+heureDefaut;
                    }
                    if(minuteDefaut.toString().length < 2){
                        minuteDefaut = '0'+minuteDefaut;
                    }
                    //      CAS SELECT A -> DOTATION         &&            B -> LIBRE
                    chargementTimerPickerSimple( heureDefaut+':'+minuteDefaut , '18:00', heure+':'+min, '23:59' );
                }
                /*** CAS SELECT B -> DOTATION  &&  A -> LIBRE ***/
                if (active2 && !active1) {
                    let nomMoisB = '';
                    let anneeB = '';
                    for (i = 0; i < nameMonthB.length - 5; i++) {
                        nomMoisB += nameMonthB.charAt(i);
                    }
                    for (i = nameMonthB.length - 4; i < nameMonthB.length; i++) {
                        anneeB += nameMonthB.charAt(i);
                    }
                    let numMoisB = cal_months_labels.indexOf(nomMoisB) + 1;

                    /*** REGARDER POUR RÉCUPERER HEURE DE LA DATE MEME JOUR ***/

                    for (let i = 0; i < dates.length; i++) {
                        if (parseInt(anneeB) === parseInt(dates[i].dateDebut_y) && parseInt(numMoisB) === parseInt(dates[i].dateDebut_m) && parseInt(active2Span) === parseInt(dates[i].dateDebut_d)) {
                            /*** Conserver Heure la plus Grande ***/
                            if (!heure) {
                                heure = dates[i].dateDebut_h;
                                min = dates[i].dateDebut_i;
                            } else {
                                if (heure < dates[i].dateDebut_h) {
                                    heure = dates[i].dateDebut_h;
                                    min = dates[i].dateDebut_i;
                                }
                                if (parseInt(heure) === parseInt(dates[i].dateDebut_h)) {
                                    if (min < dates[i].dateDebut_i) {
                                        min = dates[i].dateDebut_h;
                                    }
                                }
                            }
                        }
                    }
                    // Modifier heure défaut
                    let heureDefaut = 18;
                    let minuteDefaut = 0;
                    if( heureDefaut > heure){
                        heureDefaut = heure;
                        if(minuteDefaut > min){
                            minuteDefaut = min;
                        }
                    }
                    // Format de l'heure par défaut
                    if(heure.toString().length < 2){
                        heure = '0'+heure;
                    }
                    if(min.toString().length < 2){
                        min = '0'+min;
                    }
                    if(heureDefaut.toString().length < 2){
                        heureDefaut = '0'+heureDefaut;
                    }
                    if(minuteDefaut.toString().length < 2){
                        minuteDefaut = '0'+minuteDefaut;
                    }
                    /*** CAS SELECT B -> DOTATION              &&                A -> LIBRE ***/
                    chargementTimerPickerSimple( '08:00', heureDefaut+':'+minuteDefaut  ,'00:00',   heure+':'+min );
                }
                /*** CAS SELECT A ET B -> Dotations  ***/
                if (active1 && active2) {
                    let nomMoisA = '';
                    let annee = '';
                    for (i = 0; i < nameMonthA.length - 5; i++) {
                        nomMoisA += nameMonthA.charAt(i);
                    }
                    for (i = nameMonthA.length - 4; i < nameMonthA.length; i++) {
                        annee += nameMonthA.charAt(i);
                    }
                    let numMoisA = cal_months_labels.indexOf(nomMoisA) + 1;

                    /*** B ***/
                    let nomMoisB = '';
                    let anneeB = '';
                    for (i = 0; i < nameMonthB.length - 5; i++) {
                        nomMoisB += nameMonthB.charAt(i);
                    }
                    for (i = nameMonthB.length - 4; i < nameMonthB.length; i++) {
                        anneeB += nameMonthB.charAt(i);
                    }
                    let numMoisB = cal_months_labels.indexOf(nomMoisB) + 1;

                    /*** RECUPERATION DE DONNEE ***/
                    // let nbrPourDebut = 0;let nbrPourFin = 0;let dateDebut = false;let dateFin = false;

                    let date_dateFin_y = 8;
                    let date_dateFin_i = 0;
                    let date_dateFin_h = 0;

                    //let date_dateDebut_y;
                    let date_dateDebut_i = 59;
                    let date_dateDebut_h = 23;
                    var heureDebut, heureFin, minDebut, minFin;

                    /*** REGARDER POUR RÉCUPERER HEURE DE LA DATE MEME JOUR ***/
                    for (let i = 0; i < dates.length; i++) {

                        if (parseInt(annee) === parseInt(dates[i].dateFin_y) && parseInt(numMoisA) === parseInt(dates[i].dateFin_m) && parseInt(active1Span) === parseInt(dates[i].dateFin_d)) {
                            /*** Conserver Heure la plus Grande ***/
                            if (!heureFin) {
                                heureFin = dates[i].dateFin_h;
                                minFin = dates[i].dateFin_i;

                                date_dateFin_y = dates[i].dateFin_h;
                                date_dateFin_i = dates[i].dateFin_i;
                                date_dateFin_h = dates[i].dateFin_h;
                            } else {
                                if (heureFin < dates[i].dateFin_h) {
                                    heureFin = dates[i].dateFin_h;
                                    minFin = dates[i].dateFin_i;

                                    date_dateFin_y = dates[i].dateFin_h;
                                    date_dateFin_i = dates[i].dateFin_i;
                                    date_dateFin_h = dates[i].dateFin_h;
                                }
                                if (parseInt(heureFin) === parseInt(dates[i].dateFin_h)) {
                                    if (minFin < dates[i].dateFin_i) {
                                        minFin = dates[i].dateFin_h;

                                        date_dateFin_i = dates[i].dateFin_y | date('i')
                                    }
                                }
                            }
                        }
                        if (parseInt(anneeB) === parseInt(dates[i].dateDebut_y) && parseInt(numMoisB) === parseInt(dates[i].dateDebut_m) && parseInt(active2Span) === parseInt(dates[i].dateDebut_d)) {
                            /*** Conserver Heure la plus Grande ***/
                            if (!heureDebut) {
                                heureDebut = dates[i].dateDebut_h;
                                minDebut = dates[i].dateDebut_i;

                                date_dateDebut_i = dates[i].dateDebut_i;
                                date_dateDebut_h = dates[i].dateDebut_h;
                            } else {
                                if (heureDebut < dates[i].dateDebut_h) {
                                    heureDebut = dates[i].dateDebut_h;
                                    minDebut = dates[i].dateDebut_i;

                                    date_dateDebut_i = dates[i].dateDebut_i;
                                    date_dateDebut_h = dates[i].dateDebut_h;
                                }
                                if (parseInt(heureDebut) === parseInt(dates[i].dateDebut_h)) {
                                    if (minDebut < dates[i].dateDebut_i) {
                                        minDebut = dates[i].dateDebut_h;

                                        date_dateDebut_i = dates[i].dateDebut_i;
                                    }
                                }
                            }
                        }
                    }

                    // Format de l'heure par défaut
                    if(date_dateDebut_h.toString().length < 2){
                        date_dateDebut_h = '0'+date_dateDebut_h;
                    }
                    if(date_dateDebut_i.toString().length < 2){
                        date_dateDebut_i = '0'+date_dateDebut_i;
                    }
                    if(date_dateFin_h.toString().length < 2){
                        date_dateFin_h = '0'+date_dateFin_h;
                    }
                    if(date_dateFin_i.toString().length < 2){
                        date_dateFin_i = '0'+date_dateFin_i;
                    }
                    /***        CAS SELECT A ET B -> Dotations      ***/
                    chargementTimerPickerSimple(  date_dateFin_h+':'+date_dateFin_i, date_dateDebut_h+':'+date_dateDebut_i,  date_dateFin_h+':'+date_dateFin_i, date_dateDebut_h+':'+date_dateDebut_i );
                }
            } else {
                // AUCUNE DOTATIONS
                chargementTimerPickerSimple(  '08:00', '18:00', '00:00',   '23:59');
            }
        }
    } else {
        if (document.querySelector('.active-b')) {
            document.getElementById('spanJourPourHeureDepart').innerText = '(Pour le ' + document.querySelector('.active-b span').innerText + ' ' + nameMonthA + ') ';
            document.getElementById('spanJourPourHeureFin').innerText = '(Pour le ' + document.querySelector('.active-a span').innerText + ' ' + nameMonthB + ') ';
            document.getElementById("timesPickers1-2CreationDates").classList.remove("classDisabledDiv");
            changeJourInput();
        }
        changementHrMinInput();
    }
}

function changeJourInput () {

    /*** TRANSMITION DATE ET HEURE AU FORMULAIRE ***/
    /*** TRANSMITION AU INPUT DATETIME ***/
    /***  FUNCTION REMPLACE CHAR ***/
    String.prototype.replaceAt = function (index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }
        return this.substring(0, index) + replacement + this.substring(index + 1);
    }

    /********************* DATE DEBUT ******************/
    let dateDebut_jour_mois_annee = document.querySelector('.active-a').id;
    let array_dateDebut = dateDebut_jour_mois_annee.split("-")
    let dateDebut_jour;
    let dateDebut_mois;

    if(array_dateDebut[0] > 9){
        dateDebut_jour = array_dateDebut[0].toString();
    } else {
        dateDebut_jour = "0" + array_dateDebut[0].toString();
    }
    dateDebut_mois = parseInt(array_dateDebut[1]) + 1;

    // Format de l'heure par défaut
    if(dateDebut_mois.toString().length < 2){
        dateDebut_mois = '0' + dateDebut_mois;
    }

    let test_date_debut = new Date(parseInt(array_dateDebut[2]), dateDebut_mois, dateDebut_jour);

    /******************* DATE FIN **********************/
    let dateFin_jour_mois_annee = document.querySelector('.active-b').id;
    let array_dateFin = dateFin_jour_mois_annee.split("-")
    let dateFin_jour;
    let dateFin_mois;

    if(array_dateFin[0] > 9){
        dateFin_jour = array_dateFin[0].toString();
    } else {
        dateFin_jour = "0" + array_dateFin[0].toString();
    }

    dateFin_mois = parseInt(array_dateFin[1]) + 1;

    // Format de l'heure par défaut
    if(dateFin_mois.toString().length < 2){
        dateFin_mois = '0' + dateFin_mois;
    }

    let test_date_fin = new Date(parseInt(array_dateFin[2]), dateFin_mois, dateFin_jour);

    let dateDebut, dateFin;

    // // VERIFICATION SI LES DATES SONT DANS LE BON SENS
    if(test_date_debut > test_date_fin ){
        dateDebut = dateFin_jour.toString() + "-" +dateFin_mois.toString() + "-" + array_dateFin[2].toString() ;
        dateFin =  dateDebut_jour.toString() + "-" +dateDebut_mois.toString() + "-" + array_dateDebut[2].toString() ;
    } else {
        dateDebut = dateDebut_jour.toString() + "-" +dateDebut_mois.toString() + "-" + array_dateDebut[2].toString() ;
        dateFin = dateFin_jour.toString() + "-" +dateFin_mois.toString() + "-" + array_dateFin[2].toString() ;

    }
    document.getElementById('idInputDateDebut').value = dateDebut;
    document.getElementById('idInputDateFin').value = dateFin;
    document.getElementById('idInputDateDebut').value = dateDebut;
    document.getElementById('idInputDateFin').value = dateFin;
}



function clearDonnerPopup(){
    /*** CLEAR DONNER DU POPUP ***/
    $('.debut').remove();
    $('.fin').remove();
    $('.divWrapp > *').unwrap();
}
function startMove (item) {
    dragging = true;

    let activeAItem = document.querySelector('.active-a');
    let activeBItem = document.querySelector('.active-b');

    if (!activeBItem && activeAItem) {
        item.classList.add('active-b');
        activeBItem = document.querySelector('.active-b');

        /*** CLEAR DONNER DU POPUP ***/
        clearDonnerPopup();

        for (let y = 1; y <= 23; y++) {
            document.getElementById('idLi' + y + 'Div').style.backgroundColor = '';
            document.getElementById('idLi' + y + 'Div').className = "classLiTime";
        }

        /*** CAS OU DOUBLE CLIC SUR 1 DATE ***/
        /*** &&&&& MAIS  CONTIEN  CLASS dayBook ***/
        if (activeAItem === activeBItem && activeAItem.classList.contains('dayBook')) {

            /*** RECUPERER LES DATES DEJA PRESENTE ***/
            let jour = parseInt(activeAItem.querySelector("span").innerText, 10);
            let mois, annee;
            /*** CAS MOIS < 10 ***/
            if (activeAItem.id.length === 6) {
                mois = parseInt(activeAItem.id.charAt(0), 10) + 1;
                annee = parseInt(activeAItem.id.charAt(2) + '' + activeAItem.id.charAt(3) + '' + activeAItem.id.charAt(4) + '' + activeAItem.id.charAt(5), 10);
            }
            if (activeAItem.id.length === 7) {
                mois = parseInt(activeAItem.id.charAt(0) + '' + (parseInt(activeAItem.id.charAt(1), 10) + 1));
                annee = parseInt(activeAItem.id.charAt(3) + '' + activeAItem.id.charAt(4) + '' +activeAItem.id.charAt(5) + '' + activeAItem.id.charAt(6), 10);
            }

            /*** Vérifier si date dotation déja existant sur cette journée ***/
            let tableauDate = [];
            let index = 0;
            let dateDebut = false;
            let dateFin = false;

            for (let i = 0; i < dates.length; i++) {

                dateDebut = false;
                dateFin = false;

                /*** SI Date Dotation existante affichage Pop-UP pour affichage créneau ***/
                if (jour === parseInt(dates[i].dateDebut_d, 10) && mois === parseInt(dates[i].dateDebut_m, 10) && annee === parseInt(dates[i].dateDebut_y, 10)) {
                    dateDebut = true;
                }
                if (jour === parseInt(dates[i].dateFin_d, 10) && mois === parseInt(dates[i].dateFin_m, 10) && annee === parseInt(dates[i].dateFin_y, 10)) {
                    dateFin = true;
                }
                if (dateDebut && dateFin) {
                    tableauDate[index] = [parseInt(dates[i].dateDebut_h), parseInt(dates[i].dateDebut_i), parseInt(dates[i].dateFin_h), parseInt(dates[i].dateFin_i)];
                }
                if (dateDebut && !dateFin) {
                    tableauDate[index] = [parseInt(dates[i].dateDebut_h), parseInt(dates[i].dateDebut_i), 24, 0];
                }
                if (!dateDebut && dateFin) {
                    tableauDate[index] = [0, 0, parseInt(dates[i].dateFin_h), parseInt(dates[i].dateFin_i)];
                }
                if (dateDebut || dateFin) {
                    index++;
                }
            }

            /*** AJOUT BACKGROUND GREEN ET SÉPARATEUR ENTRE CRÉNEAU BOOK ***/
            for (let i = 0; i < tableauDate.length; i++) {
                for (let y = tableauDate[i][0]; y <= (tableauDate[i][2]); y++) {
                    let min;

                    /*** Entre FIN && DEBUT ***/
                    if (y !== parseInt(tableauDate[i][2]) && y !== 0 && y !== 24) {
                        document.getElementById('idLi' + y + 'Div').style.backgroundColor = 'green';
                        document.getElementById('idLi' + y + 'Div').classList.add('timeBook');
                    }

                    /*** DEBUT ***/
                    if (y === parseInt(tableauDate[i][0]) && y !== 0) {
                        let newNode = document.createElement('div');

                        newNode.classList.add('debut');
                        newNode.style.backgroundColor = 'whrite';
                        newNode.style.width = '100%';
                        newNode.style.height = '20px';
                        newNode.style.color = 'black';
                        newNode.style.borderColor = 'black';
                        newNode.style.borderWidth = '2px';
                        newNode.style.borderStyle = 'solid';
                        newNode.style.textAlign = 'center';
                        newNode.style.alignContent = 'center';

                        if (parseInt(tableauDate[i][1]) < 10) {
                            min = "0" + tableauDate[i][1];
                        } else {
                            min = parseInt(tableauDate[i][1]);
                        }
                        newNode.innerText = "Début : " + tableauDate[i][0] + ":" + min;

                        newNode.dataset.heureDebut = parseInt(tableauDate[i][0]);
                        newNode.dataset.minDebut = min;

                        /*** AFFICHER FIN PUIS DEBUT Quand 2 Créneau a la suite ***/
                        let referenceNode = document.getElementById('idLi' + y + 'Div');
                        if (!referenceNode.nextElementSibling.classList.contains('fin')) {
                            referenceNode.after(newNode);
                        }
                        if (referenceNode.nextElementSibling.classList.contains('fin')) {
                            referenceNode.nextElementSibling.after(newNode);
                        }
                    }
                    /*** FIN ***/
                    if (y === parseInt(tableauDate[i][2]) && y !== 0) {
                        let newNode = document.createElement('div');

                        newNode.classList.add('fin');
                        newNode.style.backgroundColor = 'whrite';
                        newNode.style.width = '100%';
                        newNode.style.height = '20px';
                        newNode.style.color = 'black';
                        newNode.style.borderColor = 'black';
                        newNode.style.borderWidth = '2px';
                        newNode.style.borderStyle = 'solid';
                        newNode.style.textAlign = 'center';
                        newNode.style.alignContent = 'center';

                        if (tableauDate[i][3] < 10) {
                            min = "0" + tableauDate[i][3];
                        } else {
                            min = tableauDate[i][3];
                        }
                        newNode.innerText = "Fin : " + tableauDate[i][2] + ":" + min;

                        newNode.dataset.heureFin = tableauDate[i][2];
                        newNode.dataset.minFin = min;

                        /*** AFFICHER FIN PUIS DEBUT Quand 2 Créneau a la suite ***/
                        let referenceNode = document.getElementById('idLi' + y + 'Div');

                        if (referenceNode != null && !referenceNode.nextElementSibling.classList.contains("debut")) {
                            referenceNode.after(newNode);
                        }
                        if (referenceNode != null && referenceNode.nextElementSibling.classList.contains("debut")) {
                            referenceNode.nextElementSibling.after(newNode);
                        }
                    }
                }
            }

            /*** AJOUT CLASS créneau +i sur toutes les div free ***/
            let allDiv = document.querySelectorAll('#divSelectionCreneauDotation ul div');
            let nbrCreneau = 0;

            for (let i = 0; i < allDiv.length; i++) {
                if (!allDiv[i].classList.contains('debut') && !allDiv[i].classList.contains('fin') && !allDiv[i].classList.contains('timeBook')) {
                    if (nbrCreneau === 0) {
                        nbrCreneau++;
                    }
                    if (i > 1 && (allDiv[i - 1].classList.contains('debut') || allDiv[i - 1].classList.contains('fin') || allDiv[i - 1].classList.contains('timeBook'))) {
                        nbrCreneau++;
                    }
                    allDiv[i].classList.add('creneau' + nbrCreneau);
                }
            }

            /*** WRAP DIV SAME CLASS CRÉNEAU + i ***/
            /*** & ADD EVEN LISTENER ***/
            for (let i = 1; i <= nbrCreneau; i++) {
                $(".creneau" + i).wrapAll("<div class='divWrapp' id='divCreneau" + i + "'  />")
                document.querySelector('#divCreneau' + i).addEventListener("click", functionClickCreneau, false);
            }

            /*** **************************************************   POP-UP ***************************************************************************************************** ***/

            /*** LANCEMENT DU POP-UP ***/
            document.getElementById('modalOne').style.display = "block";

            /*** RECUP HEURES ET MINUTES ***/
            function functionClickCreneau (evt) {
                let heureDebut, heureFin, minDebut, minFin;

                if (evt.currentTarget.nextElementSibling && evt.currentTarget.nextElementSibling.classList.contains(('fin'))) {
                    minDebut = evt.currentTarget.nextElementSibling.dataset.minFin;
                    heureDebut = evt.currentTarget.nextElementSibling.dataset.heureFin;
                    if (minDebut.charAt(0) === '0') {
                        minDebut = parseInt(minDebut.charAt(1), 10);
                    }
                    if (heureDebut.charAt(0) === '0') {
                        heureDebut = parseInt(heureDebut.charAt(1), 10);
                    }
                } else {
                    minDebut = 0;
                    heureDebut = 0;
                }

                if (evt.currentTarget.previousElementSibling && evt.currentTarget.previousElementSibling.classList.contains(('debut'))) {
                    minFin = evt.currentTarget.previousElementSibling.dataset.minDebut;
                    heureFin = evt.currentTarget.previousElementSibling.dataset.heureDebut;
                    if (minFin.charAt(0) === '0') {
                        minFin = parseInt(minFin.charAt(1), 10);
                    } else {
                        minFin = parseInt(minFin, 10);
                    }
                    if (heureFin.charAt(0) === '0') {
                        heureFin = parseInt(heureFin.charAt(1), 10);
                    } else {
                        heureFin = parseInt(heureFin, 10);
                    }
                } else {
                    minFin = 59;
                    heureFin = 23;
                }

                let heureDefautDebut = 8;
                let minuteDefautDebut = 0;
                let heureDefautFin = 18;
                let minuteDefautFin = 0;

                // Modifier heure defaut
                if( heureDefautDebut < heureDebut){
                    heureDefautDebut = heureDebut;
                    if(minuteDefautDebut < minDebut){
                        minuteDefautDebut = minDebut;
                    }
                }
                if( heureDefautFin > heureFin){
                    heureDefautFin = heureFin;
                    if(minuteDefautFin < minFin){
                        minuteDefautFin = minFin;
                    }
                }

                // Format de l'heure
                if(heureDefautDebut.toString().length < 2){
                    heureDefautDebut = '0'+heureDefautDebut;
                }
                if(minuteDefautDebut.toString().length < 2){
                    minuteDefautDebut = '0'+minuteDefautDebut;
                }
                if(heureDefautFin.toString().length < 2){
                    heureDefautFin = '0'+heureDefautFin;
                }
                if(minuteDefautFin.toString().length < 2){
                    minuteDefautFin = '0'+minuteDefautFin;
                }

                // Format de l'heure par defaut
                if(heureDebut.toString().length < 2){
                    heureDebut = '0'+heureDebut;
                }
                if(minDebut.toString().length < 2){
                    minDebut = '0'+minDebut;
                }
                if(heureFin.toString().length < 2){
                    heureFin = '0'+heureFin;
                }
                if(minFin.toString().length < 2){
                    minFin = '0'+minFin;
                }
                chargementTimerPickerSimple( heureDefautDebut+':'+minuteDefautDebut,heureDefautFin+':'+minuteDefautFin , heureDebut+':'+minDebut,   heureFin+':'+heureFin);
                /*** RECUPERATION DE LA DATE   ***/
                let activeAIndex, nameMonthA, activeBIndex, nameMonthB;
                days.forEach((item, index) => {
                    let id_item_parent = item.parentElement.parentElement.id;
                    let id = id_item_parent.replace('divCalendrier', '');
                    id = id.replace('CreationDates', '');
                    id = parseInt(id);

                    if (item.classList.contains('active-a')) {

                        activeAIndex = index;
                        nameMonthA = document.getElementById('titreCalendarDate'+id).innerText; // PB ici cas décroissant
                    }
                    if (item.classList.contains('active-b')) {

                        activeBIndex = index;
                        nameMonthB = document.getElementById('titreCalendarDate'+id).innerText; // PB ici cas décroissant
                    }
                });
                /*** TRANSMITION DATE AU TEXTE DATE SUR LES HEURES ***/
                document.getElementById('spanJourPourHeureDepart').innerText = '(Pour le ' + document.querySelector('.active-a span').innerText + ' ' + nameMonthA + ') ';
                document.getElementById('spanJourPourHeureFin').innerText = '(Pour le ' + document.querySelector('.active-a span').innerText + ' ' + nameMonthB + ') ';

                document.getElementById("timesPickers1-2CreationDates").classList.remove("classDisabledDiv");
                changeJourInput();


                /*** QUITTER POP UP ET CLEAN POPUP ***/
                let divModul = document.getElementById('modalOne');

                divModul.style.display = "none";

                /*** CLEAR DONNER DU POPUP ***/
                clearDonnerPopup();

                /*** **************************************************   POP-UP ***************************************************************************************************** ***/

                for (let y = 1; y <= 23; y++) {
                    document.getElementById('idLi' + y + 'Div').style.backgroundColor = '';
                    document.getElementById('idLi' + y + 'Div').className = "classLiTime";
                }
            }
        }
        calculateRange();
    } else {
        clearActiveDays();
        clearRange();
        item.classList.add('active-a');
    }
}

function move (item) {
    if (dragging) {
        let prevActiveB = document.querySelector('.active-b');
        clearRange();
        if (prevActiveB) prevActiveB.classList.remove('active-b');
        if (!item.classList.contains('active-a')) {
            item.classList.add('active-b');
        }
        calculateRange();
    }
}

function endMove (item) {
    dragging = false;
}

window.addEventListener('mouseup', e => {
    dragging = false;
});

days.forEach((item, index) => {
    let dayNumber = item.querySelector('.day-number').innerHTML;

    if (dayNumber === '1' && !item.classList.contains('next-mon')) {
        offset = index;
    }
    item.addEventListener('mousedown', e => {
        startMove(item);
    });
    item.addEventListener('mousemove', e => {
        move(item);
    });
    item.addEventListener('mouseup', e => {
        endMove(item);
    });
});

