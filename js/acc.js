// global heightObjs for computed heights
var heightObjs = new Array(  );

// find computed height and set all to zero
function setHeight(objName) {
   var obj = document.getElementById(objName);
   var height = aaGetStyle(obj,'height');
   heightObjs[objName] = Math.round(parseFloat(height.substr(0,height.length-2)));
   obj.style.height="0";
}

function aaGetStyle(obj, styleName) {
   if (obj.currentStyle) 
      return obj.currentStyle[styleName];
   else if (document.defaultView && document.defaultView.getComputedStyle) 
      return document.defaultView.getComputedStyle(obj,null).getPropertyValue(styleName);
   return undefined;
} 

// set up panels
aaManageEvent(window,"load", function() {

   setHeight('one');
   setHeight('two');
   

   document.getElementById('oneplus').style.display='block';
   document.getElementById('twoplus').style.display='block';
});

// transitionally expand the item
function expand(newItem) {

  
   document.getElementById(newItem + 'plus').style.display='none';
   document.getElementById(newItem + 'negative').style.display='block';
   var currentItem = document.getElementById(newItem);

   // find increment based on computed height divided by loop count of 20
   var incr = heightObjs[newItem] / 20;
   for (var i=0; i < 20; i++) {
      var val = (i+1) * incr;
      var func = "adjustItem("+val+",'"+newItem+"')";
      setTimeout(func,(i+1)*30);
   }
}
// transitionally collapse the item
function collapse(newItem) {
   document.getElementById(newItem + 'plus').style.display='block';
   document.getElementById(newItem + 'negative').style.display='none';
   var currentItem = document.getElementById(newItem);

   // find decrement based on computed height divided by a loop count of 20
   var decr = heightObjs[newItem] / 20;
   for (var i=0; i<20; i++) {
      var val = heightObjs[newItem]-(decr*(i+1));
      var func = "adjustItem("+val+",'"+newItem+"')";
      setTimeout(func,(i+1)*30);
   }
}

// individual adjustment
function adjustItem(val, newItem) {
    document.getElementById(newItem).style.height=val + "px";
}

