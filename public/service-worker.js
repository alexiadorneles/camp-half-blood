"use strict";
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        var publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        }
        window.addEventListener('load', function () {
            var swUrl = process.env.PUBLIC_URL + "/service-worker.js";
            registerValidSW(swUrl, config);
        });
    }
}
function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then(function (registration) {
            registration.onupdatefound = function () {
                var installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }
                installingWorker.onstatechange = function () {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // At this point, the updated precached content has been fetched,
                            // but the previous service worker will still serve the older
                            // content until all client tabs are closed.
                            console.log('New content is available and will be used when all ' +
                                'tabs for this page are closed. See https://bit.ly/CRA-PWA.');
                            // Execute callback
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        }
                        else {
                            // At this point, everything has been precached.
                            // It's the perfect time to display a
                            // "Content is cached for offline use." message.
                            console.log('Content is cached for offline use.');
                            // Execute callback
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })["catch"](function (error) {
            console.error('Error during service worker registration:', error);
        });
}
function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' }
    })
        .then(function (response) {
            // Ensure service worker exists, and that we really are getting a JS file.
            var contentType = response.headers.get('content-type');
            if (response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)) {
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then(function (registration) {
                    registration.unregister().then(function () {
                        window.location.reload();
                    });
                });
            }
            else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, config);
            }
        })["catch"](function () {
            console.log('No internet connection found. App is running in offline mode.');
        });
}
function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(function (registration) {
                registration.unregister();
            })["catch"](function (error) {
                console.error(error.message);
            });
    }
}

register();