/**
*
*   Author: Abbas Abdulmalik
*   Creation Date: March 24, 2015
*   Purpose: attempt at full sliding menu
*   Modified: N/A
*   Notes:
*
*
*/
//=============== basic famous core entities =====================
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface
var StateModifier = famous.modifiers.StateModifier;
var Easing = famous.transitions.Easing;
//=================================================================

//create outer container
var wrapper = new Engine.createContext();
// create back panel surface
var backPanel = new Surface({
  size: [innerWidth,innerHeight],
  properties: {
    background: '-webkit-radial-gradient(white,black)',
    background: '-ms-radial-gradient(white,black)',
    background: '-moz-radial-gradient(white,black)',
    background: 'radial-gradient(white,teal)',    
    fontFamily: 'sans-serif',
    background: 'url(images/leather.png)',
    color: 'white',
    zIndex: '-1'
  }
});
// create a modifier for the back panel
var backPanelMod = new Modifier({
    transform:  function(){  
                    backPanel.setSize([innerWidth,innerHeight]);
                },
});
// create sliding door

var slider = new Surface({   
    size: [innerWidth, innerHeight],
    properties: {
      fontSize: '30px',
      paddingTop: '20px',
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
      zIndex: '5',
      background: 'teal',
      boxShadow: '-0.4rem 0.25rem 1.5rem black',
      color: 'white',
    },
});
// create modifiers for the slider
//Modifiers apply their code every 1/60 of a second
var sliderMenu =    
    '<img src="images/menu.png" ' +
    'style="width:60px; height: 60px;  padding-left: 30px;cursor: pointer; z-index: 5; float: left;">'+
    '&nbsp;&nbsp;&nbsp;' +
    '<span >Three Apps</span>' +
    '<br><center><iframe style="border: none;" id="iframe"></iframe></center>'
;
var contentSet = false;
var sliderMod = new Modifier({
    align: [0,0],
    origin: [0,0],
    
    transform:  function(){
                var iframe = document.getElementById('iframe');
                    if(!contentSet){
                        contentSet = true;
                        slider.setContent(
                            sliderMenu
                        ); 
                    }
                    if(!!iframe){
                        iframe.style.width = 0.95*innerWidth +'px';
                        iframe.style.height = 0.8*innerHeight + 'px';
                    }
                    slider.setSize([innerWidth,innerHeight]); 
                    return Transform.translate(0,0,5)
                },
   
});
//StateModifiers apply their code as needed by the program(mer).
var oneShotMod = new StateModifier();
//======================make three image surfaces for the menu choices
var imageSize = 85;
var image1 = new ImageSurface({
    content: 'images/music.png',
    size: [imageSize, imageSize],
    properties: {
        borderRadius: imageSize/2 + 'px',
        boxShadow: '0.2rem 0.2rem 0.2rem black',
        cursor: 'pointer',        
        zIndex: '0',
    },
});
var image1Mod = new Modifier({
        align: [0.15, 0.05,0]
});
//------------------------------------------------------
var image2 = new ImageSurface({   
    content: 'images/map.png',    
    size: [imageSize, imageSize],
    properties: {
        borderRadius: imageSize/2 + 'px',
        boxShadow: '0.2rem 0.2rem 0.2rem black',
        cursor: 'pointer',
        zIndex: '0',        
    },
});
var image2Mod = new Modifier({
        align: [0.15, 0.35,0]
});
//------------------------------------------------------
var image3 = new ImageSurface({
    content: 'images/calculator.png',     
    size: [imageSize, imageSize],
    properties: {
        borderRadius: imageSize/2 + 'px',
        boxShadow: '0.2rem 0.2rem 0.2rem black',
        cursor: 'pointer',        
        zIndex: '0',        
    },
});
var image3Mod = new Modifier({
    align: [0.15, 0.65,0]
});
//------------------------------------------------------

//=================================================================
//place our surfaces and their modifiers in the outer container

wrapper.add(image1Mod).add(image1);
wrapper.add(image2Mod).add(image2);
wrapper.add(image3Mod).add(image3);

wrapper.add(backPanelMod).add(backPanel);
wrapper.add(oneShotMod).add(sliderMod).add(slider);
//=================================================
var open = false
slider.on('click',function(){
  if(!open){
    open = !open;
    oneShotMod.setTransform(
      Transform.translate(innerWidth/1.5,0,0),
      {duration: 200, curve: Easing.inOutQuint}     
    );   
  }
  else{
    open = !open;
    oneShotMod.setTransform(
      Transform.translate(0,0,0),
      {duration: 800, curve: Easing.outBounce}  
    );     
  }
});
backPanel.on('click',function(){
    closeSlider();
});
//==========================================
image1.on('click',function(){
    var iframe = document.getElementById('iframe');
    var pathPieces = iframe.src.split('/');
    var i = pathPieces.length - 2;
    var pathEnd = pathPieces[i] + '/' + pathPieces[i+1]
    var source = 'shuffletunes/index.html';  
    if(!iframe.src || pathEnd != source){
        iframe.src = source;         
    }
    closeSlider();
});
//--------------------------------------------------
image2.on('click',function(){    
    var iframe = document.getElementById('iframe');
    var pathPieces = iframe.src.split('/');
    var i = pathPieces.length - 2;
    var pathEnd = pathPieces[i] + '/' + pathPieces[i+1]
    var source = 'whereami/index.html';  
    if(!iframe.src || pathEnd != source){
        iframe.src = source;         
    }
    closeSlider();
});
//-------------------------------------------------
image3.on('click',function(){    
    var iframe = document.getElementById('iframe');
    var pathPieces = iframe.src.split('/');
    var i = pathPieces.length - 2;
    var pathEnd = pathPieces[i] + '/' + pathPieces[i+1]
    var source = 'applet/index.html';  
    if(!iframe.src || pathEnd != source){
        iframe.src = source;         
    }
    closeSlider();
});
//==========================================
function closeSlider(){
    open = false;
    oneShotMod.setTransform(
      Transform.translate(0,0,0),
      {duration: 800, curve: Easing.outBounce}  
    );     
};



