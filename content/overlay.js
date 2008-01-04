//todo
//- parse css "background" property for plain colours
//- add about box and sort out add-ons manager icons/description etc.
//- sort out hosting and automated upgrades on mozilla site
//- try timer based background duskifying
//- automatically duskify all pages (with on/off switch)

var duskify = {
    
    onLoad: function() {
        // initialization code
        this.initialized = true;
        this.strings = document.getElementById("duskify-strings");
    },
    
    onDuskifyCommand: function(e) {
//        date1=new Date();mills1=date1.getTime();
        
        var all = content.document.getElementsByTagName("*");
	var elemStyle; var col;
        
        for (var i=0; i<all.length; i++) {
            elemStyle = content.document.defaultView.getComputedStyle(all[i],null);
            
            col = elemStyle.getPropertyValue('background-color');    if (col != "transparent")  all[i].style.backgroundColor   = halve(col);
            col = elemStyle.getPropertyValue('color');               if (col != "rgb(0, 0, 0)") all[i].style.color             = halve(col);
            col = elemStyle.getPropertyValue('border-top-color');    if (col != "rgb(0, 0, 0)") all[i].style.borderTopColor    = halve(col);
            col = elemStyle.getPropertyValue('border-bottom-color'); if (col != "rgb(0, 0, 0)") all[i].style.borderBottomColor = halve(col);
            col = elemStyle.getPropertyValue('border-left-color');   if (col != "rgb(0, 0, 0)") all[i].style.borderLeftColor   = halve(col);
            col = elemStyle.getPropertyValue('border-right-color');  if (col != "rgb(0, 0, 0)") all[i].style.borderRightColor  = halve(col);
        }
        
//        date2=new Date();mills2=date2.getTime();alert(mills2-mills1);
    },
};

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
