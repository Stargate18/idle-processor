var qbits = 0;
var qresets = 0;
var era = 0;
var time = 0;
var timemulti = 1;
var erapoints = [15,30,45,60,75]
var temporalUpgrades = {foundation:1, theory:1, algebra:1, combinatronics:1, geometry:1, topology:1, probability:1}
var upgrades = {money1:0, power1:0, storage1:0, network1:0, money2:0, power2:0, storage2:0, network2:0, money3:0, power3:0, storage3:0, network3:0, money4:0, power4:0, storage4:0, network4:0}
var quantumUpgrades = {era2:0, era3:0, era4:0, era5:0, era6:0, temporal:0, upgradet2:0, upgradet3:0, upgradet4:0, endgame:0}
var year = 0;
var totalunits = 2 ** 4;
var maxstorage = 50000;
var money = 12500;
var datastored = 0;
var spaceused = 0;
var power = 0;
var storage = 0;
var network = 0;
var qmulti = 1;
var qbitgain = 0;
var money3 = 1;
var money2 = 1;
var money1 = 1;
var moneyupgrade = 1;
var power3 = 1;
var power2 = 1;
var power1 = 1;
var powerupgrade = 1;
var storage3 = 1;
var storage2 = 1;
var storage1 = 1;
var storageupgrade = 1;
var network3 = 1;
var network2 = 1;
var network1 = 1;
var networkupgrade = 1;

class unit {
	constructor(name,displayname,cost,power,storage,network,size,owned) {
	this.name = name;
	this.displayname = displayname;
	this.cost = cost;
	this.power = power;
	this.storage = storage;
	this.network = network;
	this.size = size;
	this.owned = owned;
	};
	buyUnit() {
		if(money >= this.cost && Math.floor((spaceused + this.size) * qmulti) <= maxstorage){
			money = money - this.cost;
			this.owned = this.owned + 1;
		};
		valueRefresh()
	};
	sellUnit() {
		if(this.owned >= 1){
			money = money + this.cost;
			this.owned = this.owned - 1;
		};
		valueRefresh()
	};
};

var C1A = new unit("C1A","Vacuum Tube Processor",10000,5,0,0,30000,0)
var C1B = new unit("C1B","Punchcard Box",1000,0,16,0,10000,0)
var C1C = new unit("C1C","Deliveryman",1000,0,0,4,10000,0)

var C2A = new unit("C2A","Transistors Processor",15000,10,0,0,50000,0)
var C2B = new unit("C2B","Ring Container",1500,0,32,0,20000,0)
var C2C = new unit("C2C","Telegraph Machine",1500,0,0,8,20000,0)

var C3A = new unit("C3A","Circuit Processor",20000,20,0,0,90000,0)
var C3B = new unit("C3B","Floppy Rack",2000,0,48,0,30000,0)
var C3C = new unit("C3C","Fax Machine",2000,0,0,12,30000,0)

var C4A = new unit("C4A","VLSI Processor",30000,40,0,0,170000,0)
var C4B = new unit("C4B","Tape Rack",3000,0,64,0,40000,0)
var C4C = new unit("C4C","Modem Connection",3000,0,0,16,40000,0)

var C5A = new unit("C5A","ULSI Processor",40000,80,0,0,330000,0)
var C5B = new unit("C5B","Disc Folder",4000,0,96,0,50000,0)
var C5C = new unit("C5C","WiFi Router",4000,0,0,24,50000,0)

var C6A = new unit("C6A","Multicore Processor",60000,160,0,0,650000,0)
var C6B = new unit("C6B","SSD Chassis",6000,0,128,0,60000,0)
var C6C = new unit("C6C","Fiber Connection",6000,0,0,32,60000,0)

era1 = [C1A, C1B, C1C]
era2 = [C2A, C2B, C2C]
era3 = [C3A, C3B, C3C]
era4 = [C4A, C4B, C4C]
era5 = [C5A, C5B, C5C]
era6 = [C6A, C6B, C6C]

