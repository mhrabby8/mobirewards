function showMonetagRewardedInterstitial(grantReward) {
    if (typeof show_9981456 === 'function') {
        show_9981456()
            .then(() => {
                console.log('Monetag Rewarded Interstitial completed successfully.');
                grantReward();
                alert(`Congratulations! You earned ${pointsPerAd} point(s). Your new balance is $${balance.toFixed(2)}.`);
            })
            .catch(err => {
                console.error('Monetag Rewarded Interstitial failed:', err);
                alert('Failed to load ad or ad was closed early. Please try again.');
            });
    } else {
        console.warn('Monetag SDK not ready.');
        alert('Ad provider not ready. Please try again later.');
    }
}

function showMonetagRewardedPopup(grantReward) {
    if (typeof show_9981456 === 'function') {
        show_9981456('pop')
            .then(() => {
                console.log('Monetag Rewarded Popup completed successfully.');
                grantReward();
                alert(`Congratulations! You earned ${pointsPerAd} point(s). Your new balance is $${balance.toFixed(2)}.`);
            })
            .catch(err => {
                console.error('Monetag Rewarded Popup failed:', err);
                alert('Failed to load ad or ad was closed early. Please try again.');
            });
    } else {
        console.warn('Monetag SDK not ready.');
        alert('Ad provider not ready. Please try again later.');
    }
}