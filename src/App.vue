<template>
  <div class="container">
    <router-view />
  </div>
  <aside v-if="showCookieBanner" class="cookie-banner" role="dialog" aria-live="polite">
    <p>
      Utilitzem cookies d’anàlisi de Google Analytics per entendre com s’utilitza aquesta pàgina i
      millorar-la. Només s’activaran si les acceptes.
      <router-link to="/cookies">Més informació</router-link>
    </p>
    <div class="cookie-actions">
      <button type="button" class="cookie-reject" @click="rejectAnalytics">Rebutjar</button>
      <button type="button" class="cookie-accept" @click="acceptAnalytics">Acceptar</button>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return { showCookieBanner: false };
  },
  mounted() {
    this.$store.commit("initalizeStore");
    const consent = window.localStorage.getItem("analytics-consent");
    this.showCookieBanner = !consent;
    if (consent === "accepted") this.loadAnalytics();
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
    loadAnalytics() {
      if (typeof window.gtag === "function") return;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", "G-J0RW89GBLC");
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-J0RW89GBLC";
      document.head.appendChild(script);
    },
    acceptAnalytics() {
      window.localStorage.setItem("analytics-consent", "accepted");
      this.showCookieBanner = false;
      this.loadAnalytics();
    },
    rejectAnalytics() {
      window.localStorage.setItem("analytics-consent", "rejected");
      this.showCookieBanner = false;
    },
  },
};
</script>

<style>
.cookie-banner { position: fixed; z-index: 10000; right: 1rem; bottom: 1rem; left: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; max-width: 900px; margin: auto; padding: 1rem 1.25rem; color: #413029; background: #fff; border: 1px solid #d8d0c8; border-radius: 12px; box-shadow: 0 6px 24px rgb(65 48 41 / 18%); font-family: "Proxima Nova", Arial, sans-serif; }
.cookie-banner p { margin: 0; font-size: .9rem; line-height: 1.45; }
.cookie-banner a { color: #413029; text-decoration: underline; }
.cookie-actions { display: flex; flex: 0 0 auto; gap: .5rem; }
.cookie-actions button { padding: .55rem .9rem; border-radius: 999px; cursor: pointer; }
.cookie-reject { color: #413029; background: #fff; border: 1px solid #413029; }
.cookie-accept { color: #fff; background: #ea7463; border: 1px solid #ea7463; }
@media (max-width: 640px) { .cookie-banner { flex-direction: column; align-items: stretch; } .cookie-actions { justify-content: flex-end; } }
</style>