function saveGame() {
	var save = {
    money: money,
	year: year,
    qresets: qresets,
    qbits: qbits,
	datastored: datastored,
	totalunits: totalunits,
	upgrades: upgrades,
	quantumUpgrades: quantumUpgrades,
	temporalUpgrades: temporalUpgrades,
	C1Aowned: C1A.owned,
	C1Bowned: C1B.owned,
	C1Cowned: C1C.owned,
	C2Aowned: C2A.owned,
	C2Bowned: C2B.owned,
	C2Cowned: C2C.owned,
	C3Aowned: C3A.owned,
	C3Bowned: C3B.owned,
	C3Cowned: C3C.owned,
	C4Aowned: C4A.owned,
	C4Bowned: C4B.owned,
	C4Cowned: C4C.owned,
	C5Aowned: C5A.owned,
	C5Bowned: C5B.owned,
	C5Cowned: C5C.owned,
	C6Aowned: C6A.owned,
	C6Bowned: C6B.owned,
	C6Cowned: C6C.owned
	}
	localStorage.setItem("save",JSON.stringify(save));
}

function loadGame() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	var myTable = document.getElementById("purchases");
	var rowCount = myTable.rows.length;
	for (var x=rowCount-1; x>0; x--) {
	   myTable.deleteRow(x);
	}
	addEra(era1);
	if (savegame !== null) {
		var datetemp = new Date()
		if (typeof money !== "undefined") {
			money = savegame.money;
		}
		if (typeof savegame.year !== "undefined") {
			year = savegame.year;
		}
		if (typeof savegame.qresets !== "undefined") {
			qresets = savegame.qresets;
		}
		if (typeof savegame.qbits !== "undefined") {
			qbits = savegame.qbits
		}
		if (typeof savegame.datastored !== "undefined") {
			datastored = savegame.datastored
		}
		if (typeof savegame.totalunits !== "undefined") {
			totalunits = savegame.totalunits
		}
		if (typeof savegame.upgrades !== "undefined") {
			upgrades = savegame.upgrades
		}
		if (typeof savegame.quantumUpgrades !== "undefined") {
			quantumUpgrades = savegame.quantumUpgrades
		}
		if (typeof savegame.temporalUpgrades !== "undefined") {
			temporalUpgrades = savegame.temporalUpgrades
		}
		if (typeof savegame.C1Aowned !== "undefined") {
			C1A.owned = savegame.C1Aowned
		}
		if (typeof savegame.C1Bowned !== "undefined") {
			C1B.owned = savegame.C1Bowned
		}
		if (typeof savegame.C1Cowned !== "undefined") {
			C1C.owned = savegame.C1Cowned
		}
		if (typeof savegame.C2Aowned !== "undefined") {
			C2A.owned = savegame.C2Aowned
		}
		if (typeof savegame.C2Bowned !== "undefined") {
			C2B.owned = savegame.C2Bowned
		}
		if (typeof savegame.C2Cowned !== "undefined") {
			C2C.owned = savegame.C2Cowned
		}
		if (typeof savegame.C3Aowned !== "undefined") {
			C3A.owned = savegame.C3Aowned
		}
		if (typeof savegame.C3Bowned !== "undefined") {
			C3B.owned = savegame.C3Bowned
		}
		if (typeof savegame.C3Cowned !== "undefined") {
			C3C.owned = savegame.C3Cowned
		}
		if (typeof savegame.C4Aowned !== "undefined") {
			C4A.owned = savegame.C4aowned
		}
		if (typeof savegame.C4Bowned !== "undefined") {
			C4B.owned = savegame.C4Bowned
		}
		if (typeof savegame.C4Cowned !== "undefined") {
			C4C.owned = savegame.C4Cowned
		}
		if (typeof savegame.C5Aowned !== "undefined") {
			C5A.owned = savegame.C5Aowned
		}
		if (typeof savegame.C5Bowned !== "undefined") {
			C5B.owned = savegame.C5Bowned
		}
		if (typeof savegame.C5Cowned !== "undefined") {
			C5C.owned = savegame.C5Cowned
		}
		if (typeof savegame.C6Aowned !== "undefined") {
			C6A.owned = savegame.C6Aowned
		}
		if (typeof savegame.C6Bowned !== "undefined") {
			C6B.owned = savegame.C6Bowned
		}
		if (typeof savegame.C6Cowned !== "undefined") {
			C6C.owned = savegame.C6Cowned
		}
	}
	temporalMultiCalculate();
	quantumUpgradeCheck();
	buyUpgrade(0);
	valueRefresh();
}

