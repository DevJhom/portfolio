import { ref, onMounted, onUnmounted } from 'vue';

export function useIsMobile() {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  const isMobile = ref(mediaQuery.matches);

  function update(e: MediaQueryListEvent) {
    isMobile.value = e.matches;
  }

  onMounted(() => {
    mediaQuery.addEventListener('change', update);
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', update);
  });

  return isMobile;
}
