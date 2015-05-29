var params;
var param_types;
var types;
var spin;
var spin_count;
var spinInterval;
var param_num;
var selected_type;
var wheel;
var ding;

var client = new XMLHttpRequest();
client.open('GET', '/items.txt');
client.onreadystatechange = function() {
  alert(client.responseText);
}
client.send();

function init() {
	params = ["wearing glasses", "wearing jeans", "wearing socks", "wearing a jacket", "wearing slip-on shoes", "wearing earring(s)", "wearing ring(s)", "wearing school colors", "wearing short sleeves", "wearing a black shirt", "carrying a purse", "a popped collar", "a writing utensil behind your ear", "pant leg(s) rolled up", "shoe(s) tied", "a ponytail"];
	param_types = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1];
	types = [["you are", "you aren't"], ["you have", "you don't have"], "you have 0"];
	spin = 10;
	spin_count = 0;
	spinInterval = 0;
	param_num = -1;
	selected_type = -1;
	wheel = document.getElementById("wheel");
	ding = document.getElementById("ding");
	document.getElementById("list").innerHTML = "";
	document.getElementById("param-begin-top").innerHTML = "&nbsp;";
	document.getElementById("param-begin-middle").innerHTML = "&nbsp;";
	document.getElementById("param-begin-bottom").innerHTML = "&nbsp;";
	document.getElementById("param-end-top").innerHTML = "&nbsp;";
	document.getElementById("param-end-middle").innerHTML = "&nbsp;";
	document.getElementById("param-end-bottom").innerHTML = "&nbsp;";
	document.getElementById("param-begin-button").disabled = true;
	if (document.getElementById("param-end-button").disabled) {
		document.getElementById("param-end-button").removeAttribute("disabled");
	}
}

function select_param() {
	wheel.pause();
	wheel.currentTime = 0;
	ding.play();
	if (spinInterval != 0) {
		clearInterval(spinInterval);
		spinInterval = 0;
		document.getElementById("reset").removeAttribute("disabled");
	}
	spin_count = 0;
	document.getElementById("param-begin-button").removeAttribute("disabled");
}

function random_param() {
	param_num = Math.floor(Math.random() * params.length);
	if (param_num > 0) {
		document.getElementById("param-end-top").innerHTML = params[param_num-1];
	}
	else {
		document.getElementById("param-end-top").innerHTML = "&nbsp;";
	}
	document.getElementById("param-end-middle").innerHTML = params[param_num];
	if (param_num < (params.length - 1)) {
		document.getElementById("param-end-bottom").innerHTML = params[param_num+1];
	}
	else {
		document.getElementById("param-end-bottom").innerHTML = "&nbsp;";
	}
	document.getElementById("param-begin-middle").innerHTML = "&nbsp;";
	document.getElementById("param-begin-top").innerHTML = "&nbsp;";
	document.getElementById("param-begin-bottom").innerHTML = "&nbsp;";
	spin_count++;
	if (spin_count >= spin) {
		select_param();
	}
}

function get_param() {
	ding.pause();
	ding.currentTime = 0;
	wheel.play();
	if (params.length > 1) {
		spinInterval = setInterval(random_param, 100);
	}
	else {
		random_param();
		select_param();
	}
	document.getElementById("param-end-button").disabled = true;
	document.getElementById("reset").disabled = true;
}

function select_type() {
	wheel.pause();
	wheel.currentTime = 0;
	ding.play();
	if (spinInterval != 0) {
		clearInterval(spinInterval);
		spinInterval = 0;
		document.getElementById("reset").removeAttribute("disabled");
	}
	spin_count = 0;
	var list = document.getElementById("list");
	list.innerHTML += selected_type + " " + params[param_num] + "<br />";
	params.splice(param_num, 1);
	param_types.splice(param_num, 1);
	if (params.length > 0) {
		document.getElementById("param-end-button").removeAttribute("disabled");
	}
}

function random_type() {
	var type = types[param_types[param_num]];
	if (type instanceof Array) {
		var type_num = Math.floor(Math.random() * type.length);
		if (type_num > 0) {
			document.getElementById("param-begin-top").innerHTML = type[type_num-1];
		}
		else {
			document.getElementById("param-begin-top").innerHTML = "&nbsp;";
		}
		document.getElementById("param-begin-middle").innerHTML = type[type_num];
		selected_type = type[type_num];
		if (type_num < (type.length - 1)) {
			document.getElementById("param-begin-bottom").innerHTML = type[type_num+1];
		}
		else {
			document.getElementById("param-begin-bottom").innerHTML = "&nbsp;";
		}
	}
	else {
		var amount = Math.floor(Math.random() * 3);
		if (amount > 0) {
			document.getElementById("param-begin-top").innerHTML = type.replace("0", (amount-1).toString());
		}
		else {
			document.getElementById("param-begin-top").innerHTML = "&nbsp;";
		}
		document.getElementById("param-begin-middle").innerHTML = type.replace("0", amount.toString());
		selected_type = type.replace("0", amount.toString());
		if (amount < 2) {
			document.getElementById("param-begin-bottom").innerHTML = type.replace("0", (amount+1).toString());
		}
		else {
			document.getElementById("param-begin-bottom").innerHTML = "&nbsp;";
		}
	}
	spin_count++;
	if (spin_count >= spin) {
		select_type();
	}
}

function get_type() {
	ding.pause();
	ding.currentTime = 0;
	wheel.play();
	spinInterval = setInterval(random_type, 100);
	document.getElementById("param-begin-button").disabled = true;
	document.getElementById("reset").disabled = true;
}

function get_int_width(param_middle) {
	var param_width = window.getComputedStyle(param_middle).width;
	return parseInt(param_width.substring(0, param_width.length-2));
}

function fix_width() {
	var fixed_width = 0;
	var param_middle = document.getElementById("param-end-middle");
	for (var i = 0; i < params.length; i++) {
		param_middle.innerHTML = params[i];
		var int_width = get_int_width(param_middle);
		if (int_width > fixed_width) {
			fixed_width = int_width;
		}
	}
	document.getElementById("param-end").setAttribute("style", "width: " + fixed_width.toString() + "px;");
	param_middle.innerHTML = "&nbsp;";
	
	fixed_width = 0;
	param_middle = document.getElementById("param-begin-middle");
	for (var i = 0; i < types.length; i++) {
		if (types[i] instanceof Array) {
			for (var j = 0; j < types[i].length; j++) {
				param_middle.innerHTML = types[i][j];
				var int_width = get_int_width(param_middle);
				if (int_width > fixed_width) {
					fixed_width = int_width;
				}
			}
		}
		else {
			param_middle.innerHTML = types[i];
			var int_width = get_int_width(param_middle);
			if (int_width > fixed_width) {
				fixed_width = int_width;
			}
		}
	}
	document.getElementById("param-begin").setAttribute("style", "width: " + fixed_width.toString() + "px;");
	param_middle.innerHTML = "&nbsp;";
}

window.onload = function() {
	init();
	fix_width();
}