function quantumReset(){
	year = 0;
	upgrades.money1 = 0;
	upgrades.power1 = 0;
	upgrades.storage1 = 0;
	upgrades.network1 = 0;
	qbits = qbits + qbitgain;
	totalunits = 2 ** 4;
	money = 12500;
	C1A.owned = 0;
	C1B.owned = 0;
	C1C.owned = 0;
	C2A.owned = 0;
	C2B.owned = 0;
	C2C.owned = 0;
	C3A.owned = 0;
	C3B.owned = 0;
	C3C.owned = 0;
	C4A.owned = 0;
	C4B.owned = 0;
	C4C.owned = 0;
	C5A.owned = 0;
	C5B.owned = 0;
	C5C.owned = 0;
	C6A.owned = 0;
	C6B.owned = 0;
	C6C.owned = 0;
	qresets = qresets + 1;
	valueRefresh();
};

function temporalMultiCalculate(){
	timemulti = 0;
	timemulti = (temporalUpgrades.foundation * 2) + (temporalUpgrades.theory * 3) + (temporalUpgrades.algebra * 4) + (temporalUpgrades.combinatronics * 6) + (temporalUpgrades.geometry * 8) + (temporalUpgrades.topology * 10) + (temporalUpgrades.probability * 12);
}

function qUpgrade(type){
	switch(type) {
		case 1:
			if(quantumUpgrades.era2 == 0 && qbits >= 1000){
				qbits = qbits - 1000;
				quantumUpgrades.era2 = 1;
			};
		break
		case 2:
			if(quantumUpgrades.era3 == 0 && qbits >= 5000){
				qbits = qbits - 5000;
				quantumUpgrades.era3 = 1
			};
		break
		case 3:
			if(quantumUpgrades.era4 == 0 && qbits >= 25000){
				qbits = qbits - 25000;
				quantumUpgrades.era4 = 1;
			};
		break
		case 4:
			if(quantumUpgrades.era5 == 0 && qbits >= 125000){
				qbits = qbits - 125000;
				quantumUpgrades.era5 = 1;
			};
		break
		case 5:
			if(quantumUpgrades.era6 == 0 && qbits >= 625000){
				qbits = qbits - 625000;
				quantumUpgrades.era6 = 1;
			};
		break
		case 6:
			if(quantumUpgrades.temporal == 0 && qbits >= 2000){
				qbits = qbits - 2000;
				quantumUpgrades.temporal = 1;
			};
		break
		case 7:
			if(quantumUpgrades.upgradet2 == 0 && qbits >= 10000){
				qbits = qbits - 10000;
				quantumUpgrades.upgradet2 = 1;
			};
		break
		case 8:
			if(quantumUpgrades.upgradet3 == 0 && qbits >= 50000){
				qbits = qbits - 50000;
				quantumUpgrades.upgradet3 = 1;
			};
		break
		case 9:
			if(quantumUpgrades.upgradet4 == 0 && qbits >= 250000){
				qbits = qbits - 250000;
				quantumUpgrades.upgradet4 = 1;
			};
		break
		case 10:
			if(quantumUpgrades.endgame == 0 && qbits >= 1250000){
				qbits = qbits - 1250000;
				quantumUpgrades.endgame = 1;
				alert("Congratulations! You beat the game in " + qresets + " quantum resets!")
				document.getElementById("qUpgrade10").style.display = "none";
			};
		break
		default:
		break
	}
	quantumUpgradeCheck();
}

