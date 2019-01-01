// "http://words.bighugelabs.com/api/{version}/{api key}/{word}/{format}"
// JSON
// http://words.bighugelabs.com/api/2/32657501f1431228fdde18cf2c61bd16/word/json

// Big Huge Labs Api
let apiVersion="2";
let apiKey="32657501f1431228fdde18cf2c61bd16";
let apiBaseUrl = "http://words.bighugelabs.com/api";

function findSynonymsBigHugeLabsApi(word) {
    console.log("Running findSynonyms(" + word + ")");

    // Clean out the old table & tabs. They are separate.
    // console.log("try to remove tabContent:");
    // console.log($("#tabContent"));
    $("#tabContent").remove();
    $("#synonymTabs").remove();


    var format = "json";
    var apiURL = apiBaseUrl + "/" + apiVersion + "/" + apiKey + "/" + word + "/" + format;
    console.log("url =" + apiURL);
    var tableOfSynonyms = null;

    $.getJSON(apiURL, function(result){
        console.log("Synonyms returned:");
        console.log(result);
        populateSynonyms(result);
        return result;
    });
}
