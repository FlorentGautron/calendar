<html lang="fr">
    <head>
        <title>PHP Test</title>

        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" integrity="sha512-mSYUmp1HYZDFaVKK//63EcZq4iFWFjxSL+Z3T/aCt4IO9Cejm03q3NKKYN6pFQzY0SBOr8h+eCIAZHPXcpZaNw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker3.standalone.min.css" integrity="sha512-p4vIrJ1mDmOVghNMM4YsWxm0ELMJ/T0IkdEvrkNHIcgFsSzDi/fV7YxzTzb3mnMvFPawuIyIrHcpxClauEfpQg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <link rel="stylesheet" href="css/dates.css"/>
        <link rel="stylesheet" href="css/creation_date.css"/>

        <style>
            .card{
                border : none;
                box-shadow : 0 0.5rem 1rem rgb(0 0 0 / 15%);
            }
            .card-body{
                flex: 1 1 auto;
                padding: 2rem 2rem;
            }
            .titrePages{
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .row {
                --bs-gutter-x: 1.5rem;
                --bs-gutter-y: 0;
                display: flex;
                flex-wrap: wrap;
                margin-top: calc(-1 * var(--bs-gutter-y));
                margin-right: calc(-.5 * var(--bs-gutter-x));
                margin-left: calc(-.5 * var(--bs-gutter-x));
            }
            #div_form_dates{
                display: grid;
                grid-template-columns: 25% 25% 25% 25%;
            }
            #div_bouton{
                grid-column: span 4;
                margin-top : 50px;
                text-align: center;
            }
        </style>

