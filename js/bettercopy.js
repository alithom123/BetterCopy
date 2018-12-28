console.log("Running bettercopy.js.");

var input = '';
var wordsArray = new Array();
var headerHidden = false;
var currentTab = undefined;
var maxWordsInRow = 12;


// Create an enumeration for all the different parts of speech eg. noun, adj.
const partOfSpeech = Object.freeze({
    noun:   Symbol("noun"),
    adj:  Symbol("adj"),
    adv: Symbol("adv"),
    pron: Symbol("pron"),
    prep: Symbol("prep"),
    conjuction: Symbol("conjuction"),
    determiner: Symbol("determiner"),
    exclamation: Symbol("exclamation"),
});

// "http://words.bighugelabs.com/api/{version}/{api key}/{word}/{format}"
// JSON
// http://words.bighugelabs.com/api/2/32657501f1431228fdde18cf2c61bd16/word/json
let apiVersion="2";
let apiKey="32657501f1431228fdde18cf2c61bd16";
let apiBaseUrl = "http://words.bighugelabs.com/api";

function findSynonyms(word) {
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

function populateSynonyms(synonyms) {
    console.log("Running populateSynonyms");
    console.log(synonyms);

    // Build the tabContent, tabPanes, tables.
    // var tabContent = $("<div>").addClass("tab-content").attr("id",index + "TabContent");
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
        // var table = $("<thead>").addClass("table table-striped table-bordered table-hover table-sm");
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
            // tbody.append(tr.append(td));

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
                /* Need to add "active" class to the tabPane you created after this.
                Also need to remove active class from any others */

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


$(document).ready(function(){
    console.log("in document ready.");


    // Every time new text is entered into the textbox parse into buttons.
    // $('#input').on('input change paste', function() {
    $('#input').on('input', function() {
        console.log('on input change paste');

        // Once they start typing remove all the fluff.  The header.
        if(!headerHidden) {
            hideHeader();
        }

        // Parse text into words.
        var input = $('#input').val();

        // Break input into words array.
        wordsArray = input.match(/\b(\w+)\b/g);

        // Empty buttons before replacing them.
        $('.word-button').remove();

        // Create button for every word and put in <div id="buttons">.
        $(wordsArray).each(function(index, value) {
            // console.log( index + ": " + value);
//             var inputElement = document.createElement('input');
// inputElement.type = "button"
// inputElement.addEventListener('click', function(){
//     gotoNode(result.name);
// });
//
// ​document.body.appendChild(inputElement);​
            // var wordButton = document.createElement('button');
            // wordButton.type = "button";
            // wordButton.class =
            var wordButton = $("<button>")
                // .click(function() {
                //     var synonyms = findSynonyms(value);
                // })
                .addClass("word-button btn btn-primary")
                .append("<span>")
                .text(value);



            // wordButton.addEventListener('click', function() {
            //     findSynonyms(this);
            // });
            $("#buttons").append(wordButton);
            // Adding events to dynamically created events is a bit weird.
            // $("body").on("click",".word-button", function() {
            wordButton.on("click", function() {
                // console.log("simple demo of word button click handler.");
                    var synonyms = findSynonyms(value);
            });
            // console.log( wordButton.data('events') );
            // $('#buttons').append("<button type=button class=\"btn btn-primary word-button\" onclick=\"findSynonyms(" + this + ")\">" + this + "</button>");
            // $()
        });
    });
});

function hideHeader() {
    console.log("Running hideHeader.");
    console.log("header = ");
    console.log($("header"));

    // Hide the header.
    $("header").attr("style","display: none !important"); /* This is hacky but works
    whereas the methods below didn't because there's some styling with importants
    already being used */
    // $("header").hide();
    // $("header").hide();
    // $("header").css( "display", "none");
    // $("header").toggle();

    headerHidden = true;
}

function showHeader() {
    console.log("Running showHeader.");
    $("header").attr("style","display: block !important"); /* This is hacky but works */
    headerHidden = false;
}

function tabClicked() {

}
// Try this instead

// $.ajax({
//     type: 'GET',
//     url : 'path/to/json',
//     data : yourData,
//     dataType : 'json',
//     success : function( results ) {
//         console.log('success');
//     })
// });


//   <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">This is my profile.</div>


// <div class="tab-content" id="myTabContent">
//   <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
//       <table class="table table-striped table-bordered table-hover table-sm">
//         <thead class="thead-dark">
//           <tr>
//             <th scope="col">adj.</th>
//           </tr>
//           <tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>good</td>
//           </tr>
//           <tr>
//             <td>fantastic</td>
//           </tr>
//           <tr>
//             <td>swell</td>
//           </tr>
//         </tbody>
//       </table>
//   </div>
//   <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">This is my profile.</div>
//   <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">This is my contact.</div>
// </div>

// console.log();
// var word = "great";
// var format = "json";
// var apiURL = apiBaseUrl + "/" + apiVersion + "/" + apiKey + "/" + word + "/" + format;
// console.log("url =" + apiURL);
// var tableOfSynonyms = null;
//
// $.getJSON(apiURL, function(result){
//     console.log("here is your full result:");
//     console.log(result);
//
//     var table = $("<table>");
//     table.append("<thead>");
//
//     $.each(result, function(i, field){
//
//         console.log("Each result");
//         console.log(i);
//         console.log(field);
//         // $("thead").
//
//
//         // adjective
//         // {syn: Array(27), sim: Array(9)}
//         // sim: Array(9)
//         // 0: "big"
//         // 1: "enthusiastic"
//
//         // $("div").append(field + " ");
//
//         // var table = $("<table>");
//         // foreach()
//         // $('<div/>')
//         // .attr("id", "newDiv1")
//         // .addClass("newDiv purple bloated")
//         // .append("<span/>")
//         //   .text("hello world")
//
//     });
//
//     $("#input").after(table);
//
// });


// <ul class="nav nav-tabs" id="myTab" role="tablist">
//     <li class="nav-item">
//       <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
//     </li>
//     <li class="nav-item">
//       <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
//     </li>
//     <li class="nav-item">
//       <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
//     </li>
// </ul>

// $.each(obj, function (index, value) {
    // The index will be 'adjective', 'noun', 'adverb' etc.
    // The value will be another object like
    // 'sim':
    // [0: "close",
    // 1: "close-grained"] ...
    // console.log(value);
    // if(index === 'syn') {
    //     synonyms = this.syn;
    // } else if(index === 'sim'){
    //     similars = this.sim;
    // } else if(index === 'ant'){
    //     antonyms = this.ant;
    // } else if(index === 'rel'){
    //     related = this.rel;
    // }


// });



// var tableDiv = $('<div class="tab-content" id="synonyms-table">');
// tableDiv.append('<div class="tab-pane fade show active" id="">')

// * Here's a sample table *

// <!--  Build an actual table you could use. Trying tabs bootstrap example. -->
// <ul class="nav nav-tabs" id="myTab" role="tablist">
//     <li class="nav-item">
//       <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
//     </li>
//     <li class="nav-item">
//       <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
//     </li>
//     <li class="nav-item">
//       <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
//     </li>
// </ul>

// <div class="tab-content" id="myTabContent">
//   <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
//       <table class="table table-striped table-bordered table-hover table-sm">
//         <thead class="thead-dark">
//           <tr>
//             <th scope="col">adj.</th>
//           </tr>
//           <tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>good</td>
//           </tr>
//           <tr>
//             <td>fantastic</td>
//           </tr>
//           <tr>
//             <td>swell</td>
//           </tr>
//         </tbody>
//       </table>
//   </div>
//   <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">This is my profile.</div>
//   <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">This is my contact.</div>
// </div>
