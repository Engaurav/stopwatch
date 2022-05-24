console.log("Hello");
let msec = 0;
let sec = 0;
let min = 0;
let hour = 0;
let start = false;
let interval;

function startStopwatch(){
    if(start==true){
        return;
    }
    start= true
    sec = document.getElementById('sec').innerHTML;
    min = document.getElementById('min').innerHTML;
    hour = document.getElementById('hour').innerHTML;
    msec = document.getElementById('msec').innerHTML; 
    msec = parseInt(msec);
    sec = parseInt(sec);
    min = parseInt(min);
    hour = parseInt(hour);
    

    interval= setInterval(function() {
        msec +=1;
        if(min>=60){
            hour += 1;
            min = 0;
            if(hour==60){
                document.getElementById('hour').innerHTML="00";
            }
            else if(hour<10){
                document.getElementById('hour').innerHTML="0" + hour;
            }else{
                document.getElementById('hour').innerHTML=hour;
            }
        }

        if(sec>=60){
            min += 1;
            sec = 0;
            if(min==60){
                document.getElementById('min').innerHTML="00";
            }
            else if(min<10){
                document.getElementById('min').innerHTML="0" + min;
            }else{
                document.getElementById('min').innerHTML=min;
            }

        }

        if(msec>=100){
            sec+=1;
            msec = 0;
            if(sec==60){
                document.getElementById('sec').innerHTML="00";
            }
            else if(sec<10){
                document.getElementById('sec').innerHTML="0" + sec;
            }else{
                document.getElementById('sec').innerHTML=sec;
            }
            
        }
        if(msec==100){
            document.getElementById('msec').innerHTML="00";
        }
        else if(msec<10){
            document.getElementById('msec').innerHTML="0" + msec;
        }else{
            document.getElementById('msec').innerHTML=msec;
        }   
    }, 10);
}



function stopStopwatch(){
    start = false;
    clearInterval(interval);
}



function resetStopwatch(){
    start = false;
    clearInterval(interval);
    document.getElementById('sec').innerHTML="00";
    document.getElementById('min').innerHTML="00";
    document.getElementById('hour').innerHTML="00";
    document.getElementById('msec').innerHTML="00"; 
}