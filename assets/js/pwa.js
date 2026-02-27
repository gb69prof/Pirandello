/* Pirandello PWA bootstrap
   - Inietta manifest + theme-color se mancanti
   - Registra il service worker
   NOTE: pensato per GitHub Pages sotto /Pirandello/
*/
(function () {
  const BASE = "/Pirandello/";
  const MANIFEST_URL = BASE + "manifest.webmanifest";

  function ensureHeadTags() {
    const head = document.head || document.getElementsByTagName("head")[0];
    if (!head) return;

    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement("link");
      link.rel = "manifest";
      link.href = MANIFEST_URL;
      head.appendChild(link);
    }

    if (!document.querySelector('meta[name="theme-color"]')) {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = "#961B2B";
      head.appendChild(meta);
    }

    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
      const link = document.createElement("link");
      link.rel = "apple-touch-icon";
      link.href = BASE + "icons/apple-touch-icon.png";
      head.appendChild(link);
    }
  }

  async function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol !== "https:" && location.hostname !== "localhost") return;

    try {
      await navigator.serviceWorker.register(BASE + "sw.js", { scope: BASE });
    } catch (e) {
      // noop
    }
  }

  ensureHeadTags();
  registerSW();
})();
