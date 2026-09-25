import { computed } from 'vue';
import { createI18n, useI18n } from 'vue-i18n';
import en, { type MessageSchema } from './locales/en';
import th from './locales/th';
import my from './locales/my';

export type Locale = 'en' | 'th' | 'my';

// Labels are shown in their own script, never translated.
export const LOCALES: { code: Locale; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'th', label: 'ไทย' },
    { code: 'my', label: 'မြန်မာ' },
];

export const messages: Record<Locale, MessageSchema> = { en, th, my };

// Dotted paths to every string leaf ("nav.home", "contact.form.send", ...). Arrays such as
// keepCalm.story are read straight from `messages` instead.
type Leaves<T, Prefix extends string = ''> = {
    [K in keyof T & string]: T[K] extends string
        ? `${Prefix}${K}`
        : T[K] extends readonly unknown[]
            ? never
            : Leaves<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type MessageKey = Leaves<MessageSchema>;

const STORAGE_KEY = 'locale';

function isLocale(value: unknown): value is Locale {
    return LOCALES.some(({ code }) => code === value);
}

// Saved choice first, then the first browser language we support, else English.
function detectLocale(): Locale {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (isLocale(saved)) return saved;
    } catch {
        // Storage blocked (private mode, disabled site data) — fall through.
    }

    for (const language of navigator.languages) {
        const code = language.toLowerCase().split('-')[0];
        if (isLocale(code)) return code;
    }

    return 'en';
}

const initialLocale = detectLocale();
document.documentElement.lang = initialLocale;

export const i18n = createI18n<[MessageSchema], Locale, false>({
    legacy: false,
    locale: initialLocale,
    fallbackLocale: 'en',
    messages,
});

export function setLocale(locale: Locale): void {
    i18n.global.locale.value = locale;
    // Drives screen readers, font selection and the :lang() rules in the stylesheets.
    document.documentElement.lang = locale;

    try {
        localStorage.setItem(STORAGE_KEY, locale);
    } catch {
        // Storage blocked — the choice just won't survive a reload.
    }
}

// vue-i18n's own t() accepts any string, so a mistyped key would only show up at runtime.
// This narrows it to MessageKey, making typos a vue-tsc error. <i18n-t keypath="..."> is
// not covered — keep those keys in sync with en.ts by hand.
export function useTranslation() {
    const { t, locale } = useI18n();

    return {
        t: (key: MessageKey) => t(key),
        locale: computed(() => locale.value as Locale),
    };
}
