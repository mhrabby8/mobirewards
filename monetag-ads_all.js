function initializeMonetagAds() {
    if (typeof show_9459352 === 'function') {
        show_9459352({
            type: 'inApp',
            inAppSettings: {
                frequency: 2,
                capping: 0.1,
                interval: 30,
                timeout: 5,
                everyPage: false
            }
        }).catch(err => {
            console.error('Monetag In-App Ads init failed:', err);
        });
        console.log("Monetag In-App Interstitial Ads Initialized.");
    } else {
        console.warn("Monetag SDK not ready. Retrying...");
        setTimeout(initializeMonetagAds, 2000);
    }
}

function showMonetagRewardedInterstitial(grantReward) {
    if (typeof show_9459352 === 'function') {
        show_9459352({ type: 'rewarded' })
            .then(grantReward)
            .catch(() => {
                console.error('Monetag Rewarded Interstitial failed.');
                tryGigapubFallback('rewarded_video', grantReward);
            });
    } else {
        console.warn('Monetag SDK not ready.');
        tryGigapubFallback('rewarded_video', grantReward);
    }
}

function showMonetagRewardedPopup(grantReward) {
    if (typeof show_9459352 === 'function') {
        show_9459352('pop')
            .then(grantReward)
            .catch(() => {
                console.error('Monetag Rewarded Popup failed.');
                tryGigapubFallback('popup', grantReward);
            });
    } else {
        console.warn('Monetag SDK not ready.');
        tryGigapubFallback('popup', grantReward);
    }
}