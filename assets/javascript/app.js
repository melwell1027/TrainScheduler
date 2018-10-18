// Initialize Firebase
var config = {
    apiKey: "AIzaSyC8-M5A96mnQIjKEz-Pphgpmp1pZwbB2xs",
    authDomain: "train-schedule-2c416.firebaseapp.com",
    databaseURL: "https://train-schedule-2c416.firebaseio.com",
    projectId: "train-schedule-2c416",
    storageBucket: "train-schedule-2c416.appspot.com",
    messagingSenderId: "541716270796"
};
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();

    //Creates temporary object for holding train data
    var newTrain = {
        name: trainName,
        destination: destinationInput,
        first: firstTrainTime,
        frequency: frequencyInput,
    };

    //Uploads employee data to the database
    database.ref().push(newTrain);

    alert("Train successfully added");

    // Clears all of the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
})

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {

    //Store everthing into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().first;
    var frequency = parseInt(childSnapshot.val().frequency);
    var firstTrain = moment(firstTrainTime, "HH:mm");
    var currentTime = moment();
    var difference = moment().diff(moment(firstTrain), "minutes");
    var remainder = difference % frequency;
    var minutesRemaining = frequency - remainder;
    var nextTrain = moment().add(minutesRemaining, "minutes").format("hh:mm A");

    //Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesRemaining)
    );

    //Append the new row to the table
    $("#train-schedule-table > tbody").append(newRow);
});