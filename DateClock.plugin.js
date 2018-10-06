//META{"name":"clockPlugin"}*//

var clockPlugin = function () {};

clockPlugin.prototype.start = function () {
	BdApi.clearCSS("clockPluginCss");
	BdApi.injectCSS("clockPluginCss", '#clockPluginClock { position:absolute; color:#FFF; background:#00FFFFFF; padding:0 5px 0 5px; min-width:60px; max-width:60px; z-index:100; }');
	var self = this;
	this.clock = $("<div/>", { id: "clockPluginClock" });
	$("body").append(this.clock);

	this.pad = function(x) {
		return x < 10 ? '0'+x : x;
	};

	this.ticktock = function() {
		var d = new Date();
		var h = self.pad(d.getHours());
		var m = self.pad(d.getMinutes());
		var s = self.pad(d.getSeconds());
		var current_time = [h,m,s].join(':');
		self.clock.html(current_time.fontsize(2));
	};

	this.ticktock12 = function() {
		var suffix = "AM";
		var d = new Date();
		var h = d.getHours();
		var m = self.pad(d.getMinutes());
		var s = self.pad(d.getSeconds());
		
		var weekday = new Array(7);
		weekday[0] = "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";
		
		var ddd = weekday[d.getDay()];
		var mm = d.getMonth() + 1;
		if (mm < 10)
			mm = "0" + mm;
		var dd = d.getDate();
		if (dd < 10)
			dd = "0" + dd;
		var yyyy = d.getFullYear();

		if(h >= 12) {
			h -= 12;
			suffix = "PM";
		}
		if(h == 0)
			h = 12;
		
		var date = [mm,dd,yyyy].join("/");
		var current_time = [h,m,s].join(":");
		self.clock.html(date.fontsize(1) + " " + current_time.fontsize(2) + "&nbsp" + suffix.fontsize(1));
	};
	this.ticktock12();
	this.interval = setInterval(this.ticktock12, 50);
};

clockPlugin.prototype.load = function () {};

clockPlugin.prototype.unload = function () {};

clockPlugin.prototype.stop = function () {
	BdApi.clearCSS("clockPluginCss");
	clearInterval(this.interval);
	this.clock.remove();
};

clockPlugin.prototype.onMessage = function () {};

clockPlugin.prototype.onSwitch = function () {};

clockPlugin.prototype.observer = function (e) {};

clockPlugin.prototype.getSettingsPanel = function () {
    return "";
};

clockPlugin.prototype.getName = function () {
    return " Date Clock Plugin";
};

clockPlugin.prototype.getDescription = function () {
    return "Adds a date and clock to Discord";
};

clockPlugin.prototype.getVersion = function () {
    return "1.0.0";
};

clockPlugin.prototype.getAuthor = function () {
    return "lyjacky11";
};