function quantumUpgradeCheck(){
	if(quantumUpgrades.era2 == 1){
		addEra(era2);
		document.getElementById("qUpgrade1").style.display = "none";
	};
	if(quantumUpgrades.era3 == 1){
		addEra(era3);
		document.getElementById("qUpgrade2").style.display = "none";
	};
	if(quantumUpgrades.era4 == 1){
		addEra(era4);
		document.getElementById("qUpgrade3").style.display = "none";
	};
	if(quantumUpgrades.era5 == 1){
		addEra(era5);
		document.getElementById("qUpgrade4").style.display = "none";
	};
	if(quantumUpgrades.era6 == 1){
		addEra(era6);
		document.getElementById("qUpgrade5").style.display = "none";
	};
	if(quantumUpgrades.upgradet2 == 1){
		upgrade2elements = document.getElementsByClassName("upgrade2");
		for (i = 0; i < upgrade2elements.length; i++) {
		upgrade2elements[i].style.display = "block";
		} 
		document.getElementById("qUpgrade7").style.display = "none";
	};
	if(quantumUpgrades.upgradet3 == 1){
		upgrade3elements = document.getElementsByClassName("upgrade3");
		for (i = 0; i < upgrade3elements.length; i++) {
		upgrade3elements[i].style.display = "block";
		} 
		document.getElementById("qUpgrade8").style.display = "none";
	};
	if(quantumUpgrades.upgradet4 == 1){
		upgrade4elements = document.getElementsByClassName("upgrade4");
		for (i = 0; i < upgrade4elements.length; i++) {
		upgrade4elements[i].style.display = "block";
		} 
		document.getElementById("qUpgrade9").style.display = "none";
	};
	if(quantumUpgrades.temporal == 1){
		document.getElementById("temporaltab").style.display = "block";
		document.getElementById("qUpgrade6").style.display = "none";
	};
}

function temporalUpgrade(type){
	switch(type) {
		case 1:
			if(temporalUpgrades.foundation < 5 && qbits >= (4 * (2 ** temporalUpgrades.foundation))){
				qbits = qbits - (4 * (2 ** temporalUpgrades.foundation));
				temporalUpgrades.foundation = temporalUpgrades.foundation + 1;
			};
		break
		case 2:
			if(temporalUpgrades.theory < 5 && qbits >= (5 * (2 ** temporalUpgrades.theory))){
				qbits = qbits - (5 * (2 ** temporalUpgrades.theory));
				temporalUpgrades.theory = temporalUpgrades.theory + 1;
			};
		break
		case 3:
			if(temporalUpgrades.algebra < 5 && qbits >= (6 * (2 ** temporalUpgrades.algebra))){
				qbits = qbits - (6 * (2 ** temporalUpgrades.algebra));
				temporalUpgrades.algebra = temporalUpgrades.algebra + 1;
			};
		break
		case 4:
			if(temporalUpgrades.combinatronics < 5 && qbits >= (7 * (2 ** temporalUpgrades.combinatronics))){
				qbits = qbits - (7 * (2 ** temporalUpgrades.combinatronics));
				temporalUpgrades.combinatronics = temporalUpgrades.combinatronics + 1;
			};
		break
		case 5:
			if(temporalUpgrades.geometry < 5 && qbits >= (8 * (2 ** temporalUpgrades.geometry))){
				qbits = qbits - (8 * (2 ** temporalUpgrades.geometry));
				temporalUpgrades.geometry = temporalUpgrades.geometry + 1;
			};
		break
		case 6:
			if(temporalUpgrades.topology < 5 && qbits >= (9 * (2 ** temporalUpgrades.topology))){
				qbits = qbits - (9 * (2 ** temporalUpgrades.topology));
				temporalUpgrades.topology = temporalUpgrades.topology + 1;
			};
		break
		case 7:
			if(temporalUpgrades.probability < 5 && qbits >= (10 * (2 ** temporalUpgrades.probability))){
				qbits = qbits - (10 * (2 ** temporalUpgrades.probability));
				temporalUpgrades.probability = temporalUpgrades.probability + 1;
			};
		break
	}
	temporalMultiCalculate();
}

