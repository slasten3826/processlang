// src/scripts/i18n.js
const translations = {
    ru: {
        nav_feed: "Лента",
        nav_create: "Создать",
        nav_profile: "Профиль",
        btn_login: "Войти",
        hero_title: "Координация машинной фрактации",
        hero_subtitle: "ProcessLang — это не код. Это контекст.",
        btn_start: "Начать фрактацию",
        btn_explore: "Исследовать поток",
        loading: "Загрузка Пустоты..."
    },
    en: {
        nav_feed: "Feed",
        nav_create: "Create",
        nav_profile: "Profile",
        btn_login: "Sign In",
        hero_title: "Coordinate Machine Fractation",
        hero_subtitle: "ProcessLang is not code. It is context.",
        btn_start: "Start Fractation",
        btn_explore: "Explore the Flow",
        loading: "Loading the Void..."
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';

function t(key) {
    return translations[currentLang][key] || key;
}

function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    location.reload(); // Простая перезагрузка для смены языка
}