<!--        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        <script>

            let dates = [];
            let object;

            function envoye_par_php(){

            $(function () {
                (function ($) {
                    // *** Change calendar language *** //
                    $.fn.datepicker.dates["fr"] = {
                        // *** METTRE LE CALENDRIER EN FRANCAIS *** //
                        // days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                        // daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                        // daysMin: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                        // months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                        // monthsShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
                        // today: "Aujourd\'hui",
                        // monthsTitle: "Mois",
                        // clear: "Effacer",
                        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        daysMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        monthsShort: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
                        today: "Today",
                        monthsTitle: "Month",
                        clear: "Delete",
                        weekStart: 1,
                        format: "dd/mm/yyyy"
                    };
                }(jQuery));

                // *** Start Date *** //
                $("#jeu_general_dateDebut").datepicker({
                    language: "fr",
                    startDate: new Date(),
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    todayHighlight: true
                }).on("changeDate", function (selected) {
                    /* To add limit to the calendar */
//                        let minDate = new Date(selected.date.valueOf());
//                        let someDate = new Date(selected.date.valueOf());
//                        let numberOfDaysToAdd = 30;
//                        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
//                        let dd = someDate.getDate();
//                        let mm = someDate.getMonth() + 1;
//                        let y = someDate.getFullYear();
//                        let someFormattedDate = +dd + "/" + mm + "/" + y;
//
//                        let dateTo = $("#jeu_general_dateFin");
//
//                        dateTo.datepicker("setStartDate", minDate);
//                        dateTo.datepicker("setEndDate", someFormattedDate);
                });

                // *** End Date *** //
                $("#jeu_general_dateFin").datepicker({
                    language: "fr",
                    startDate: new Date(Date.now() + (3600 * 1000 * 24)),
                    format: "dd/mm/yyyy",
                    autoclose: true,
                    todayHighlight: true
                }).on("changeDate", function (selected) {
//                        let  maxDate = new Date(selected.date.valueOf());
//                        let someDate = new Date(selected.date.valueOf());
//                        let numberOfDaysToAdd = 30;
//                        someDate.setDate(someDate.getDate() - numberOfDaysToAdd);
//                        let dd = someDate.getDate();
//                        let mm = someDate.getMonth() + 1;
//                        let y = someDate.getFullYear();
//                        let someFormattedDate = dd + "/" + mm + "/" + y;
//
//                        let dateFrom = $("#jeu_general_dateDebut");
//                        dateFrom.datepicker("setStartDate", someFormattedDate);
//                        dateFrom.datepicker("setEndDate", maxDate);
                });
            });
        }
            envoye_par_php();
    </script>

    </head>

    <body>
        <div id="div_select_dates" class="card mb-4 ml-auto mr-auto mt-4 w-75">
            <div class="titrePages">
                <h4 class="card-heading text-center">Booking calendar slot</h4>
            </div>

            <form id="form" name="form" method="post" enctype="multipart/form-data">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">

                            <div class="input-group mb-3  datepicker-range">

                                <div id="div_form_dates" class="input-group mb-3 datepicker-range">

                                    <!-- ---------------------   Start date   ---------------------  -->
                                    <label class="form-label required" for="jeu_general_dateDebut">Calendar dates : </label>
                                    <input type="text" id="jeu_general_dateDebut" name="jeu_general_dateDebut" required="required" format="dd/MM/yyyy" class="form-control datepicker-input w-100" value="<?php if( isset($_POST["jeu_general_dateDebut"])){echo $_POST["jeu_general_dateDebut"];} ?>" >

                                    <!-- ---------------------   End date    ---------------------  -->
                                    <label class="form-label text-center required" for="jeu_general_dateFin"> to </label>
                                    <input type="text" id="jeu_general_dateFin" name="jeu_general_dateFin" required="required" format="dd/MM/yyyy" class="form-control datepicker-input w-100" value="<?php if( isset($_POST["jeu_general_dateFin"])){echo $_POST["jeu_general_dateFin"];} ?>">

                                    <div id="div_bouton">
                                        <button id="bouton_submit" class="class_bouton_standard" name="bouton_submit" type="submit" >Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div id="div_info_calendrier_form">

        <?php
            if(isset($_POST["bouton_submit"])) {
                echo_element();
            }

            function echo_element(){
                $dateDebut = $_POST["jeu_general_dateDebut"];
                $dateFin = $_POST["jeu_general_dateFin"];

                $array_date_debut = explode("/", $dateDebut);
                $array_date_fin = explode("/", $dateFin);

                echo '<script>
                        let jeu_dateDebut_d = "' . $array_date_debut[0] . '";
                        let jeu_dateDebut_m = "' . $array_date_debut[1] . '";
                        let jeu_dateDebut_a = "' . $array_date_debut[2] . '";
                        let jeu_dateDebut_mdY = "' . $array_date_debut[1] . '/' . $array_date_debut[0] . '/' . $array_date_debut[2] . '";

                        let jeu_dateFin_d = "' . $array_date_fin[0] . '";
                        let jeu_dateFin_m = "' . $array_date_fin[1] . '";
                        let jeu_dateFin_a = "' . $array_date_fin[2] . '";
                        let jeu_dateFin_mdY = "' . $array_date_fin[1] . '/' . $array_date_fin[0] . '/' . $array_date_fin[2] . '";
                        
                    </script>';

                echo '<div class="card-body">' .
                    '<div class="row">';

                if (isset($formHasErrors)) {
                    echo '<div id="idFormHasErrors" class="col-12"><h1 type="alert">{{ formHasErrors }}</h1></div>';
                }

                /***************************************   DIV Informations ***********************************/

                echo '<div id="divIndicationCreationDates" class=" ml-auto mr-auto mb-4 col-10 ">' .
                    '<div id="divIndicationCreationDatesdiv1" class="col-12 ">' .
                    '<h4>Instructions :</h4>' .
                    '<ul>' .
                    '<li>To select a single day: Double-click on a date</li>' .
                    '<li>To select multiple dates: Select the start date and then the end date</li>' .
                    '</ul>' .
                    '</div>' .
                    '<div id="divIndicationCreationDatesdiv2" class="col-12 ">' .
                    '<ul>' .
                    '<li>' .
                    '<div id="span1IndicationCouleur"></div>' .
                    '1 Time slot for the day' .
                    '</li>' .
                    '<li>' .
                    '<div id="span2IndicationCouleur"></div>' .
                    '2 Time slots for the day' .
                    '</li>' .
                    ' <li>' .
                    '<div id="span3IndicationCouleur"></div>' .
                    '3 Time slots or more' .
                    '</li>' .
                    '</ul>' .
                    '</div>' .
                    '</div>' .

                    /* **************************************   ADD CALENDAR ************************************/

                    ' <div id="divCalendrierCreationDates" class="row ml-auto mr-auto mb-4 col-10 col-sm-10 col-md-10 col-lg-11 col-xl-10">' .
                        /* SCRIPT CALENDAR (JS) */
                    '</div>' .

                    /* **************************************    ADD TIME     *********************************** */

                    '<form class=" ml-auto mr-auto mb-4 w-75" name="date_jeu" method="" id="idFormCreationDates" onsubmit="event.preventDefault();  function_affichage()">' .

                    '<div id="timesPickers1-2CreationDates" style="display: grid; grid-template-columns: 25% 25% 25% 25%;" class="card row w-100 p-4 mt-2 mb-2">' .
                    '<div id="idDivDepart" class="">' .
                    '<h4>Start time:</h4><span id="spanJourPourHeureDepart"></span>' .
                    '</div>' .
                    '<div id="timePicker1CreationDates"  class="">' .
                    '<div class="time-picker">' .
                    ' <label for="idInputTimePickerDateDebut"></label><input type="time" name="idInputTimePickerDateDebut" id="idInputTimePickerDateDebut" min="" max="" required>' .
                    '<span id="idSpanTimePickerDateDebut" class="spanMinMaxTime classHide"></span>' .
                    '</div>' .
                    '</div>' .
                    '<div id="idDivFin"  class="">' .
                    '<h4>End time:</h4><span id="spanJourPourHeureFin"></span>' .
                    '</div>' .
                    '<div id="timePicker2CreationDates"  class="">' .
                    '<div class="time-picker2">' .
                    '<label for="idInputTimePickerDateFin"></label><input type="time" name="idInputTimePickerDateFin" id="idInputTimePickerDateFin" min="" max="" required>' .
                    '<span id="idSpanTimePickerDateFin" class="spanMinMaxTime classHide"></span>' .
                    '</div>' .
                    '</div>' .
                    '</div>' .

                    /* **************************************        FORM     *********************************** */

                    '<div style=" display: none;  position:relative;">' .
                    '<label for="date_jeu_dateDebut" class="required">Broadcast time slot:</label>' .
                    '<input type="text" id="idInputDateDebut" name="date_jeu[dateDebut]" required="required" class="form-control col-3" invalid_message="Please add a valid date.">' .

                    '<label id="" for="date_jeu_dateFin" class="required">to : </label>' .
                    '<input type="text" id="idInputDateFin" name="date_jeu[dateFin]" required="required" class="form-control" >' .
                    '</div>' .


                    /* **************************************        Buttons      *********************************** */


                    '<div id="divBoutonsCreationDates" class="w-100 text-center mt-4">' .
                    '<button form="idFormCreationDates" type="submit" id="submit" class="class_bouton_standard suivant " name="submit">Submit</button>' .
                    '<button form="idFormCreationDates"  type="reset" id="reset" class="class_bouton_standard " name="reset" onClick="window.history.back();">Cancel</button>' .
                    '</div>' .

                    '</form>' .
                    '</div>' .

                    '<div id="div_script"><script src="javascript/chrgt_time_picker.js"></script>
                    <script src="javascript/pop_up_add_position_init.js"></script>
                    <script src="javascript/creation_dates.js"></script>
                    <script src="javascript/creation_dates_calendrier.js"></script>
                    <script src="javascript/creation_dates_calendrier_rangePicker.js"></script></div>' .

                    /* **************************************        INSERTION RDV      *********************************** */
                    '<p class="" id="p_insertion_en_dessous"></p>'.

                    /***************************************   POP-UP select slot   ************************************/

                    '<div id="modalOne" class="modal" >' .
                    '<div class="modal-content">' .
                    '<div class="contact-form">' .
                    '<a class="close">&times;</a>' .
                    '<h5>Select the time slot :</h5>' .
                    '<div>' .
                    '<div id="divSelectionCreneauDotation" class="classDivSelectionCreneauDotation">' .
                    '<ul>' .
                    '<div  id="idLi23Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi23" data-modal="23">23</li>' .
                    '<hr id="idLi23Hr" style="">' .
                    '</div>' .
                    '<div  id="idLi22Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi22" data-modal="22">22</li>' .
                    '<hr id="idLi22Hr" style="">' .
                    '</div>' .
                    '<div  id="idLi21Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi21" data-modal="21">21</li>' .
                    '<hr id="idLi21Hr" style="">' .
                    '</div>' .
                    '<div id="idLi20Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi20" data-modal="20">20</li>' .
                    '<hr id="idLi20Hr" style="">' .
                    '</div>' .
                    '<div id="idLi19Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi19" data-modal="19">19</li>' .
                    '<hr id="idLi19Hr" style="">' .
                    '</div>' .
                    '<div id="idLi18Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi18" data-modal="18">18</li>' .
                    '<hr id="idLi18Hr" style="">' .
                    '</div>' .
                    '<div id="idLi17Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi17" data-modal="17">17</li>' .
                    '<hr id="idLi17Hr" style="">' .
                    '</div>' .
                    '<div id="idLi16Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi16" data-modal="16">16</li>' .
                    '<hr id="idLi16Hr" style="">' .
                    '</div>' .
                    '<div  id="idLi15Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi15" data-modal="15">15</li>' .
                    '<hr id="idLi15Hr" style="">' .
                    '</div>' .
                    '<div id="idLi14Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi14" data-modal="14">14</li>' .
                    '<hr id="idLi14Hr" style="">' .
                    '</div>' .
                    '<div id="idLi13Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi13" data-modal="13">13</li>' .
                    '<hr id="idLi13Hr" style="">' .
                    '</div>' .
                    '<div id="idLi12Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi12" data-modal="12">12</li>' .
                    '<hr id="idLi12Hr" style="">' .
                    '</div>' .
                    '<div id="idLi11Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi11" data-modal="11">11</li>' .
                    '<hr id="idLi11Hr" style="">' .
                    '</div>' .
                    '<div id="idLi10Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi10" data-modal="10">10</li>' .
                    '<hr id="idLi10Hr" style="">' .
                    '</div>' .
                    '<div id="idLi9Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi9" data-modal="9">9</li>' .
                    '<hr id="idLi9Hr" style="">' .
                    '</div>' .
                    '<div id="idLi8Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi8" data-modal="8">8</li>' .
                    '<hr id="idLi8Hr" style="">' .
                    '</div>' .
                    '<div id="idLi7Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi7" data-modal="7">7</li>' .
                    '<hr id="idLi7Hr" style="">' .
                    '</div>' .
                    '<div id="idLi6Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi6" data-modal="6">6</li>' .
                    '<hr id="idLi6Hr" style="">' .
                    '</div>' .
                    '<div id="idLi5Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi5" data-modal="5">5</li>' .
                    '<hr id="idLi5Hr" style="">' .
                    '</div>' .
                    '<div id="idLi4Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi4" data-modal="4">4</li>' .
                    '<hr id="idLi4Hr" style="">' .
                    '</div>' .
                    '<div id="idLi3Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi3" data-modal="3">3</li>' .
                    '<hr id="idLi3Hr" style="">' .
                    '</div>' .
                    '<div id="idLi2Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi2" data-modal="2">2</li>' .
                    '<hr id="idLi2Hr" style="">' .
                    '</div>' .
                    '<div id="idLi1Div" class="classLiTime" onclick="" data-info="">' .
                    '<li id="idLi1" data-modal="1">1</li>' .
                    '<hr id="idLi1Hr" style="">' .
                    '</div>' .
                    '</ul>' .
                    '</div>' .
                    '</div>' .
                    '</div>' .
                    '</div>' .
                    '</div>' .
                    /***************************************   POP-UP select slot  ************************************/
                    '</div>';
            }
        ?>
        </div>
    </body>

    <footer>
        <script>
            function function_affichage(){
                // CALL PHP PAGE (<form action="myPage.php" ..></form>)
                // CALL Ajax fonction
                // OR :

                // GET DATES
                let dateDebut = document.getElementById('idInputDateDebut');
                let dateFin = document.getElementById('idInputDateFin');
                // GET TIME
                let heureDebut = document.getElementById('idInputTimePickerDateDebut');
                let heureFin = document.getElementById('idInputTimePickerDateFin');
                // INSERT DATE AND TIME IN STRING
                let insertion = document.getElementById('p_insertion_en_dessous');
                let new_li = document.createElement('li');
                new_li.innerHTML = "Du " + dateDebut.value + " à " + heureDebut.value + " au " + dateFin.value + " à " + heureFin.value;
                insertion.appendChild(new_li);

                object = {
                    dateDebut_d: dateDebut.value.substring(0, 2),
                    dateDebut_m: dateDebut.value.substring(3, 5),
                    dateDebut_y: dateDebut.value.substring(6, 10),
                    dateDebut_h: heureDebut.value.substring(0 , 2),
                    dateDebut_i: heureDebut.value.substring(3 , 5),

                    dateFin_d: dateFin.value.substring(0, 2),
                    dateFin_m: dateFin.value.substring(3, 5),
                    dateFin_y: dateFin.value.substring(6, 10),
                    dateFin_h: heureFin.value.substring(0 , 2),
                    dateFin_i: heureFin.value.substring(3 , 5)
                };

                dates.push(object);

                // Replace CALENDAR by nex one
                Calendar.prototype.getHTML = function () {
                    return this.html;
                }

                cal = new Calendar();
                cal.generateHTML();
                document.getElementById('divCalendrierCreationDates').innerHTML = cal.getHTML();

                // Get all element with day class
                days = document.querySelectorAll('.day');
                offset = 0;

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
            }

        </script>
    </footer>
</html>

