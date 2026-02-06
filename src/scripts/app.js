// src/scripts/app.js

// 1. Инициализация Supabase
const client = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

// 2. Роутер (Переключатель страниц)
async function route(event) {
    // Если это просто ссылка внутри сайта, блокируем стандартный переход
    if (event && event.target.tagName === 'A') {
        event.preventDefault();
    }

    let hash = window.location.hash;
    if (!hash || hash === '') hash = '#home';

    // Убираем #, чтобы получить имя страницы
    const page = hash.replace('#', '');
    const app = document.getElementById('app-view');

    // Если это logout, роутер тут не нужен, его обработает функция signOut
    if (page === 'logout') return;

    try {
        const response = await fetch(`src/pages/${page}.html`);
        if (!response.ok) throw new Error(`Страница ${page} не найдена`);

        const html = await response.text();
        app.innerHTML = html;

        updateTranslations();

        // Специфичные скрипты для страниц
        if (page === 'home') {
            setTimeout(() => {
                if (typeof initHomeVisuals === 'function') initHomeVisuals();
            }, 50);
        }
    } catch (error) {
        console.error("Router error:", error);
        if (page !== 'home') {
            window.location.hash = '#home';
            route();
        }
    }
}

// 3. Обновление текстов (i18n)
function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    const langBtn = document.querySelector('.lang-switch');
    if (langBtn) {
        langBtn.textContent = (localStorage.getItem('lang') || 'ru').toUpperCase();
    }
}

// 4. Логика Авторизации (Auth)

async function signIn() {
    const { data, error } = await client.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'https://processlang.org'
        }
    });
    if (error) console.error("Ошибка входа:", error);
}

// --- ФУНКЦИЯ ВЫХОДА (Исправленная) ---
// Делаем её доступной глобально
window.signOut = async function() {
    console.log("Выходим...");

    // 1. Выходим из Supabase
    await client.auth.signOut();

    // 2. Чистим локальное хранилище на всякий случай
    localStorage.clear();

    // 3. Жесткая перезагрузка страницы
    window.location.href = '/';
}

async function checkUser() {
    const { data: { session } } = await client.auth.getSession();
    renderAuthUI(session?.user);
}

function renderAuthUI(user) {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;

    if (user) {
        const avatar = user.user_metadata.avatar_url || 'https://via.placeholder.com/32';
        const name = user.user_metadata.full_name || user.email;

        // ВАЖНО: Кнопка выхода теперь вызывает signOut() напрямую
        authContainer.innerHTML = `
        <div class="user-profile" style="position: relative; display: flex; align-items: center; gap: 10px;">
        <img src="${avatar}"
        onclick="toggleProfileMenu()"
        style="width:36px; height:36px; border-radius:50%; border:2px solid var(--accent-cyan); cursor: pointer;"
        title="${name}">

        <div id="profile-dropdown" style="display: none; position: absolute; top: 50px; right: 0; background: #111; border: 1px solid #333; padding: 10px; border-radius: 8px; width: 150px; flex-direction: column; gap: 5px; z-index: 1000;">
        <div style="font-size: 0.8rem; color: #888; border-bottom: 1px solid #333; padding-bottom: 5px; margin-bottom: 5px;">${name}</div>

        <a href="#" onclick="event.preventDefault(); signOut()" style="color: #ff6b6b; text-decoration: none; cursor: pointer;">Выйти</a>
        </div>
        </div>
        `;
    } else {
        authContainer.innerHTML = `
        <button class="btn-login" onclick="signIn()">
        <i class="ph ph-sign-in"></i>
        <span data-i18n="btn_login">${t('btn_login')}</span>
        </button>
        `;
        updateTranslations();
    }
}

function toggleProfileMenu() {
    const menu = document.getElementById('profile-dropdown');
    if (menu) {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    }
}

client.auth.onAuthStateChange((event, session) => {
    if (event !== 'SIGNED_OUT') {
        renderAuthUI(session?.user);
    }
});

function toggleMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) menu.classList.toggle('active');
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
    updateTranslations();
    checkUser();
    route();
});
