import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import {
  promotionDefaults,
  validatePromotionContent,
} from "./promotions.content";
export function usePromotion(id, baseUrl) {
  const content = ref({ ...promotionDefaults[id] });
  const loading = ref(true);
  const error = ref(false);
  const abort = new AbortController();
  onMounted(async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const inaugurationId = params.get("inauguracion");
      const query = inaugurationId ? `?inauguracion=${encodeURIComponent(inaugurationId)}` : "";
      const response = await axios.get(
        `${baseUrl.replace(/\/$/, "")}/promotions/public/${id}${query}`,
        {
          signal: abort.signal,
          timeout: 5000,
        },
      );
      content.value = validatePromotionContent(response.data.content, id);
    } catch {
      error.value = true;
    } finally {
      loading.value = false;
    }
  });
  onUnmounted(() => abort.abort());
  return { content, loading, error };
}
export function imageFallback(event, fallback) {
  const image = event.target;
  if (image.src !== new URL(fallback, window.location.href).href)
    image.src = fallback;
}

