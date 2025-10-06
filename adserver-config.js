let points = 0;
let balance = 0.00;
let historyLog = [];

const pointsPerAd = 1;
const ratePerPoint = 0.05;

function loadData() {
    const savedData = localStorage.getItem('easyEarningBotV2');
    if (savedData) {
        const data = JSON.parse(savedData);
        points = data.points || 0;
        balance = data.balance || 0.00;
        historyLog = data.historyLog || [];
    }
    updateDisplay();
}

function saveData() {
    localStorage.setItem('easyEarningBotV2', JSON.stringify({ points, balance, historyLog }));
}

function updateDisplay() {
    document.getElementById('points-value').textContent = points;
    document.getElementById('balance-value').textContent = `$${balance.toFixed(2)}`;
}

function addToHistory(type, detail) {
    const timestamp = new Date().toISOString();
    historyLog.unshift({ type, detail, timestamp });
    if (historyLog.length > 50) historyLog.pop();
    saveData();
}

function grantReward() {
    points += pointsPerAd;
    balance = points * ratePerPoint;
    updateDisplay();
    addToHistory('earn', `+${pointsPerAd} Point(s) from Ad`);
    saveData();
}