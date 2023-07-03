/*** LISTE NOM MOIS ***/
cal_months_labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

/*** CURRENT DATE, TIME : 8:00 ***/
cal_current_date = new Date("" + jeu_dateDebut_mdY + " 08:00");

if (jeu_dateDebut_m !== jeu_dateFin_m) {
    cal_current_date_fin = new Date("" + jeu_dateFin_mdY + " 08:00");
}

function mois_annee_plus_un(m, y) {
    if (m === 12) {
        m = 1;
        y++;
    } else {
        m++;
    }
    return [m, y];
}

function Calendar(month, year) {
    this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;

    // Calcule du nombre de mois demandé
    let nombre_mois = monthDiff(new Date(jeu_dateDebut_a, jeu_dateDebut_m), new Date(jeu_dateFin_a, jeu_dateFin_m)) + 1;

    let mois_dernier = cal_current_date.getMonth()
    let years_dernier = cal_current_date.getFullYear();

    // SI plus de 1 mois
    if (nombre_mois > 1) {
        // Boucle sur le nombre de mois restant
        for (let x = 2; x <= nombre_mois; x++) {
            window['month' + x] = mois_annee_plus_un(mois_dernier, years_dernier)[0];
            window['year' + x] = mois_annee_plus_un(mois_dernier, years_dernier)[1];

            mois_dernier = window['month' + x];
            years_dernier = window['year' + x];
        }
    }
    this.html = '';
}

