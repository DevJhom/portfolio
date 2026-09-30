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

// Start of the current role (ClickNext); drives the timeline dates and the About Me experience count.
export const CAREER_START_YEAR = 2023;
export const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;

const bangkokParts =new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Bangkok',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

// timeZoneName is not requested on purpose: it renders "GMT+7", not "ICT".
function formatBangkokTime(): string {
  const parts: Record<string, string> = {};
  for (const part of bangkokParts.formatToParts(new Date())) {
    parts[part.type] = part.value;
  }
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} ICT`;
}

export function useBangkokClock() {
  const bangkokTime = ref(formatBangkokTime());
  let intervalId = 0;

  onMounted(() => {
    intervalId = window.setInterval(() => {
      bangkokTime.value = formatBangkokTime();
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return bangkokTime;
}