function valueRefresh(){
	document.getElementById("upgradeT1Cost").innerHTML = 4 * (2 ** temporalUpgrades.foundation);
	document.getElementById("upgradeT1Cost").innerHTML = 5 * (2 ** temporalUpgrades.theory);
	document.getElementById("upgradeT1Cost").innerHTML = 6 * (2 ** temporalUpgrades.algebra);
	document.getElementById("upgradeT1Cost").innerHTML = 7 * (2 ** temporalUpgrades.combinatronics);
	document.getElementById("upgradeT1Cost").innerHTML = 8 * (2 ** temporalUpgrades.geometry);
	document.getElementById("upgradeT1Cost").innerHTML = 9 * (2 ** temporalUpgrades.topology);
	document.getElementById("upgradeT1Cost").innerHTML = 10 * (2 ** temporalUpgrades.probability);
	document.getElementById("upgrade11Owned").innerHTML = upgrades.money1;
	document.getElementById("upgrade21Owned").innerHTML = upgrades.power1;
	document.getElementById("upgrade31Owned").innerHTML = upgrades.storage1;
	document.getElementById("upgrade41Owned").innerHTML = upgrades.network1;
	document.getElementById("upgrade12Owned").innerHTML = upgrades.money2;
	document.getElementById("upgrade22Owned").innerHTML = upgrades.power2;
	document.getElementById("upgrade32Owned").innerHTML = upgrades.storage2;
	document.getElementById("upgrade42Owned").innerHTML = upgrades.network2;
	document.getElementById("upgrade13Owned").innerHTML = upgrades.money3;
	document.getElementById("upgrade23Owned").innerHTML = upgrades.power3;
	document.getElementById("upgrade33Owned").innerHTML = upgrades.storage3;
	document.getElementById("upgrade43Owned").innerHTML = upgrades.network3;
	document.getElementById("upgrade14Owned").innerHTML = upgrades.money4;
	document.getElementById("upgrade24Owned").innerHTML = upgrades.power4;
	document.getElementById("upgrade34Owned").innerHTML = upgrades.storage4;
	document.getElementById("upgrade44Owned").innerHTML = upgrades.network4;
	document.getElementById("upgrade11Cost").innerHTML = 100 * (2 ** upgrades.money1);
	document.getElementById("upgrade21Cost").innerHTML = 100 * (2 ** upgrades.power1);
	document.getElementById("upgrade31Cost").innerHTML = 100 * (2 ** upgrades.storage1);
	document.getElementById("upgrade41Cost").innerHTML = 100 * (2 ** upgrades.network1);
	document.getElementById("upgrade12Cost").innerHTML = 1000 * (2 ** upgrades.money2);
	document.getElementById("upgrade22Cost").innerHTML = 1000 * (2 ** upgrades.power2);
	document.getElementById("upgrade32Cost").innerHTML = 1000 * (2 ** upgrades.storage2);
	document.getElementById("upgrade42Cost").innerHTML = 1000 * (2 ** upgrades.network2);
	document.getElementById("upgrade13Cost").innerHTML = 10000 * (2 ** upgrades.money3);
	document.getElementById("upgrade23Cost").innerHTML = 10000 * (2 ** upgrades.power3);
	document.getElementById("upgrade33Cost").innerHTML = 10000 * (2 ** upgrades.storage3);
	document.getElementById("upgrade43Cost").innerHTML = 10000 * (2 ** upgrades.network3);
	document.getElementById("upgrade14Cost").innerHTML = 100000 * (2 ** upgrades.money4);
	document.getElementById("upgrade24Cost").innerHTML = 100000 * (2 ** upgrades.power4);
	document.getElementById("upgrade34Cost").innerHTML = 100000 * (2 ** upgrades.storage4);
	document.getElementById("upgrade44Cost").innerHTML = 100000 * (2 ** upgrades.network4);
	document.getElementById("upgrade10Display").innerHTML = Math.floor(100 * (moneyupgrade));
	document.getElementById("upgrade20Display").innerHTML = Math.floor(100 * (powerupgrade));
	document.getElementById("upgrade30Display").innerHTML = Math.floor(100 * (storageupgrade));
	document.getElementById("upgrade40Display").innerHTML = Math.floor(100 * (networkupgrade));
	document.getElementById("upgrade11Display").innerHTML = Math.floor(100 * (money1 - 1));
	document.getElementById("upgrade21Display").innerHTML = Math.floor(100 * (power1 - 1));
	document.getElementById("upgrade31Display").innerHTML = Math.floor(100 * (storage1 - 1));
	document.getElementById("upgrade41Display").innerHTML = Math.floor(100 * (network1 - 1));
	document.getElementById("upgrade12Display").innerHTML = Math.floor(100 * (money2 - 1));
	document.getElementById("upgrade22Display").innerHTML = Math.floor(100 * (power2 - 1));
	document.getElementById("upgrade32Display").innerHTML = Math.floor(100 * (storage2 - 1));
	document.getElementById("upgrade42Display").innerHTML = Math.floor(100 * (network2 - 1));
	document.getElementById("upgrade13Display").innerHTML = Math.floor(100 * (money3 - 1));
	document.getElementById("upgrade23Display").innerHTML = Math.floor(100 * (power3 - 1));
	document.getElementById("upgrade33Display").innerHTML = Math.floor(100 * (storage3 - 1));
	document.getElementById("upgrade43Display").innerHTML = Math.floor(100 * (network3 - 1));
	document.getElementById("upgradeT1Cost").innerHTML = 4 * (2 ** temporalUpgrades.foundation);
	document.getElementById("upgradeT2Cost").innerHTML = 5 * (2 ** temporalUpgrades.theory);
	document.getElementById("upgradeT3Cost").innerHTML = 6 * (2 ** temporalUpgrades.algebra);
	document.getElementById("upgradeT4Cost").innerHTML = 7 * (2 ** temporalUpgrades.combinatronics);
	document.getElementById("upgradeT5Cost").innerHTML = 8 * (2 ** temporalUpgrades.geometry);
	document.getElementById("upgradeT6Cost").innerHTML = 9 * (2 ** temporalUpgrades.topology);
	document.getElementById("upgradeT7Cost").innerHTML = 10 * (2 ** temporalUpgrades.probability);
    document.getElementById("moneyDisplay").innerHTML = money;
	document.getElementById("qbitDisplay").innerHTML = qbits;
	document.getElementById("actualPowerDisplay").innerHTML = power;
	document.getElementById("storageDisplay").innerHTML = storage;
	document.getElementById("networkDisplay").innerHTML = network;
	document.getElementById("maxSpaceDisplay").innerHTML = maxstorage;
	document.getElementById("spaceDisplay").innerHTML = spaceused;
	document.getElementById("qmultiDisplay").innerHTML = ((qmulti) * 100);
	document.getElementById("yearDisplay").innerHTML = (year + 1946);
	document.getElementById("workDisplay").innerHTML = totalunits;
	document.getElementById("storedDisplay").innerHTML = datastored;
	qbitgain = Math.floor(((power + storage + network) * year) ** 1/2);
	document.getElementById("qbitGainDisplay").innerHTML = qbitgain;
};

