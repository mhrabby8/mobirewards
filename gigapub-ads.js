function initializeGigapubAds() {
    if (typeof gigaShow_YOUR_GIGAPUB_ZONE_ID === 'function') {
        gigaShow_YOUR_GIGAPUB_ZONE_ID({
            type: 'interstitial',
            settings: {
                frequency: 2,
                autoStart: true,
                mediation: true
            }
        }).then(() => console.log('Gigapub Ads Initialized.'))
         .catch(err => console.error('Gigapub init failed:', err));
    } else {
        console.warn('Gigapub SDK not ready. Retrying...');
        setTimeout(initializeGigapubAds, 2000);
    }
}

function tryGigapubFallback(adType, grantReward) {
    if (typeof gigaShow_YOUR_GIGAPUB_ZONE_ID === 'function') {
        gigaShow_YOUR_GIGAPUB_ZONE_ID({ type: adType })
            .then(grantReward)
            .catch(e => {
                console.error('Gigapub ad failed:', e);
                alert('No ads available right now.');
            });
    } else {
        console.warn('Gigapub SDK not ready.');
        alert('Ad providers not ready.');
    }
}