var duskify = {
    
    onLoad: function() {
        // initialization code
        this.initialized = true;
        this.strings = document.getElementById("duskify-strings");
    },
    
    onDuskifyCommand: function(e) {
	all = content.document.getElementsByTagName("*");
	step(all,all.length,0);
    },
};

function step(all, maxNum, currentNum) {
    elemStyle = content.document.defaultView.getComputedStyle(all[currentNum],null);
    
    col = elemStyle.getPropertyValue('background-color');    if (col != "transparent")  all[currentNum].style.backgroundColor   = halve(col);
    col = elemStyle.getPropertyValue('color');               if (col != "rgb(0, 0, 0)") all[currentNum].style.color             = halve(col);
    col = elemStyle.getPropertyValue('border-top-color');    if (col != "rgb(0, 0, 0)") all[currentNum].style.borderTopColor    = halve(col);
    col = elemStyle.getPropertyValue('border-bottom-color'); if (col != "rgb(0, 0, 0)") all[currentNum].style.borderBottomColor = halve(col);
    col = elemStyle.getPropertyValue('border-left-color');   if (col != "rgb(0, 0, 0)") all[currentNum].style.borderLeftColor   = halve(col);
    col = elemStyle.getPropertyValue('border-right-color');  if (col != "rgb(0, 0, 0)") all[currentNum].style.borderRightColor  = halve(col);
    
    currentNum = currentNum + 1;
    if (currentNum < maxNum) step(all, maxNum, currentNum);
}

function halve(olde) {
    bits = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.exec(olde);
    
    channels = [ parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]) ];
    
    r = Math.round(channels[0]/2).toString(16);
    g = Math.round(channels[1]/2).toString(16);
    b = Math.round(channels[2]/2).toString(16);
    
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    
    return '#' + r + g + b;
}

window.addEventListener("load", function(e) { duskify.onLoad(e); }, false);
window.addEventListener("DOMContentLoaded", function(e) { duskify.onDuskifyCommand(e); }, false);