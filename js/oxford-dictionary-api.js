// Oxford Dictionary Api
/*
Documentation here: https://developer.oxforddictionaries.com/documentation#!/Thesaurus/get_entries_source_lang_word_id_synonyms
URL for synonyms: https://od-api.oxforddictionaries.com/api/v1/entries/en/pretty/synonyms
Headers:
    Accept: application/json
    app_id: 363a9ae7
    app_key: 57d756fb96d16375430f1a1aad3e7051

*/
let appId = "363a9ae7";
let appKey="57d756fb96d16375430f1a1aad3e7051";
let apiBaseUrl = "https://od-api.oxforddictionaries.com/api/v1/entries/en/{word}/synonyms";

function testImport() {
    console.log("The import worked!");
}


function findSynonymsOxfordDictionaryApi(word) {
    console.log("Running findSynonymsOxfordDictionaryApi(" + word + ")");

    // Clean out the old table & tabs. They are separate.
    // console.log("try to remove tabContent:");
    // console.log($("#tabContent"));
    // $("#tabContent").remove();
    /* This doesn't feel like it belongs here anymore.
    The javascript in this file should be strictly about using the api. */
    // $("#synonymTabs").remove();
    /* This doesn't feel like it belongs here anymore.
    The javascript in this file should be strictly about using the api. */

    // var apiURL = apiBaseUrl + "/" + apiVersion + "/" + apiKey + "/" + word + "/" + format;
    var apiUrl = apiBaseUrl.replace("{word}", word);
    console.log("Here is the apiUrl: " + apiUrl);

    console.log("url =" + apiUrl);
    var tableOfSynonyms = null;

    console.log("appId =" + appId);
    console.log("appKey =" + appKey);

    // $.getJSON(apiURL, function(result){
    //     console.log("Synonyms returned:");
    //     console.log(result);
    //     populateSynonyms(result);
    //     return result;
    // });
    var authData = { 
        app_id: appId,
        app_key: appKey
    }

    $.ajax({
        type: "GET",
        url: apiUrl,
        // dataType: 'json',
        // data: authData,
        async: false,
        // headers:
        // r = requests.get(url, headers = {'app_id': app_id, 'app_key': app_key})
            // {
            //     'Origin': "https://alithom123.github.io/BetterCopy/",
            //     'app_id': appId,
            //     'app_key': appKey
            // },
            // {
            // "Accept": "application/json",
            // "app_id": "363a9ae7",
            // "app_key": "57d756fb96d16375430f1a1aad3e7051"
            // },

        // headers: {
        // },
        /* The below is changing the pre-flight request which I don't think is what we want */
        // beforeSend: function(request) {
            // request.setRequestHeader("Authorization", 'key="mykey"');
            // request.setRequestHeader("Authorization", 'app_id="363a9ae7"');
            // request.setRequestHeader("Authorization", 'app_key="57d756fb96d16375430f1a1aad3e7051"');
            //     app_id: 363a9ae7
    // app_key: 57d756fb96d16375430f1a1aad3e7051
            // request.setRequestHeader("app_id", appId);
            // request.setRequestHeader("app_key", appKey);
        // },
        success: function(msg) {
            console.log("Success on api call with msg: " + msg);
        }
    });
    // $.ajax
//   ({
//     type: "GET",
//     url: "index1.php",
//     dataType: 'json',
//     async: false,
//     data: '{}',
//     beforeSend: function (xhr){ 
//         xhr.setRequestHeader('Authorization', make_base_auth(username, password)); 
//     },
//     success: function (){
//         alert('Thanks for your comment!'); 
//     }
// });
    //
    // $.ajax({
    //     type: "POST",
    //     beforeSend: function(request) {
    //         request.setRequestHeader("Authority", authorizationToken);
    //     },
    //     url: "entities",
    //     data: "json=" + escape(JSON.stringify(createRequestObject)),
    //     processData: false,
    //     success: function(msg) {
    //         $("#results").append("The result =" + StringifyPretty(msg));
    //     }
    // });
    //
    // xhr = new XMLHttpRequest();
    //
    // $(document).ready(function() {
    //   $.ajax({
    //     url: 'http://localhost:437/service.svc/logins/jeffrey/house/fas6347/devices?format=json',
    //     type: 'GET',
    //     datatype: 'json',
    //     success: function() { alert("Success"); },
    //     error: function() { alert('Failed!'); },
    //     beforeSend: setHeader
    //   });
    // });
    //
    // function setHeader(xhr) {
    //   xhr.setRequestHeader('Authorization', 'Basic faskd52352rwfsdfs');
    //   xhr.setRequestHeader('X-PartnerKey', '3252352-sdgds-sdgd-dsgs-sgs332fs3f');
    // }
}
