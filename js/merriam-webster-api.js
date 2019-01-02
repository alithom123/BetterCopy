// Merriam Webster Api
/*
Documentation here: 
URL for collegiate synonyms: https://dictionaryapi.com/products/api-collegiate-thesaurus
URL for intermediate-level synonyms: https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/umpire?key=your-api-key
*/

let apiCollegiateKey = "329cd6bf-de15-4cdb-803d-4cf1e77c5091";
let apiIntermediateKey = "7b4f3876-aada-4378-ab13-238225d04350";
let apiCollegiateBaseUrl = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/{word}?key={api-key}";
let apiIntermediateBaseUrl = "https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/{word}?key={api-key}";

function testImport() {
    console.log("The import worked!");
}


function findSynonymsMerriamWebsterDictionaryApi(word, successCallback) {
    console.log("Running findSynonymsMerriamWebsterDictionaryApi(" + word + ")");

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
    var apiUrl = apiCollegiateBaseUrl.replace("{word}", word).replace("{api-key}", apiCollegiateKey);
    console.log("Here is the apiUrl: " + apiUrl);

    console.log("url =" + apiUrl);
    var tableOfSynonyms = null;

    // console.log("appId =" + appId);
    // console.log("appKey =" + appKey);

    // $.getJSON(apiURL, function(result){
    //     console.log("Synonyms returned:");
    //     console.log(result);
    //     populateSynonyms(result);
    //     return result;
    // });
    // var authData = { 
    //     app_id: appId,
    //     app_key: appKey
    // }

    $.ajax({
        /* This came from Postman app sample code which seems pretty legit.  Must be about 
        doing it from client-side. */
            async: true,
            crossDomain: true,
            url: apiUrl,
            method: "GET",
            headers: {
            //   "app_id": "363a9ae7",
            //   "app_key": "57d756fb96d16375430f1a1aad3e7051",
              "Content-Type": "application/x-www-form-urlencoded",
            //   "cache-control": "no-cache",
            //   "Postman-Token": "6579f00d-d8c5-444f-84cb-fa2828102b23",
            //   "Access-Control-Allow-Origin": "*" // added by me.
            },
            data: "",
            // xhrFields: { withCredentials: true },
        //   }
        success: function(data, textStatus, jqXHR) {
            console.log("Success on api call with data: ");
            console.log(data);
            var standardizedData = standardizeSynonyms(data);
            console.log("standardizedData: ");
            console.log(standardizedData);
            successCallback(word, standardizedData);
            // return data;
        },
        error: function(xhr,status,errorThrown) {
            console.log("Here comes ajax error:");
            console.log(status);
            console.log(xhr);
            console.log(errorThrown);
            // return false;
        }
    });
}


function standardizeSynonyms(queryResult) {
    console.log("Running standardizeSynonyms");
    console.log(queryResult);

    var synonymsArray = [];
    
    for(var i=0; i<queryResult.length; i++) {
        var eachResult = queryResult[i];
        var obj = {
            partOfSpeech: null,
            synonyms: null,
            antonyms: null,
            shortDefinition: null
        };

        obj.partOfSpeech = eachResult.fl;
        obj.antonyms = eachResult.meta.ants[0];
        obj.synonyms = eachResult.meta.syns[0];
        obj.shortDefinition = eachResult.shortdef[0];

        synonymsArray.push(obj);

        console.log(queryResult[i]);
        // var synonyms = [];
        // var antonyms = [];
        // var shortDefinition = null;
    }
    return synonymsArray;
    /************** */

    var tabContent = $("<div>").addClass("tab-content").attr("id","tabContent");
    var firstIteration = true;
    var firstTab;
    $.each(synonyms, function(index, value) {
        // This loop builds the tables inside each tab.
        console.log("in synonyms each.");
        console.log("index = " + index);
        console.log("value = " + value);
        console.log("What is 'this'?");
        console.log(this);

        // TODO: Need to somehow set the active tab to the first one.
        var tabPane = $("<div>").addClass("tab-pane fade show").attr("id",index + "TabPane").attr("role","tabpanel");
        if(firstIteration) {
                tabPane.addClass("active");
                firstIteration = false;
                firstTab = index;
        }
        var table = $("<table>").addClass("table table-striped table-bordered table-hover table-sm").attr("id",index + "Table");
        var tbody = $("<tbody>").attr("id",index + "TableBody");

        var row = 0;
        var col = 0;
        var tr;
        var numSynonyms = this.syn.length;
        $.each(this.syn, function(wordIndex,wordValue){
            console.log("in each word loop = " + wordValue);
            console.log("What is 'this' now?");
            console.log(this);

            if(col === 0) {
                tr = $("<tr>").attr("id", "tr" + row);
            }

            var td = $("<td>").text(wordValue);
            tr.append(td);

            col = ( col+1 ) % maxWordsInRow;
            // If this word completes the row or is the end of the words, then add row to body.
            if(col === 0 || row * maxWordsInRow + col === numSynonyms ) {
                tbody.append(tr);
                row++;
            }
        });

        tabContent.append(tabPane.append(table.append(tbody)));
    });
    console.log("Heres your tabContent:");
    console.log(tabContent);

    // Create the tabs.
    var tabUnorderedList = $('<ul>').addClass("nav nav-tabs").attr("id","synonymTabs").attr("role","tablist");
    $.each(synonyms, function(index, value) {
            // This loop builds the tabs.
            console.log("in tab each.");
            console.log("index = " + index);
            console.log(value);
            var tabItem = $('<li>').addClass("nav-item");
            var anchorItem = $('<a>').addClass("nav-link")
                                    .attr("id",index)
                                    .attr("data-toggle","tab")
                                    .attr("href","#"+index)
                                    .attr("role","tab")
                                    .text(index);

            if(index === firstTab ) {
                anchorItem.addClass("active");
            }

            anchorItem.on("click", function() {
                console.log("Received the tab click");

                // Remove current tab with active status.
                $("div.tab-pane.active").removeClass("active");
                // Set active on the tabPane they just selected.
                $("#"+index+"TabPane").addClass("active");
            });

            tabItem.append(anchorItem);
            tabUnorderedList.append(tabItem);
        });

    $("#synonyms").append(tabUnorderedList);
    $("#synonyms").append(tabContent);
    console.log("tabUnorderedList:");console.log(tabUnorderedList);

}; // End of function populateSynonyms() {}