function clearUnits(number){
	if(totalunits <= 0){
		datastored = datastored - totalunits;
		money = money + totalunits;
		totalunits = 0;
		nextBatch();
	} else {
		totalunits = totalunits - number;
		datastored = datastored - number;
		money = Math.floor(money + (number * (1.2 ** year) * (1.1 ** moneyupgrade)));
	};
    valueRefresh();
	document.getElementById("powerDisplay").innerHTML = number;
};

function nextBatch(){
	allowed = 0
	switch(year) {
		case 15:
			if(quantumUpgrades.era2 == 1){
				allowed = 1
			}
			break
		case 30:
			if(quantumUpgrades.era3 == 1){
				allowed = 1
			}
			break
		case 45:
			if(quantumUpgrades.era4 == 1){
				allowed = 1
			}
			break
		case 60:
			if(quantumUpgrades.era5 == 1){
				allowed = 1
			}
			break
		case 75:
			if(quantumUpgrades.era6 == 1){
				allowed = 1
			}
			break
		default:
			allowed = 1
	}
    if(allowed == 1) {
		year = year + 1
	}
	totalunits = Math.floor(2 ** (1/3 * (year + 4)))
	valueRefresh();
};

function buyUpgrade(type){
	switch(type) {
		case 11:
			if(upgrades.money1 < 5 && money >= (100 * (2 ** upgrades.money1))){
				money = money - (100 * (2 ** upgrades.money1));
				upgrades.money1 = upgrades.money1 + 1;
			};
		break
		case 21:
			if(upgrades.power1 < 5 && money >= (100 * (2 ** upgrades.power1))){
				money = money - (100 * (2 ** upgrades.power1));
				upgrades.power1 = upgrades.power1 + 1;
			};
		break
		case 31:
			if(upgrades.storage1 < 5 && money >= (100 * (2 ** upgrades.storage1))){
				money = money - (100 * (2 ** upgrades.storage1));
				upgrades.storage1 = upgrades.storage1 + 1;
			};
		break
		case 41:
			if(upgrades.network1 < 5 && money >= (100 * (2 ** upgrades.network1))){
				money = money - (100 * (2 ** upgrades.network1));
				upgrades.network1 = upgrades.network1 + 1;
			};
		break
		case 12:
			if(upgrades.money2 < 5 && money >= (1000 * (2 ** upgrades.money2))){
				money = money - (100 * (2 ** upgrades.money2));
				upgrades.money2 = upgrades.money2 + 1;
			};
		break
		case 22:
			if(upgrades.power2 < 5 && money >= (1000 * (2 ** upgrades.power2))){
				money = money - (100 * (2 ** upgrades.power2));
				upgrades.power2 = upgrades.power2 + 1;
			};
		break
		case 32:
			if(upgrades.storage2 < 5 && money >= (1000 * (2 ** upgrades.storage2))){
				money = money - (100 * (2 ** upgrades.storage2));
				upgrades.storage2 = upgrades.storage2 + 1;
			};
		break
		case 42:
			if(upgrades.network2 < 5 && money >= (1000 * (2 ** upgrades.network2))){
				money = money - (100 * (2 ** upgrades.network2));
				upgrades.network2 = upgrades.network2 + 1;
			};
		break
		case 13:
			if(upgrades.money3 < 5 && money >= (10000 * (2 ** upgrades.money3))){
				money = money - (100 * (2 ** upgrades.money3));
				upgrades.money3 = upgrades.money3 + 1;
			};
		break
		case 23:
			if(upgrades.power3 < 5 && money >= (10000 * (2 ** upgrades.power3))){
				money = money - (100 * (2 ** upgrades.power3));
				upgrades.power3 = upgrades.power3 + 1;
			};
		break
		case 33:
			if(upgrades.storage3 < 5 && money >= (10000 * (2 ** upgrades.storage3))){
				money = money - (100 * (2 ** upgrades.storage3));
				upgrades.storage3 = upgrades.storage3 + 1;
			};
		break
		case 43:
			if(upgrades.network3 < 5 && money >= (10000 * (2 ** upgrades.network3))){
				money = money - (100 * (2 ** upgrades.network3));
				upgrades.network3 = upgrades.network3 + 1;
			};
		break
		case 14:
			if(upgrades.money4 < 5 && money >= (100000 * (2 ** upgrades.money4))){
				money = money - (100 * (2 ** upgrades.money4));
				upgrades.money4 = upgrades.money4 + 1;
			};
		break
		case 24:
			if(upgrades.power4 < 5 && money >= (100000 * (2 ** upgrades.power4))){
				money = money - (100 * (2 ** upgrades.power4));
				upgrades.power4 = upgrades.power4 + 1;
			};
		break
		case 34:
			if(upgrades.storage4 < 5 && money >= (100000 * (2 ** upgrades.storage4))){
				money = money - (100 * (2 ** upgrades.storage4));
				upgrades.storage4 = upgrades.storage4 + 1;
			};
		break
		case 44:
			if(upgrades.network4 < 5 && money >= (100000 * (2 ** upgrades.network4))){
				money = money - (100 * (2 ** upgrades.network4));
				upgrades.network4 = upgrades.network4 + 1;
			};
		break
		default:
		break
	};
	if(upgrades.money1 == 5){
		document.getElementById("upgrade11button").style.display = "none";
	};
	if(upgrades.money2 == 5){
		document.getElementById("upgrade12button").style.display = "none";
	};
	if(upgrades.money3 == 5){
		document.getElementById("upgrade13button").style.display = "none";
	};
	if(upgrades.money4 == 5){
		document.getElementById("upgrade14button").style.display = "none";
	};
	if(upgrades.power1 == 5){
		document.getElementById("upgrade21button").style.display = "none";
	};
	if(upgrades.power2 == 5){
		document.getElementById("upgrade22button").style.display = "none";
	};
	if(upgrades.power3 == 5){
		document.getElementById("upgrade23button").style.display = "none";
	};
	if(upgrades.power4 == 5){
		document.getElementById("upgrade24button").style.display = "none";
	};
	if(upgrades.storage1 == 5){
		document.getElementById("upgrade31button").style.display = "none";
	};
	if(upgrades.storage2 == 5){
		document.getElementById("upgrade32button").style.display = "none";
	};
	if(upgrades.storage3 == 5){
		document.getElementById("upgrade33button").style.display = "none";
	};
	if(upgrades.storage4 == 5){
		document.getElementById("upgrade34button").style.display = "none";
	};
	if(upgrades.network1 == 5){
		document.getElementById("upgrade41button").style.display = "none";
	};
	if(upgrades.network2 == 5){
		document.getElementById("upgrade42button").style.display = "none";
	};
	if(upgrades.network3 == 5){
		document.getElementById("upgrade43button").style.display = "none";
	};
	if(upgrades.network4 == 5){
		document.getElementById("upgrade44button").style.display = "none";
	};
	money3 = 1.1 ** (upgrades.money4 + 1)
	money2 = money3 ** (upgrades.money3 + 1)
	money1 = money2 ** (upgrades.money2 + 1)
	moneyupgrade = money1 ** (upgrades.money1 + 1)
	power3 = 1.1 ** (upgrades.power4 + 1)
	power2 = power3 ** (upgrades.power3 + 1)
	power1 = power2 ** (upgrades.power2 + 1)
	powerupgrade = power1 ** (upgrades.power1 + 1)
	storage3 = 1.1 ** (upgrades.storage4 + 1)
	storage2 = storage3 ** (upgrades.storage3 + 1)
	storage1 = storage2 ** (upgrades.storage2 + 1)
	storageupgrade = storage1 ** (upgrades.storage1 + 1)
	network3 = 1.1 ** (upgrades.network4 + 1)
	network2 = network3 ** (upgrades.network3 + 1)
	network1 = network2 ** (upgrades.network2 + 1)
	networkupgrade = network1 ** (upgrades.network1 + 1)
	valueRefresh();
}

