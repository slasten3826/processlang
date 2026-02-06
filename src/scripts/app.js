const client = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

async function signIn() {
    const { data, error } = await client.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: 'https://processlang.org' }
    });
}

window.signOut = async function() {
    await client.auth.signOut();
    localStorage.clear();
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
        authContainer.innerHTML = `
        <div class="user-profile" style="position: relative; cursor: pointer;" onclick="toggleProfileMenu()">
        <img src="${avatar}" style="width:36px; height:36px; border-radius:50%; border:2px solid var(--accent-cyan);">
        <div id="profile-dropdown" style="display: none; position: absolute; top: 45px; right: 0; background: #111; border: 1px solid #333; padding: 10px; border-radius: 8px; width: 140px; z-index: 1001;">
        <div style="font-size: 0.8rem; color: #888; padding-bottom: 5px; border-bottom: 1px solid #333; margin-bottom: 5px;">${name}</div>
        <a href="#" onclick="event.preventDefault(); signOut()" style="color: #ff6b6b; text-decoration: none; font-size: 0.9rem;">Выйти</a>
        </div>
        </div>
        `;
    } else {
        authContainer.innerHTML = `
        <button class="btn-login" onclick="signIn()">
        <i class="ph ph-sign-in" style="margin-right:5px;"></i>
        <span data-i18n="btn_login">Войти</span>
        </button>
        `;
        if (typeof updateTranslations === 'function') updateTranslations();
    }
}

function toggleProfileMenu() {
    const menu = document.getElementById('profile-dropdown');
    if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

client.auth.onAuthStateChange((event, session) => {
    if (event !== 'SIGNED_OUT') renderAuthUI(session?.user);
});

window.addEventListener('DOMContentLoaded', () => {
    checkUser();
    if (typeof updateTranslations === 'function') updateTranslations();
    if (typeof initHomeVisuals === 'function') initHomeVisuals();
});
