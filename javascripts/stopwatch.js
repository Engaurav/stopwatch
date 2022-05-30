// console.log("Hello");
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (params.lap !== undefined) {
  lapDisplay(params.lap);
}

lapContainerListDisplay();
let msec = 0;
let sec = 0;
let min = 0;
let hour = 0;
let start = false;
let reset = false;
let stopwatchStart = false;
let interval;

let lapData = [];
let lapStart = "00 : 00 : 00 : 00";
let lapEnd = "00 : 00 : 00 : 00";

function startStopwatch() {
  if (start == true) {
    return;
  }

  if (!stopwatchStart) {
    document.getElementById("tbody").innerHTML = "";
    stopwatchStart = true;
  }
  start = true;
  reset = true;

  document.getElementById("stop").classList.remove("disable");
  document.getElementById("lap").classList.remove("disable");
  document.getElementById("start").classList.add("disable");
  document.getElementById("reset").classList.add("disable");

  sec = document.getElementById("sec").innerHTML;
  min = document.getElementById("min").innerHTML;
  hour = document.getElementById("hour").innerHTML;
  msec = document.getElementById("msec").innerHTML;
  lapStart = hour + ":" + min + ":" + sec + ":" + msec;
  // console.log(lapStart);
  msec = parseInt(msec);
  sec = parseInt(sec);
  min = parseInt(min);
  hour = parseInt(hour);

  interval = setInterval(function () {
    msec += 1;
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
    if (msec == 100) {
      document.getElementById("msec").innerHTML = "00";
    } else if (msec < 10) {
      document.getElementById("msec").innerHTML = "0" + msec;
    } else {
      document.getElementById("msec").innerHTML = msec;
    }
  }, 10);
}

function stopStopwatch() {
  if (start === false) {
    return;
  }

  document.getElementById("stop").classList.add("disable");
  document.getElementById("lap").classList.add("disable");
  document.getElementById("start").classList.remove("disable");
  document.getElementById("reset").classList.remove("disable");

  sec = document.getElementById("sec").innerHTML;
  min = document.getElementById("min").innerHTML;
  hour = document.getElementById("hour").innerHTML;
  msec = document.getElementById("msec").innerHTML;

  start = false;
  clearInterval(interval);
}

function resetStopwatch() {
  if (reset === false) {
    document.getElementById("tbody").innerHTML = "";
    return;
  }
  stopwatchStart = false;
  start = false;
  reset = false;

  // saving lap data in local storage
  document.getElementById("tbody").innerHTML = "";
  let lapDataJson = JSON.stringify(lapData);
  localStorage.setItem(`${localStorage.length + 1}`, lapDataJson);
  clearInterval(interval);
  lapData = [];

  //showing leap data
  lapContainerListDisplay();

  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("hour").innerHTML = "00";
  document.getElementById("msec").innerHTML = "00";
}

function lapStopwatch() {
  let s = document.getElementById("sec").innerHTML;
  let m = document.getElementById("min").innerHTML;
  let h = document.getElementById("hour").innerHTML;
  let ms = document.getElementById("msec").innerHTML;
  lapEnd = h + ":" + m + ":" + s + ":" + ms;
  // console.log("Start",lapStart);
  // console.log("End",lapEnd);

  lapData.push({
    lapStart: lapStart,
    lapEnd: lapEnd,
  });
  console.log("Lapdata", lapData);

  let lapBody = document.getElementById("tbody");

  let laphtml = `<tr>
            <td>${lapData.length}</td>
            <td>${lapStart}</td>
            <td>${lapEnd}</td>
        </tr>`;
  lapBody.innerHTML += laphtml;

  lapStart = lapEnd;
}

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
