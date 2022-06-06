// Fetching URL Paramters to deal with Stored Laps
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries()); //convering urlSearchParams in Key Value Pair




// Calling lapDisplay to Show the Lap data if Defined
if (params.lap !== undefined) {
  lapDisplay(params.lap);
}



// Calling LapContainerDisplay Function to Show the List of Saved Laps Records
lapContainerListDisplay();




//Start: Initialising Diffent type variables to be used in our website

let msec = 0; //to deal with mili-second value in html
let sec = 0; //to deal with second value in html
let min = 0; //to deal with minute value in html
let hour = 0; //to deal with hour value in html

let start = false; //start is boolean variable to deal with buttons and functionality of apps
let reset = false; //reset is boolean variable to deal with buttons and functionality of apps
let stopwatchStart = false; //boolean value to deal with showing button
let interval; //interval is used to store the interval so that it can be used to clear the interval
let lapData = []; //lapdata is an array to store current laps data
let lapStart = "00 : 00 : 00 : 00"; //it used used to show the starting value after reset
let lapEnd = "00 : 00 : 00 : 00";
//End: Initialising Diffent type variables to be used in our website





// Start : Function to deal with starting the stop watch when it was called by Start Button
function startStopwatch() {
  if (start == true) {
    //Checking if Stopwatch is already started
    return; //if stopwatch is already start return from here
  }

  if (!stopwatchStart) {
    //Checking that stopwatch is started first time
    document.getElementById("tbody").innerHTML = ""; //if it started first time delete all current lap record data
    stopwatchStart = true;
  }

  start = true; //setting start boolean to true
  reset = true; //setting reset boolean to true

  //Start: here we are enabling stop and lap button and disabling start and reset
  document.getElementById("stop").classList.remove("disable");
  document.getElementById("lap").classList.remove("disable");
  document.getElementById("start").classList.add("disable");
  document.getElementById("reset").classList.add("disable");
  //End: here we are enabling stop and lap button and disabling start and reset

  // Here we are Fething all the current start of all the values
  sec = document.getElementById("sec").innerHTML;
  min = document.getElementById("min").innerHTML;
  hour = document.getElementById("hour").innerHTML;
  msec = document.getElementById("msec").innerHTML;

  // after fetching all values we are saving in lapStart string to start again fro where we left
  lapStart = hour + ":" + min + ":" + sec + ":" + msec;

  // Here We are Parsing all values in Integer
  msec = parseInt(msec);
  sec = parseInt(sec);
  min = parseInt(min);
  hour = parseInt(hour);

  // Start : Here We creating set-Interval to deal with all required value

  interval = setInterval(function () {
    //storing setInterval in interval

    msec += 1; //here we are increasing the msec value at every milisec setInterval is Called

    // Here we are dealing with minute value changing it at every 60 min
    if (min >= 60) {
      hour += 1;
      min = 0;
      if (hour == 60) {
        document.getElementById("hour").innerHTML = "00";
      } else if (hour < 10) {
        document.getElementById("hour").innerHTML = "0" + hour;
      } else {
        document.getElementById("hour").innerHTML = hour;
      }
    }

    // Here we are dealing with second value changing it at every 60 second
    if (sec >= 60) {
      min += 1;
      sec = 0;
      if (min == 60) {
        document.getElementById("min").innerHTML = "00";
      } else if (min < 10) {
        document.getElementById("min").innerHTML = "0" + min;
      } else {
        document.getElementById("min").innerHTML = min;
      }
    }

    // Here we are dealing with mili-second value changing it at every 99 mili-second
    if (msec >= 100) {
      sec += 1;
      msec = 0;
      if (sec == 60) {
        document.getElementById("sec").innerHTML = "00";
      } else if (sec < 10) {
        document.getElementById("sec").innerHTML = "0" + sec;
      } else {
        document.getElementById("sec").innerHTML = sec;
      }
    }

    // Here we are chaning the milisecond value to 00 after every 100milisecond
    if (msec == 100) {
      document.getElementById("msec").innerHTML = "00";
    } else if (msec < 10) {
      document.getElementById("msec").innerHTML = "0" + msec;
    } else {
      document.getElementById("msec").innerHTML = msec;
    }
  }, 10);
}

