var appUrl = window.location.href; // document.URL;
var regExPatt = new RegExp('https://apps.spokanecounty.org');
var disclaimerStatus;
var showHelpOverlay = true;

var webservicePrefix = '';

if (!regExPatt.test(appUrl)) {
    webservicePrefix = '/courtdocumentviewer';

}////////////////////////////////////////////////

function formatAMPM(date) {
    if (!date) return '';
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;

} ////////////////////////////////////////////////

function formatTimeStrAMPM(time) {

    if (!time) return '';
    var hours = parseInt(time.substr(0, 2));
    var minutes = parseInt(time.substr(3, 2));
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime.toString();

} ////////////////////////////////////////////////

//function for converting json date to javascript date
function ParseJsonDate(dateString) {
    if (!dateString)
        return null;
    var milli = dateString.replace(/\/Date\((-?\d+)\)\//, '$1');
    var date = new Date(parseInt(milli));
    return date;

} ////////////////////////////////////////////////

//get short date format to display on the page
function getShortDate(date) {
    if (!date || date === 'not entered' || date == '01/01/1800')
        return 'not entered';

    date = new Date(date);

    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

} ////////////////////////////////////////////////

//function for determining age by birthdate
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;

} ////////////////////////////////////////////////

function escape(strVal) {
    return strVal.replace(/'/g, "\\'");

} ////////////////////////////////////////////////

function checkTextAreaMaxLength(textBox, e, length) {

    var mLen = textBox["MaxLength"];
    if (null == mLen)
        mLen = length;

    var maxLength = parseInt(mLen);
    if (!checkSpecialKeys(e)) {
        if (textBox.value.length > maxLength - 1) {
            if (window.event)//IE
                e.returnValue = false;
            else//Firefox
                e.preventDefault();
        }
    }

} ////////////////////////////////////////////////

function checkSpecialKeys(e) {
    if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40)
        return false;
    else
        return true;

} ////////////////////////////////////////////////

function openPrintWindow(content, w, h) {
    var printWindwo = window.open('', 'Printed_By_Spokane_County_Court_Document_Viewer', 'height=' + h + ', width=' + w + ', scrollbars=1, menubar=no, resizable=1');
    var printHtml = '<html><head><title>Print Window</title><style type="text/css" media="all"> html {overflow-x:hidden; overflow-y:auto; font-size: .80em; font-family: "Helvetica Neue", "Lucida Grande", "Segoe UI", Arial, Helvetica, Verdana, sans-serif;}h1, h2, h3, h4, h5, h6{font-size: 1.5em;color: #666666;font-variant: small-caps;text-transform: none;font-weight: 200;margin-bottom: 0px;}h1{font-size: 1.9em;padding-bottom: 0px;margin-bottom: 0px;font-family:Sintony;font-weight: 600;}h2{font-size: 1.5em;font-weight: bold;}h3{font-size: 1.2em;font-weight:bold;} table{border-collapse:collapse; border: solid 0px #666; margin-bottom:10px; width:800px;} td {padding:0 3px; vertical-align:text-top; width:auto;} font-family {arial helvetica sans-serif;}.borderTop {border-top:solid 1px #999; margin-top:20px; width:100%; padding-top:10px;}.borderBottom {border-bottom:solid 1px #999; margin-bottom:20px; width:100%; padding-bottom:10px;} a.print{margin-right:10px;} a.noprint, span.noprint {display:none;} span.printonly {display:normal;} .center{text-align:center;}</style><style type="text/css" media="print">a.print, a.printonly {display:none;}</style></head><body><div style="width:100%; margin-left:auto;margin-right:auto;">' + content + '</div></body></html>';
    //alert(printHtml);
    printWindwo.document.write(printHtml);
    printWindwo.document.close();
    printWindwo.window.location.reload();
    printWindwo.focus();
    printWindwo.print();
    printWindwo.close();
    return true;

} ////////////////////////////////////////////////

function printContent() {
    window.print();
    window.close();
    return true;

} ////////////////////////////////////////////////

//// get defendant aliases
//function getParticipantAliases(PersonToken) {
//    var xhr = $.ajax({
//        type: "POST",
//        url: webservicePrefix + "/CourtDocumentViewer/WebServices/CourtDocViewerService.asmx/GetParticipantAliases",
//        data: "{ PersonToken : '" + PersonToken + "' }",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        error: function (xhr) {
//            alert("An error occured: " + xhr.status + " " + xhr.statusText);
//        },
//        success: function (xhr) {
//            //alert('success');
//            alert(xhr.d);
//            //UpdateDisplay(xhr.d, CaseNo);
//            //LoadAttachments();
//        }
//    });

//} ////////////////////////////////////////////////

function isNotEmpty(el) {
    //alert(el.value);
    return (el.value == '' ? false : true)

}////////////////////////////////////////////////

function checkNameInput(el){
    var nameChars = /^[a-zA-Z '-,]+$/;
    if(!(el.value.match(nameChars))){
        return false;
    }
    return true;

} ////////////////////////////////////////////////

function okToShowHearing(notHeldReasonCode, officialName, proceedingTypeAndSub) {

    //make sure proceedingTypeAndSub is not null
    //if (proceedingTypeAndSub) {
        proceedingTypeAndSub = proceedingTypeAndSub.toString().toLowerCase();
    //}

    if ((officialName != 'CIVIL REVIEW JUDGE' || !officialName) && (proceedingTypeAndSub != 'mitemail' && proceedingTypeAndSub != 'othans' && proceedingTypeAndSub != 'othcivil' && proceedingTypeAndSub != 'othdism' && proceedingTypeAndSub != 'othdj' && proceedingTypeAndSub != 'othjoa' && proceedingTypeAndSub != 'othsc' && proceedingTypeAndSub != 'revadmin' && proceedingTypeAndSub != 'revah' && proceedingTypeAndSub != 'revcfd' && proceedingTypeAndSub != 'revclerk' && proceedingTypeAndSub != 'revdp' && proceedingTypeAndSub != 'revdv' && proceedingTypeAndSub != 'revd/f' && proceedingTypeAndSub != 'revd/pro' && proceedingTypeAndSub != 'revdomv' && proceedingTypeAndSub != 'revedef' && proceedingTypeAndSub != 'revfta' && proceedingTypeAndSub != 'revgc' && proceedingTypeAndSub != 'revg c' && proceedingTypeAndSub != 'revother' && proceedingTypeAndSub != 'revsa' && proceedingTypeAndSub != 'revwar' && proceedingTypeAndSub != 'senpsi')) {
        return true;
    }

    return false;
} ////////////////////////////////////////////////

//function toggleFullScreen() {
//    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
//      (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
//        if (document.documentElement.requestFullScreen) {
//            document.documentElement.requestFullScreen();
//        } else if (document.documentElement.mozRequestFullScreen) {
//            document.documentElement.mozRequestFullScreen();
//        } else if (document.documentElement.webkitRequestFullScreen) {
//            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
//        }
//    } else {
//        if (document.cancelFullScreen) {
//            document.cancelFullScreen();
//        } else if (document.mozCancelFullScreen) {
//            document.mozCancelFullScreen();
//        } else if (document.webkitCancelFullScreen) {
//            document.webkitCancelFullScreen();
//        }
//    }
//} ////////////////////////////////////////////////

$(document).ready(function () {
    // add highlight class to form elements on
    // focus and remove on blur
    $('.input').focus(function () {
        $(this).addClass('inputFocus');
        $(this).select();
    }).blur(function () {
        $(this).removeClass('inputFocus');
    });
});

jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    return this;

} ////////////////////////////////////////////////

