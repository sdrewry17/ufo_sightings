//create variables to be used for the new sighting 
var $newDataTable = document.querySelector("tbody")


// Set dataSet to ufoData initially
var ufoData = dataSet


//add an event listener to teh date searchButton, call handleSearchButtonClick when clicked
d3.select("#searchDate").on("click", function(event) {
    d3.event.preventDefault();

    var filterDate = String(d3.select("#searchInput").node().value.trim());

    // Set the dataset to only include where the data matches the search input
    ufoData = dataSet.filter(function(event)  {
        var filteredSightings = String(event.datetime).includes(filterDate);
        return filteredSightings;
    });
    renderTable();
});


//resets the table upon clicking the button for clearing search results
d3.select("#clearSearch").on("click", function(event) {
    d3.event.preventDefault();
    ufoData = dataSet;
    renderTable();
});


// creates new event when the newUFO button is clicked
d3.select("#newUFO").on("click", function (event) {
    d3.event.preventDefault();
    var newRecord = {
        datetime: d3.select("#dateTime").node().value,
        city: d3.select("#city").node().value,
        state: d3.select("#state").node().value,
        country: d3.select("#country").node().value,
        shape: d3.select("#shape").node().value,
        durationMinutes: d3.select("#durationMinutes").node().value,
        comments: d3.select("#comments").node().value
    };

    console.log(newRecord)
    dataSet.push(newRecord);
    renderTable();
});


// renderTable renders the ufoData to the tbody
function renderTable() {
    $newDataTable.innerHTML = "";
    for (var i = 0; i < ufoData.length; i++) {
        // Get the current ufo sighting and its fields
        var sighting = ufoData[i];
        var fields = Object.keys(sighting);
        // Insert a row into the table at position i
        var $row = $newDataTable.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            // For every field in the address object, create a new cell 
            // at set its inner text to be the current value at the 
            // current address's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = sighting[field];
        }
    }
};

// createNewEvent takes input from the designated fields and pushes to the data file; 
// then re-renders the table


// Render the table for the first time on page load
renderTable();



// ufoData.foreach(Date.parse(ufoData.datetime));

// ufoData.sort(function (a, b){
//     return b.datetime - a.datetime
// });
