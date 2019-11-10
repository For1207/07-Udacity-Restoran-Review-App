// Register a service worker.
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log("Service Worker registered");
  }).catch((e) => {
    console.log("Service Worker failed to register", e);
  });
}
