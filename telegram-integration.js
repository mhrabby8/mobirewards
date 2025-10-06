let tgUser = null;

function initTelegram() {
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
        tgUser = Telegram.WebApp.initDataUnsafe.user;
    }
    loadTelegramUser();
}

function loadTelegramUser() {
    if (tgUser) {
        document.getElementById('username').textContent = tgUser.first_name || 'Telegram User';
        const profilePicDiv = document.getElementById('profile-pic');
        if (tgUser.photo_url) {
            profilePicDiv.innerHTML = `<img src="${tgUser.photo_url}" alt="P">`;
        } else {
            profilePicDiv.textContent = (tgUser.first_name || 'U').charAt(0);
        }
    }
}

function requestWithdraw(balance, addToHistory) {
    closeWithdrawModal();
    const botToken = '7201062892:AAGewLnDhE6l7buTuXAIScVhI4d-XJZZ5Hs';
    const adminUserId = '6357701459';
    const userInfo = tgUser ? `@${tgUser.username} (ID: ${tgUser.id})` : 'Unknown User';
    const message = `💸 *Withdrawal Request*\n\n👤 *User:* ${userInfo}\n💰 *Amount:* $${balance.toFixed(2)}\n\n_Please process this request._`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: adminUserId, text: message, parse_mode: "Markdown" })
    }).then(res => res.json())
    .then(data => {
        if (data.ok) {
            Telegram.WebApp.HapticFeedback.notificationOccurred('success');
            alert("Your withdrawal request has been sent successfully!");
            addToHistory('withdraw', `Request for $${balance.toFixed(2)}`);
        } else {
            Telegram.WebApp.HapticFeedback.notificationOccurred('error');
            alert("Failed to send request. Please try again later.");
        }
    }).catch(err => {
        Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        alert("An error occurred. Check your connection and try again.");
    });
}

function shareApp() {
    if (!tgUser) return alert("Could not get user data from Telegram.");
    const botUsername = "Easyearing99_bot";
    const referralLink = `https://t.me/${botUsername}?start=${tgUser.id}`;
    const text = `🎉 Join this amazing bot and start earning! Use my link to get a special bonus:`;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`;
    Telegram.WebApp.openTelegramLink(shareUrl);
}