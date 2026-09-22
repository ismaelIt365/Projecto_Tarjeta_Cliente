import { onMounted, onUnmounted, ref } from "vue";
import axios from "axios";
import {
  promotionDefaults,
  validatePromotionContent,
} from "./promotions.content";
export function usePromotion(id, baseUrl) {
  const content = ref({ ...promotionDefaults[id] });
  const abort = new AbortController();
  onMounted(async () => {
    try {
      const response = await axios.get(
        `${baseUrl.replace(/\/$/, "")}/promotions/public/${id}`,
        {
          signal: abort.signal,
          timeout: 5000,
        },
      );
      content.value = validatePromotionContent(response.data.content, id);
    } catch {
      // Preserve the original page if the API is unavailable or not deployed yet.
    }
  });
  onUnmounted(() => abort.abort());
  return content;
}
export function imageFallback(event, fallback) {
  const image = event.target;
  if (image.src !== new URL(fallback, window.location.href).href)
    image.src = fallback;
}
