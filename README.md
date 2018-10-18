# TrainScheduler

## About This App

* This web app displays a train schdule. Information includes train name, destination, frequency, next arrival, and minutes away.

* Below the schedule is an entry form that allows for a user to enter new train information, including train name, destination, first train time, and frequency.


## How It Works

* This page uses jQuery, Bootstrap, Moment.js,  and Firebase.

* The information entered into the add train form is pushed into the linked Firebase.

* The information in Firebase is then pulled to the page when the page is loaded. This information is appended into the a new table row in the Current Train Schedule box.

* The page then uses Moment.js to calculate the next arrival and minutes away before appending it to the table.