function unCalendrier(html, i, thisMonth, year, nomMoisAnnee, classDay) { // TODO RAJOUTER ANNEE
    let nbrPourDebut = 0;
    let nbrPourFin = 0;
    let memeJour = 0;
    let dateDebut = false;
    let dateFin = false;
    let iOff = false;

    /***   VERIFICATION DES CRÉNEAUX DEJA EXISTANT   ***/
    let booleanPrecedent;
    /***  PRISE DE DONNEES  ***/
    for (let y = 0; y < dates.length; y++) {
        booleanPrecedent = false;
        if (i === parseInt(dates[y].dateDebut_d) && parseInt(dates[y].dateDebut_m) === (thisMonth + 1) && parseInt(dates[y].dateDebut_y) === year) {
            dateDebut = true;
            nbrPourDebut++;
            booleanPrecedent = true;
        }
        if (i === parseInt(dates[y].dateFin_d) && parseInt(dates[y].dateFin_m) === (thisMonth + 1) && parseInt(dates[y].dateFin_y) === year) {
            dateFin = true;
            nbrPourFin++;
            if (booleanPrecedent === true) {
                memeJour++;
            }
        }

        let from = new Date(dates[y].dateDebut_y.toString(), dates[y].dateDebut_m.toString() -1 , dates[y].dateDebut_d.toString()  );
        let to = new Date(dates[y].dateFin_y.toString(), dates[y].dateFin_m.toString() - 1, dates[y].dateFin_d.toString()  );
        let check = new Date(year.toString(), thisMonth.toString(), i.toString()   );

        if(check > from && check < to){
            iOff = true;
        }
    }


    /***  APPLICATIONS DES DONNEES  ***/
    if (dateDebut === false && dateFin === false && iOff === false) {
        html += '<div class="day dayFree ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number">' + i + ' </span></div>';
    } else {
        /* TOUT LES JOURS COMPRIS ENTRE UNE DATE DEBUT et SA DATE FIN */
        if (iOff === true) {
            html += '<div class="day dayBook dayOff ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgGreenClaire day-off"><s>' + i + '</s></span></div>';
        } else {
            if (dateDebut === true || dateFin === true) {
                if (dateDebut === true && dateFin === true && nbrPourDebut === nbrPourFin && memeJour === nbrPourDebut) {
                    switch (nbrPourDebut + nbrPourFin - memeJour) {
                        case 1 :
                            html += '<div class="day dayBook ' + classDay + '" id="'+ i + '-'   + nomMoisAnnee + '"><span class="day-number bgGreen">' + i + '</span></div>';
                            break;
                        case 2 :
                            html += '<div class="day dayBook ' + classDay + '" id="'+ i + '-'   + nomMoisAnnee + '"><span class="day-number bgOrange">' + i + '</span></div>';
                            break;
                        case 3 :
                            html += '<div class="day dayBook ' + classDay + '" id="'+ i + '-'   + nomMoisAnnee + '"><span class="day-number bgRed">' + i + '</span></div>';
                            break;
                        default :
                            html += '<div class="day dayBook ' + classDay + '" id="'+ i + '-'   + nomMoisAnnee + '"><span class="day-number bgRed">' + i + '</span></div>';
                            break;
                    }
                } else {
                    if (dateDebut === true && dateFin === true && nbrPourDebut === nbrPourFin && memeJour !== nbrPourDebut) {
                        switch (nbrPourDebut + nbrPourFin - memeJour) {
                            case 1 :
                                html += '<div class="day dayBook bgBorderRadius50 ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgGreen">' + i + '</span></div>';
                                break;
                            case 2 :
                                html += '<div class="day dayBook bgBorderRadius50 ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgOrange">' + i + '</span></div>';
                                break;
                            case 3 :
                                html += '<div class="day dayBook bgBorderRadius50 ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgRed">' + i + '</span></div>';
                                break;
                            default :
                                html += '<div class="day dayBook bgBorderRadius50 ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgRed">' + i + '</span></div>';
                                break;
                        }
                    } else {
                        if (nbrPourDebut > nbrPourFin) {
                            switch (nbrPourDebut + nbrPourFin - memeJour) {
                                case 1 :
                                    html += '<div class="day dayBook bgBorderRightRadius ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgGreen">' + i + '</span></div>';
                                    break;
                                case 2 :
                                    html += '<div class="day dayBook bgBorderRightRadius ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgOrange">' + i + '</span></div>';
                                    break;
                                case 3 :
                                    html += '<div class="day dayBook bgBorderRightRadius ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgRed">' + i + '</span></div>';
                                    break;
                                default :
                                    html += '<div class="day dayBook bgBorderRightRadius ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgRed">' + i + '</span></div>';
                                    break;
                            }
                        } else {
                            switch (nbrPourDebut + nbrPourFin - memeJour) {
                                case 1 :
                                    html += '<div class="day dayBook bgBorderLeftRadius ' + classDay + '" id="'+ i + '-' + nomMoisAnnee + '"><span class="day-number bgGreen">' + i + '</span></div>';
                                    break;
                                case 2 :
                                    html += '<div class="day dayBook bgBorderLeftRadius ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgOrange">' + i + '</span></div>';
                                    break;
                                case 3 :
                                    html += '<div class="day dayBook bgBorderLeftRadius ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgRed">' + i + '</span></div>';
                                    break;
                                default :
                                    html += '<div class="day dayBook bgBorderLeftRadius ' + classDay + '" id="'+ i + '-'  + nomMoisAnnee + '"><span class="day-number bgRed">' + i + '</span></div>';
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
    return html;
}

function monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

/*** RÉCUPÉRER NUM Day Du Mois ***/
function monthLength2(y, m) {
    return (new Date(y, ++m, 0)).getDate();
}

Calendar.prototype.generateHTML = function () {
    let i;
    /*** RÉCUPÉRER 1er Day Du Mois ***/
    const firstDay = new Date(this.year, this.month, 1);
    let startingDay = firstDay.getDay() - 1;

    // RÉGLER PROBLÈME MOIS COMMENCENT UN DIMANCHE
    if (startingDay === -1) {
        startingDay = 6;
    }

    /*** RÉCUPÉRER NUM Day Du Mois ***/
    function monthLengthFunc(y, m) {
        return (new Date(y, ++m, 0)).getDate();
    }

    const monthLength = monthLengthFunc(this.year, this.month);
    /***  header  ***/
    const monthName = cal_months_labels[this.month];

    let html = '<div id="divCalendrier1CreationDates" class="col-xl-6 col-lg-12 col-12 divCalendrierCreationDates card m-auto mb-2" >';
    html += '<h2 id="titreCalendarDate1">' + monthName + "&nbsp;" + this.year + '</h2>';
    html += '<div class="divCalendrierCreationDates grid-container-calendrier">';
    html += '<div><h4>Lun</h4></div>';
    html += '<div><h4>Mar</h4></div>';
    html += '<div><h4>Mer</h4></div>';
    html += '<div><h4>Jeu</h4></div>';
    html += '<div><h4>Ven</h4></div>';
    html += '<div><h4>Sam</h4></div>';
    html += '<div><h4>Dim</h4></div>';

    for (i = 0; i < startingDay; i++) {
        html += '<div></div>';
    }

    /** DATE DU JOUR **/
    let date = new Date();
    let today = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    for (i = 1; i <= monthLength; i++) {


        /*** Lock JOUR en DEHORS de Dates ***/
        if (
            (i < parseInt(jeu_dateDebut_d) && (this.month + 1) === parseInt(jeu_dateDebut_m)) ||
            (i < today && this.month === month && this.year === year) ||
            (this.month < month && this.year === year) ||
            (this.year < year) ||
            (i > parseInt(jeu_dateFin_d) && (this.month + 1) === parseInt(jeu_dateFin_m))
        ) {
            html += '<div class="day dayOff"><span class="day-number day-off"><s>' + i + '</s></div>';
        } else {
            let nomMoisAnnee = this.month + "-" + this.year;
            html = unCalendrier(html, i, this.month, this.year, nomMoisAnnee, "");
        }
    }
    html += '</div>';
    html += '</div>';

    /*** RAJOUT POUR MULTIPLIER LES MOIS ***/
    let nombre_mois = monthDiff(new Date(jeu_dateDebut_a, jeu_dateDebut_m), new Date(jeu_dateFin_a, jeu_dateFin_m)) + 1;
    let index_mois;

    for (let x = 2; x <= nombre_mois; x++) {
        index_mois = x;

        /*** RÉCUPÉRER 1er Day Du Mois ***/
        window['firstDay' + x] = new Date(eval("year" + x), eval("month" + x), 1);
        window['startingDay' + x] = eval("firstDay" + x).getDay() - 1;
        window['monthLengthVar' + x] = monthLength2(eval("year" + x), eval("month" + x));

        if(eval("firstDay" + x).getDay() - 1 < 0){ // CORRIGE BUG DIMANCHE PREMIER JOUR DU MOIS
            window['startingDay' + x] = 6;
        }
        /***  header  ***/
        if(eval("month" + x) < 12){
            window['monthName' + x] = cal_months_labels[eval("month" + x)];
        } else {
            window['monthName' + x] = cal_months_labels[0]; // CAS DU MOIS DE JANVIER
            window['year' +x] = eval("year" + x) +1;
        }

        html += '<div id="divCalendrier' + x + 'CreationDates" class="col-xl-6 col-lg-12 col-12 divCalendrierCreationDates card m-auto">';
        html += '<h2 id="titreCalendarDate' + x + '">' + eval("monthName" + x) + "&nbsp;" + eval("year" + x) + '</h2>';
        html += '<div class="grid-container-calendrier divCalendrierCreationDates" id="divCalendrier' + x + 'CreationDates">';
        html += '<div><h4>Lun</h4></div>';
        html += '<div><h4>Mar</h4></div>';
        html += '<div><h4>Mer</h4></div>';
        html += '<div><h4>Jeu</h4></div>';
        html += '<div><h4>Ven</h4></div>';
        html += '<div><h4>Sam</h4></div>';
        html += '<div><h4>Dim</h4></div>';

        for (i = 0; i < eval("startingDay" + x); i++) {
            html += '<div></div>';
        }

        for (i = 1; i <= eval("monthLengthVar" + x); i++) {
            /*** VERIFICATION DES DATES GLOBALES  ***/
            /*** JOUR en DEHORS de Dates GLOBALE  ***/
            if (i > parseInt(jeu_dateFin_d)
                && parseInt(jeu_dateFin_m) === parseInt(eval("month" + x)) + 1
                && parseInt(jeu_dateFin_a) === parseInt(eval("year" + x))
            ) {
                html += '<div class="day dayOff"><span class="day-number day-off"><s>' + i + '</s></div>';
            } else {
                window['nomMoisAnnee' + x] = eval("month" + x) + "-" + eval("year" + x);
                html = unCalendrier(html, i, eval("month" + x), eval("year" + x) , eval('nomMoisAnnee' + x), "day"+x);
            }
        }
        html += '</div>';
        html += '</div>';
    }
    this.html = html;
}

Calendar.prototype.getHTML = function () {
    return this.html;
}

let cal = new Calendar();
cal.generateHTML();
document.getElementById('divCalendrierCreationDates').innerHTML += cal.getHTML();