// End : Function to deal with starting the stop watch when it was called by Start Button













// Start : Function to deal with stoping the stopwatch when it was called by Stop Button

function stopStopwatch() {
  if (start === false) {
    //here we are checking if stopwatch is already stopped then we return from here
    return;
  }



  //Start: here we are disabling stop and lap button and enabling start and reset

  document.getElementById("stop").classList.add("disable");
  document.getElementById("lap").classList.add("disable");
  document.getElementById("start").classList.remove("disable");
  document.getElementById("reset").classList.remove("disable");
  //End: here we are disabling stop and lap button and enabling start and reset


  
  // Here we are Fething all the current start of all the values
  sec = document.getElementById("sec").innerHTML;
  min = document.getElementById("min").innerHTML;
  hour = document.getElementById("hour").innerHTML;
  msec = document.getElementById("msec").innerHTML;

  start = false;          //changing start boolean to false
  clearInterval(interval);    //clearing interval to stop the stopwatch
}

// End : Function to deal with stoping the stopwatch when it was called by Stop Button







// Start : Function to deal with reseting the stopwatch when it was called by Reset Button
function resetStopwatch() {
  if (reset === false) {        //checking if reset is false we are clearing lap detail table
    document.getElementById("tbody").innerHTML = "";
    return;
  }


  //.....
  stopwatchStart = false;     
  start = false;
  reset = false;    //....Changing all boolean values to false

  // saving lap data in local storage
  document.getElementById("tbody").innerHTML = "";
  let lapDataJson = JSON.stringify(lapData);
  localStorage.setItem(`${localStorage.length + 1}`, lapDataJson);
  clearInterval(interval);
  lapData = [];         //clearing all current lap data


  //showing new added lap data in lap container
  lapContainerListDisplay();


  // Reseting all the values to 00
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("hour").innerHTML = "00";
  document.getElementById("msec").innerHTML = "00";
}

// End : Function to deal with reseting the stopwatch when it was called by Reset Button






// Start : Function to deal with current lap of stopwatch when it was called by Lap Button
function lapStopwatch() {

  // {.... getting all the value
  let s = document.getElementById("sec").innerHTML;
  let m = document.getElementById("min").innerHTML;
  let h = document.getElementById("hour").innerHTML;
  let ms = document.getElementById("msec").innerHTML;
  //in new varialbes....}


  lapEnd = h + ":" + m + ":" + s + ":" + ms;      //saving lap end time in lapEnd string 



  // Pusing Current Lap Data in lapData array
  lapData.push({
    lapStart: lapStart,
    lapEnd: lapEnd,
  });

  
  // getting table body element to show the lap data detail
  let lapBody = document.getElementById("tbody");

  // Here we add the current lap data in our table
  let laphtml = `<tr>
            <td>${lapData.length}</td>
            <td>${lapStart}</td>
            <td>${lapEnd}</td>
        </tr>`;
  lapBody.innerHTML += laphtml;



  // changing lapStart to current LapEnd for Next Lap
  lapStart = lapEnd;
}




// Funtion to Display the List of Stored Laps Record in LapContainer Div
function lapContainerListDisplay() {
  let lapContainerList = document.getElementById("lap-conatiner-list");
  lapContainerList.innerHTML = "";
  for (let i = 1; i <= localStorage.length; i++) {
    let lapContainerHtml = ` <a class="lap-link" href="?lap=${i}">
                <div class="lap-container">
                    <span class="lap-text-click">Details of</span>
                    <span class="lap-text">#Lap ${i}</span>
                </div>
            </a>`;
    lapContainerList.innerHTML += lapContainerHtml;
  }
}


// Function to Display the Saved Lap data according to the params of lapdata
function lapDisplay(id) {
  let lapOldData = localStorage.getItem(id);
  lapOldData = JSON.parse(lapOldData);

  let lapBody = document.getElementById("tbody");

  lapOldData.map((data, index) => {
    let laphtml = `<tr>
            <td>${index + 1}</td>
            <td>${data.lapStart}</td>
            <td>${data.lapEnd}</td>
        </tr>`;
    lapBody.innerHTML += laphtml;
  });
}
