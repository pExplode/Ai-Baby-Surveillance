img = "";
status = "";
objects = [];

function preload()
{
    alarm = loadSound("alarm.wav")
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}

function draw()
{
    image(video, 0, 0, 380, 380);
    
    if(status != "")
    {
        
        objectDetector.detect(video , gotResults);
        for(i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Object detected"; 
            fill("white");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("grey"); 
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

           if(objects[i].label == "person")
           {
             document.getElementById("status").innerHTML = "Baby detected";
             alarm.stop();
           }

           else
           {
            document.getElementById("status").innerHTML = "Baby not detected";
            alarm.play();
           }

           
              
        }
        if(objects.length == 0)
           {
            document.getElementById("status").innerHTML = "Baby not detected";
            alarm.play();
           }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results)
{
    if(error){
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}



