import { registerSW } from 'virtual:pwa-register';

registerSW({
  onNeedRefresh() {
    if (confirm("New content available, reload?")) {
      location.reload();
    }
  },
  onOfflineReady() {
    console.log("Ready to work offline");
  },
});
