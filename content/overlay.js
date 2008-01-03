//todo
//- parse css "background" property for plain colours
//- add about box and sort out add-ons manager icons/description etc.
//- sort out hosting and automated upgrades on mozilla site

var duskify = {
    
    onLoad: function() {
	// initialization code
	this.initialized = true;
	this.strings = document.getElementById("duskify-strings");
    },
    
    onDuskifyCommand: function(e) {
	
	var all = content.document.getElementsByTagName("*");
	
	for (var i=0; i<all.length; i++) {
	    var elemStyle = content.document.defaultView.getComputedStyle(all[i],null);
	    
	    //background
 	    if (elemStyle.getPropertyValue('background-color') != "transparent")
 		all[i].style.backgroundColor = halve(elemStyle.getPropertyValue('background-color'));
	    
	    //foreground
	    if (elemStyle.getPropertyValue('color') != "rgb(0, 0, 0)")
		all[i].style.color = halve(elemStyle.getPropertyValue('color'));
	    
	    //borders
	    if (elemStyle.getPropertyValue('border-top-color') != "rgb(0, 0, 0)")
		all[i].style.borderTopColor = halve(elemStyle.getPropertyValue('border-top-color'));
	    if (elemStyle.getPropertyValue('border-bottom-color') != "rgb(0, 0, 0)")
		all[i].style.borderBottomColor = halve(elemStyle.getPropertyValue('border-bottom-color'));
	    if (elemStyle.getPropertyValue('border-left-color') != "rgb(0, 0, 0)")
		all[i].style.borderLeftColor = halve(elemStyle.getPropertyValue('border-left-color'));
	    if (elemStyle.getPropertyValue('border-right-color') != "rgb(0, 0, 0)")
		all[i].style.borderRightColor = halve(elemStyle.getPropertyValue('border-right-color'));
	}
    },
};

function process(bits) {
    return [ parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]) ];
};

function halve(olde) {
    re = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
    bits = re.exec(olde);
    
    channels = process(bits);
    r = channels[0];
    g = channels[1];
    b = channels[2];
    
    r = (r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r);
    g = (g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g);
    b = (b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b);
    
    r = Math.round(r/2).toString(16);
    g = Math.round(g/2).toString(16);
    b = Math.round(b/2).toString(16);
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    
    return '#' + r + g + b;
}

window.addEventListener("load", function(e) { duskify.onLoad(e); }, false);