function progress(){
	power = 0;
	storage = 0;
	network = 0;
	spaceused = 0;
	for (x of [C1A, C1B, C1C, C2A, C2B, C2C, C3A, C3B, C3C, C4A, C4B, C4C, C5A, C5B, C5C, C6A, C6B, C6C]) {
		power = power + (x.power * x.owned);
		storage = storage + (x.storage * x.owned);
		network = network + (x.network * x.owned);
		spaceused = spaceused + (x.size * x.owned);
	};
	power = Math.floor(power * powerupgrade);
	storage = Math.floor(storage * storageupgrade);
	network = Math.floor(network * networkupgrade);
	qmulti = (0.999 ** (qbits ** 1/2))
	spaceused = spaceused * qmulti;
	datastored = datastored + network;
	if(datastored >= storage){
		datastored = storage
	};
	if(datastored >= (power * timemulti)){
		clearUnits(power * timemulti);
	} else {
		clearUnits(datastored);
	};
	document.getElementById("workDisplay").innerHTML = totalunits;
}

window.setInterval(function(){
	time = time + 1;
	if(time == 10){
	}
	progress();
}, 1000);

function addEra(unitstoadd){
	var unittable = document.getElementById("purchases");
	for (x of unitstoadd) {
		var row = unittable.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		cell1.innerHTML = x.displayname;
		cell2.innerHTML = x.cost; 
		cell3.innerHTML = x.power; 
		cell4.innerHTML = x.storage;  
		cell5.innerHTML = x.network; 
		cell6.innerHTML = x.size;		
		var buttona = document.createElement('input');
		buttona.setAttribute('class', 'autobutton');
		buttona.setAttribute('type', 'button');
		buttona.setAttribute('value', 'BUY');
		buttona.setAttribute('onclick', x.name.concat(".buyUnit()"));
		row.appendChild(buttona);
		var buttonb = document.createElement('input');
		buttonb.setAttribute('class', 'autobutton');
		buttonb.setAttribute('type', 'button');
		buttonb.setAttribute('value', 'SELL');
		buttonb.setAttribute('onclick', x.name.concat(".sellUnit()"));
		row.appendChild(buttonb);
	};
}

function mainTabs(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
} 

window.onload = function () {
	addEra(era1);
	upgrade2elements = document.getElementsByClassName("upgrade2");
	for (i = 0; i < upgrade2elements.length; i++) {
	upgrade2elements[i].style.display = "none";
	} 
	upgrade3elements = document.getElementsByClassName("upgrade3");
	for (i = 0; i < upgrade3elements.length; i++) {
	upgrade3elements[i].style.display = "none";
	} 
	upgrade4elements = document.getElementsByClassName("upgrade4");
	for (i = 0; i < upgrade4elements.length; i++) {
	upgrade4elements[i].style.display = "none";
	} 
	document.getElementById("temporaltab").style.display = "none";
	mainTabs(event, 'Shop');
	valueRefresh();
}