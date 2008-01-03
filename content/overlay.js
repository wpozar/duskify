//todo
//- try to put ComputedStyle in a variable and use it for fg, bg and borders
//- add progress bar
//- display time it has taken to run extension, it should dissapear after couple of seconds
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
//	var bdy = content.document.getElementsByTagName('body')[0];
//	var all = bdy.getElementsByTagName('*');

//	var objStyle = objElement.ownerDocument.defaultView.getComputedStyle(objElement, null);
//		objRGB = objColour.getRGBColorValue();
//		var strRed = objRGB.red.getFloatValue(CSSPrimitiveValue.CSS_NUMBER).toString(16);

	for (var i=0; i<all.length; i++) {
//	    var elemStyle = content.document.defaultView.getComputedStyle(all[i],null);
	    //background
 	    if (content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('background-color') != "transparent")
 		all[i].style.backgroundColor = halve(content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('background-color'));
	    //foreground
	    if (content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('color') != "rgb(0, 0, 0)")
		all[i].style.color = halve(content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('color'));
	    //borders
	    if (content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('border-top-color') != "rgb(0, 0, 0)")
		all[i].style.borderTopColor = halve(content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('border-top-color'));
	    if (content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('border-bottom-color') != "rgb(0, 0, 0)")
		all[i].style.borderBottomColor = halve(content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('border-bottom-color'));
	    if (content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('border-left-color') != "rgb(0, 0, 0)")
		all[i].style.borderLeftColor = halve(content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('border-left-color'));
	    if (content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('border-right-color') != "rgb(0, 0, 0)")
		all[i].style.borderRightColor = halve(content.document.defaultView.getComputedStyle(all[i],null).getPropertyValue('border-right-color'));
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
    this.r = channels[0];
    this.g = channels[1];
    this.b = channels[2];
    
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
    
    r = Math.round(this.r/2).toString(16);
    g = Math.round(this.g/2).toString(16);
    b = Math.round(this.b/2).toString(16);
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    
    return '#' + r + g + b;
}

window.addEventListener("load", function(e) { duskify.onLoad(e); }, false);
