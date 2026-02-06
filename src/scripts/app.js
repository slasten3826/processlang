const client = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

async function signIn() {
    await client.auth.signInWithOAuth({
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
    const container = document.getElementById('auth-container');
    if (!container) return;

    if (session?.user) {
        container.innerHTML = `<img src="${session.user.user_metadata.avatar_url}" style="width:32px; height:32px; border-radius:50%; cursor:pointer;" onclick="signOut()">`;
    } else {
        container.innerHTML = `<button class="btn-login" onclick="signIn()">Войти</button>`;
    }
}

window.addEventListener('DOMContentLoaded', checkUser);
