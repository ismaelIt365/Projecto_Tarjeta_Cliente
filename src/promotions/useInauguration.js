import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
export function useInauguration(landing, baseUrl) {
  const params = new URLSearchParams(window.location.search);
  const inauguracionId = params.get("inauguracion") || "";
  const inaugurationLoading = ref(params.has("inauguracion"));
  const inaugurationError = ref("");
  const inaugurationStore = ref("");
  const abort = new AbortController();
  const unavailable =
    landing === "catalunya"
      ? "Aquesta inauguració no està disponible. Comprova l’enllaç i les dates de la promoció."
      : "Esta inauguración no está disponible. Comprueba el enlace y las fechas de la promoción.";
  onMounted(async () => {
    if (!params.has("inauguracion")) return;
    try {
      if (!/^[0-9a-f-]{36}$/i.test(inauguracionId))
        throw new Error("Invalid identifier");
      const { data } = await axios.get(
        `${baseUrl.replace(/\/$/, "")}/promotions/public/${landing}/inaugurations/${encodeURIComponent(inauguracionId)}`,
        { signal: abort.signal, timeout: 8000 },
      );
      if (typeof data.storeName !== "string") throw new Error("Unavailable");
      const format = (value) => value.split("-").reverse().join("/");
      const today = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Europe/Madrid",
      }).format(new Date());
      if (!data.enabled) {
        inaugurationError.value = "Aquesta inauguració està deshabilitada i no accepta registres.";
      } else if (!data.available && typeof data.startsOn === "string" && typeof data.endsOn === "string") {
        inaugurationError.value = today < data.startsOn
          ? `Les inscripcions estaran disponibles del ${format(data.startsOn)} al ${format(data.endsOn)}.`
          : `Les inscripcions van finalitzar el ${format(data.endsOn)}.`;
      } else if (!data.available) {
        throw new Error("Unavailable");
      } else {
        inaugurationStore.value = data.storeName;
        if (typeof window.gtag === "function") {
          window.gtag("event", "inauguration_view", {
            landing_id: landing,
            inauguration_id: inauguracionId,
            store_name: data.storeName,
          });
        }
      }
    } catch {
      inaugurationError.value = unavailable;
    } finally {
      inaugurationLoading.value = false;
    }
  });
  onUnmounted(() => abort.abort());
  return {
    inauguracionId,
    inaugurationLoading,
    inaugurationError,
    inaugurationStore,
  };
}
