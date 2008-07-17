var duskify = {
    onLoad: function() {
        // initialization code
        this.initialized = true;
        this.strings = document.getElementById("duskify-strings");
    },

    onDuskifyCommand: function(e) {
	var allElements = content.document.getElementsByTagName("*");
	duskify.normalColors(allElements, allElements.length, 0);
    },

    normalColors: function(allElements, maxNum, currentNum) {
        var elemStyle = content.document.defaultView.getComputedStyle(allElements[currentNum], null);

        var color = elemStyle.getPropertyValue('background-color');
	if (color != "transparent")
	    allElements[currentNum].style.backgroundColor = duskify.halve(color);

	var color = elemStyle.getPropertyValue('color');
	if (color != "rgb(0, 0, 0)")
	    allElements[currentNum].style.color = duskify.halve(color);

	var color = elemStyle.getPropertyValue('border-top-color');
	if (color != "rgb(0, 0, 0)")
	    allElements[currentNum].style.borderTopColor = duskify.halve(color);

	var color = elemStyle.getPropertyValue('border-bottom-color');
	if (color != "rgb(0, 0, 0)")
	    allElements[currentNum].style.borderBottomColor = duskify.halve(color);

	var color = elemStyle.getPropertyValue('border-left-color');
	if (color != "rgb(0, 0, 0)")
	    allElements[currentNum].style.borderLeftColor = duskify.halve(color);
	var color = elemStyle.getPropertyValue('border-right-color');
	if (color != "rgb(0, 0, 0)")
	    allElements[currentNum].style.borderRightColor = duskify.halve(color);

        if (++currentNum < maxNum)
	    setTimeout(function() { duskify.normalColors(allElements, maxNum, currentNum); }, 0 );

    },

    halve: function(oldColor) {
        var bits = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.exec(oldColor);

        var channels = [ parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]) ];

        channels[0] = Math.round(channels[0]/2).toString(16);
        channels[1] = Math.round(channels[1]/2).toString(16);
        channels[2] = Math.round(channels[2]/2).toString(16);

        if (channels[0].length == 1) channels[0] = '0' + channels[0];
        if (channels[1].length == 1) channels[1] = '0' + channels[1];
        if (channels[2].length == 1) channels[2] = '0' + channels[2];

        return '#' + channels.join("");
    },
};

window.addEventListener("load", function(e) { duskify.onLoad(e); }, false);
