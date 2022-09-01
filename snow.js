// init vars
vh = window.innerHeight;
vw = window.innerWidth;

var c = document.getElementById("canv");
var ctx = c.getContext("2d");

c.height = vh;
c.width = vw;

var FPS = 10;

var snowballAmount = 400;
var masterFallSpeed = 1;
var masterWindSpeed = 0;
var wobbleMaster = 2;
var wobbleSpeed = 2;
var gravity = 0;

// create snowballs
function Snowball(size,x,y,speed,wspeed,wobble){
    this.size = size,
    this.x = x,
    this.y = y,
    this.speed=speed,


    this.wspeed=wspeed,
    this.wobble=wobble
}

snowballs = [];

function createSnowball(size,x,y,s,op){
    return new Snowball(randomInteger(1,5),randomInteger(-500,vw+500),randomInteger(-1000,0),randomDecimal(masterFallSpeed*.8,masterFallSpeed*1.2,2),1,.2);
}

for (let x=0; x < snowballAmount; x++){
    snowballs.push(createSnowball(10,100,100,1));
}


// updates
function updateSnowball(s){

    if (s.y<vh){
        s.y+=s.speed+gravity;
    }else{
        s.y=randomInteger(-1000,0);
        s.x=randomInteger(-vw,vw*2);
    }

    s.x+=masterWindSpeed;
    
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.size,0,2*Math.PI);
    ctx.fillStyle="white"
    ctx.fill();
}

function update(){
    ctx.clearRect(0,0,c.width,c.height);

    for (x=0;x<snowballs.length;x++){
        updateSnowball(snowballs[x]);
    }
    
}

setInterval(update,FPS);

// functions
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDecimal(min, max, decimalPlaces) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}

// listeners
addEventListener('resize', (event) => {});

onresize = (event) => {
    vh = window.innerHeight;
    vw = window.innerWidth;
    c.height = vh;
    c.width = vw;
};

function changeWind(w){
    masterWindSpeed=parseInt(w);
    console.log(masterWindSpeed);
}

function changeGravity(g){
    gravity=parseInt(g);
    console.log(gravity);
}

function changeBalls(b){
    snowballs = [];
    for (let x=0; x < b; x++){
        snowballs.push(createSnowball(10,100,100,1));
    }
}
