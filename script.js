let toothpaste = 0;
let toothpastePerClick = 1;
let toothpastePerSecond = 0;
let plaque = 100;
let totalTeethCleaned = 0;
let teethPerRow = 10;
let rowCleaned = false;
let plaqueReduction = 1;
let flossActive = false;
let mouthwashActive = false;
let efficiencyBonus = 1;

// Upgrade costs
const upgradeCosts = {
    1: 10,    // Manual Toothbrush
    2: 50,    // Electric Toothbrush
    3: 100,   // Dental Floss
    4: 200,   // Mouthwash
    5: 500    // Teeth Whitening Strips
};

function updatePoints() {
    document.getElementById('points').innerText = `Toothpaste: ${toothpaste}`;
    document.getElementById('plaque-status').innerText = `Plaque: ${plaque}`;
    
    // Show the prestige button if enough teeth are cleaned
    if (totalTeethCleaned >= teethPerRow && rowCleaned) {
        document.getElementById('prestige-btn').style.display = "block";
    }
}

function cleanTooth() {
    if (plaque > 0) {
        plaque -= toothpastePerClick * plaqueReduction;
        plaque = Math.max(plaque, 0);
        toothpaste += toothpastePerClick;
        if (plaque === 0) {
            totalTeethCleaned++;
            rowCleaned = true;
            plaque = 100;  // Move to the next tooth
        }
    }
    updatePoints();
}

function buyUpgrade(upgrade) {
    if (toothpaste >= upgradeCosts[upgrade]) {
        toothpaste -= upgradeCosts[upgrade];

        switch (upgrade) {
            case 1:
                toothpastePerClick += 1;
                document.getElementById('upgrade1').disabled = true;
                break;
            case 2:
                toothpastePerSecond += 1;
                document.getElementById('upgrade2').disabled = true;
                break;
            case 3:
                flossActive = true;
                document.getElementById('upgrade3').disabled = true;
                break;
            case 4:
                mouthwashActive = true;
                setTimeout(() => mouthwashActive = false, 10000);  // 10 seconds effect
                document.getElementById('upgrade4').disabled = true;
                break;
            case 5:
                efficiencyBonus += 0.2;
                document.getElementById('upgrade5').disabled = true;
                break;
        }
    }
    updatePoints();
}

function incrementToothpaste() {
    if (plaque > 0) {
        toothpaste += toothpastePerSecond * efficiencyBonus;
        plaque -= toothpastePerSecond;
        plaque = Math.max(plaque, 0);
    }
    updatePoints();
}

// Floss removes extra plaque every few seconds
function activateFloss() {
    if (flossActive && plaque > 0) {
        plaque -= 5;
        plaque = Math.max(plaque, 0);
    }
}

// Mouthwash doubles plaque removal temporarily
function activateMouthwash() {
    if (mouthwashActive) {
        plaqueReduction = 2;
    } else {
        plaqueReduction = 1;
    }
}

function prestige() {
    totalTeethCleaned = 0;
    plaque = 100;
    toothpaste = 0;
    toothpastePerClick = 1;
    toothpastePerSecond = 0;
    document.getElementById('upgrade1').disabled = false;
    document.getElementById('upgrade2').disabled = false;
    document.getElementById('upgrade3').disabled = false;
    document.getElementById('upgrade4').disabled = false;
    document.getElementById('upgrade5').disabled = false;
    document.getElementById('prestige-btn').style.display = "none";
    updatePoints();
}

// Call the incrementToothpaste and other periodic actions
setInterval(incrementToothpaste, 1000);
setInterval(activateFloss, 5000);
setInterval(activateMouthwash, 1000);

// Add event listener to the tooth image for clicking
document.getElementById('tooth').addEventListener('click', cleanTooth);

updatePoints();