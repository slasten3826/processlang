// src/scripts/app.js

// 1. Инициализация Supabase
// Используем имя 'client', чтобы не конфликтовать с самой библиотекой
const client = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

// 2. Роутер (Переключатель страниц)
async function route(event) {
    if (event) event.preventDefault();

    // Получаем hash из URL. Если пусто — считаем, что это #home
    let hash = window.location.hash;
    if (!hash || hash === '') hash = '#home';

    const page = hash.replace('#', '');

    // Находим контейнер для контента
    const app = document.getElementById('app-view');

    try {
        // Загружаем HTML файл из папки pages
        const response = await fetch(`src/pages/${page}.html`);

        if (!response.ok) {
            throw new Error(`Страница ${page} не найдена`);
        }

        const html = await response.text();
        app.innerHTML = html;

        // Обновляем переводы на новой странице
        updateTranslations();

        // --- ЗАПУСК СКРИПТОВ ДЛЯ РАЗНЫХ СТРАНИЦ ---

        // Если открыли ГЛАВНУЮ — запускаем красивые анимации
        if (page === 'home') {
            setTimeout(() => {
                // Проверяем, загрузился ли файл visuals.js
                if (typeof initHomeVisuals === 'function') {
                    initHomeVisuals();
                }
            }, 50); // Небольшая задержка, чтобы HTML успел нарисоваться
        }

        // Если это Компилятор (в будущем)
        if (page === 'compiler') {
            if (typeof initCompiler === 'function') initCompiler();
        }

        // Если это Лента (в будущем)
        if (page === 'feed') {
            if (typeof initFeed === 'function') initFeed();
        }

    } catch (error) {
        console.error("Ошибка роутера:", error);
        app.innerHTML = `
        <div style="text-align:center; padding: 4rem;">
        <h1>404: Void not found</h1>
        <p style="color: var(--text-dim);">${error.message}</p>
        <a href="#home" style="color: var(--accent-cyan); margin-top: 1rem; display: inline-block;">Вернуться в начало</a>
        </div>
        `;
    }
}

// 3. Обновление текстов (RU/EN)
function updateTranslations() {
    // Ищем все элементы с атрибутом data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key); // Функция t() берется из i18n.js
    });

    // Обновляем кнопку языка
    const langBtn = document.querySelector('.lang-switch');
    if (langBtn) {
        langBtn.textContent = (localStorage.getItem('lang') || 'ru').toUpperCase();
    }
}

// 4. Логика Входа (Auth)
async function checkUser() {
    const { data: { session } } = await client.auth.getSession();
    const authContainer = document.getElementById('auth-container');

    if (!authContainer) return;

    if (session) {
        // Если вошел — показываем Аватарку
        const user = session.user;
        const avatar = user.user_metadata.avatar_url || 'https://via.placeholder.com/32';

        authContainer.innerHTML = `
        <div class="user-profile" onclick="window.location.hash='#profile'" style="cursor: pointer;" title="${user.user_metadata.full_name}">
        <img src="${avatar}" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--accent-cyan);">
        </div>
        `;
    } else {
        // Если нет — кнопку Войти
        authContainer.innerHTML = `
        <button class="btn-login" onclick="signIn()">
        <i class="ph ph-sign-in"></i>
        <span data-i18n="btn_login">${t('btn_login')}</span>
        </button>
        `;
    }
}

// Функция входа через GitHub
async function signIn() {
    const { data, error } = await client.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: window.location.href // Вернуться сюда же после входа
        }
    });
    if (error) console.error("Ошибка входа:", error);
}

// Мобильное меню (открыть/закрыть)
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) menu.classList.toggle('active');
}

// 5. Глобальные слушатели событий
// Когда меняется хеш в адресе (например #feed -> #compiler)
window.addEventListener('hashchange', route);

// Когда страница загрузилась первый раз
window.addEventListener('DOMContentLoaded', () => {
    updateTranslations();
    checkUser();
    route(); // Запускаем роутер вручную для первой загрузки
});
