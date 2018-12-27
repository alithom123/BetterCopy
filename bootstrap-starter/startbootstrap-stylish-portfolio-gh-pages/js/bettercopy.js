// PSUEDOCODE
// 1. Get text in textarea input everytime it changes.
// 2. Remove all punctuation.
// 3. Remove any numbers.
// 4. Split by spaces into words array.
// 5. For each word create a button.
// 6. Put all buttons in paragraph.
// 7. When a button is clicked, use thesaurus api to look up synonyms for word.
// 8. Put synonyms into array.
// 9. Display all synonyms as dropdown.
// 10. If user selects a synonym, then replace original word and button with new word.

var currentCopy = "";
var currentCopyArray = null;
var buttonArray = null;
let datamuseApiUrl = "http://api.datamuse.com/words";
var datamuseQueryParameters = null;

$(document).ready(

// var currentCopy = "";  // This broke. var needed to be defined first.

  function() {
    $('#copywriting').keyup(

      function() {

        // Get text from textarea.
        currentCopy = $('#copywriting').val();
        console.log("currentCopy = " + currentCopy);

        // Convert text to lowercase.
        currentCopy = currentCopy.toLowerCase();
        console.log("currentCopy = " + currentCopy);

        // Remove punctuation, numbers, etc.
        currentCopy = currentCopy.replace(/[^a-z]/g, ' ');
        console.log("currentCopy = " + currentCopy);

        // Split by spaces, tabs, etc into array.
        currentCopyArray = currentCopy.split(/\s+/);
        console.log("currentCopyArray = " + currentCopyArray);

        // Remove all the old buttons before adding the new ones.
        $("#copywritingButtons").empty();

        // Loop through each word
        $(currentCopyArray).each(function( index, element ) {
          // console.log( index );
          // console.log( index + ": " + $( this ).text() );
          // Create a button element for each word
          console.log(element);
          // var buttonHtml = "<span>" + element + "</span>";
          createButtonFromWord(element);

        });
    });

    function createButtonFromWord(word) {
        // var txt1 = "<span class=/"wordbutton/">" + word + "</span>";  // Create element with HTML
        var wordButton = $("<button class=\"wordbutton\"></button>").text(word);   // Create with jQuery
        $(wordButton).click(getSynonyms(word));
        // var txt3 = document.createElement("p");  // Create with DOM
        // txt3.innerHTML = "Text.";
        $("#copywritingButtons").append(wordButton); // Append the new elements
    }

    function getSynonyms(word) {

      console.log("getSynonyms called.");
      var apiUrl = datamuseApiUrl + "?rel_syn=" + word;
      // /words?rel_rhy=forgetful

      $.getJSON( apiUrl, function( data ) {
        var items = [];
        console.log("data = ");
        console.log(data);
        $.each( data, function( key, val ) {
          // items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

      // $( "<ul/>", {
      //   "class": "my-new-list",
      //   html: items.join( "" )
      // }).appendTo( "body" );
});

    }

  }
)


// var currentCopy = $('#copywriting').val();
// console.log("currentCopy = " + currentCopy);
