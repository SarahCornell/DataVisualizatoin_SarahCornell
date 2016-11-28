
//set up a global variable for the json data
var nations;
var myfont;
var legend;

var inputMouse = 0;
var inputRange = 0;
//setting the varibles for the inputs of the mouse

var colors = [];

function preload(){
  
  legend = loadImage('assets/Legend.png')
 
 nations = loadJSON("nations.json");
 myFont = loadFont('HelveticaNeue-Thin.otf');
}

function setup() {
  createCanvas(1200,1000);
  image(legend,0,0);
  
  //setting the color pallete for the circles
  colors = [color(63,11,140),color(92,193,168),color(121,183,60),color(168,217,95),color(244,233,114),color(250,225,115)];
  angleMode(DEGREES);
  inputRange = width/2
  
  //telling the computer to make things in degrees
  
  
}

function draw() {
  background(200);
  noStroke();
  textFont(myFont);
  fill(130,140,100);
  
  inputMouse = constrain(mouseX,width/2,width) - width/2;
 
  textSize(25);
  fill('white'); 
  text("How Income Effects Life Expectancy Based On Country",615,200);
  
  fill('black');
  ellipse(mouseX,mouseY,55,55,300,300);
  
  
  
  textSize(35);
  fill('white');
  //push and popping the Life Expectancy text
  push();
   translate(80,500);
   rotate(-90);
   text("Life Expectancy",0,0);
   pop();
   
   
   text("Income",600,850);
   
  
  //the year
  textSize(175);
  textAlign(LEFT);
  //flooring the mouse
  text(floor(map(inputMouse,0,width/2,1800,2009)),width*0.6,height*0.65);
    textSize(36);
  textAlign(CENTER);
  
  //loopin' time!!!
  //this creates a loop that goes
  //the super important bit
  for(var i = 0; i < 179;i++){
  var tempX = dataReturn(i,"income",200,800,inputMouse,inputRange);
  var tempY = dataReturn(i,"lifeExpectancy",height-20,0,inputMouse,inputRange);
  fill(i*2,200 - (i),200)

  dataEllipse(tempX,tempY,i,"population",20,50,inputMouse,inputRange);
}

  //creating the x and y lines
  stroke(42);
  line(100,50,100,800);
  
  stroke(42);
  line(100,800,1000,800);
  
  //draw the horizontal tick marks, set i equal to the start, and the i+= to the spacing
   textSize(25);
   for(var i = 150; i < 1000; i+=50){
     
      line(i,750,i,800);
      
      //map the i value to an actual income
      
      var incomeNumber = round(map(i,150,1000,0,100));
      push();
      translate(i-5,750);
      rotate(-90);
      text(incomeNumber + " K",0,0);
      pop();
   }
   
   //creating the vericle tick marks
   textSize(25);
   for(var j = 750; j > 0; j-=50){
     
      line(100,j,150,j);
      
      //map the i value to an actual income
      
      var lifeExpectancy = round(map(j,5,800,100,0));
      push();
      translate(140,j-5);
      rotate();
      text(lifeExpectancy + " Year",7,0);
      pop();
   } 
   
   image(legend,100,855);
  //the title for the legend
    fill('white');
    stroke('white');
    text("Legend",100,850);
    
     
   }


function dataEllipse (xpos,ypos,nationNumber,property,minSize,maxSize,inputPos,inputMax){
  
      var category = "nations[" + nationNumber + "]." + property;
      //preset the beginning of all queries
  
      var inputPropLength = eval(category + ".length-1");
      //varible to figure out how many population entries there are
  
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
  //this takes the X value of the mouse and maps it to the number of population entries
  
  inputProp = floor(inputProp);
  //so the numbers will not read in decimals
  
  inputProp = constrain(inputProp,0,inputPropLength);
  //constrain is used to limit the position
  
  var propName = "region";
  var region = eval("nations[" + nationNumber + "]." + propName);
  
  switch(region){
    case "America":
      fill(colors[0]);
    break;
      
    case "Europe & Central Asia":
      fill(colors[4]);
    break;
    
    case "Sub-Saharan Africa":
      fill(colors[1]);
    break;
    
    case "Middle East & North Africa":
      fill(colors[2]);
    break;
    
    case "East Asia & Pacific":
      fill(colors[3]);
    break;
    
    case "South Asia":
      fill(colors[5]);
    break;
    
    default:
      fill(0);
    break;
  }
  
  var visualizeProp = eval(category + "[inputProp][1]");
  //nations[country].property[entryNumberinJSON][year,value]
  
  visualizeProp = map(visualizeProp,0,140000000,minSize,maxSize);
  
      ellipse(xpos,ypos,visualizeProp,visualizeProp);
      
      fill(0);
      //text(eval(category + "[inputProp][1]"),xpos,ypos);    //adding the text center to the ellipse and inputing the actual population number as the text

  
}

function dataReturn(nationNumber,property,minRange,maxRange,inputPos,inputMax){
  var category = "nations[" + nationNumber + "]." + property;
      //preset the beginning of all queries
  
      var inputPropLength = eval(category + ".length-1");
      //varible to figure out how many population entries there are
  
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
  //this takes the X value of the mouse and maps it to the number of population entries
  
  inputProp = floor(inputProp);
  //so the numbers will not read in decimals
  
  inputProp = constrain(inputProp,0,inputPropLength);
  //constrain is used to limit the position
  
  var visualizeProp = eval(category + "[inputProp][1]");
  //nations[country].property[entryNumberinJSON][year,value]
  
  var properyMax = 0;
  
  if(property == "lifeExpectancy"){
  propertyMax = 90;
  
  visualizeProp = map(visualizeProp,0,propertyMax,minRange,maxRange);
  }
  if(property == "income"){
      propertyMax = 100000;
      
      //calculate the total visual space for the income
      var totalRange = maxRange - minRange;
      var lowerTwoThirds = minRange + (totalRange * .65);
      
      
      
      if(visualizeProp < 20000){
        //spread out the income over the first two thirds
        visualizeProp = map(visualizeProp,0,20000,minRange,lowerTwoThirds);
      }
      if(visualizeProp > 20000){
      visualizeProp = map(visualizeProp,20000,propertyMax,lowerTwoThirds,maxRange);
      }
    
  }
    
    
        return visualizeProp;
}

  //visualizeProp = map(visualizeProp,0,propertyMax,minRange,maxRange);
  
  //return visualizeProp;
  
