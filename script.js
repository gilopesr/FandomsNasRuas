document.addEventListener("DOMContentLoaded", () => {
    renderLocations(locationsData);
    renderSocialPosts();
    updateCounter(locationsData.length);
});

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`tab-${tabId}`).classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeDesktopBtn = document.getElementById(`btn-tab-${tabId}`);
    if (activeDesktopBtn) activeDesktopBtn.classList.add('active');

    document.querySelectorAll('.mobile-tab').forEach(btn => btn.classList.remove('active'));
    const activeMobileBtn = document.getElementById(`mobile-tab-${tabId}`);
    if (activeMobileBtn) activeMobileBtn.classList.add('active');
}

function renderLocations(data) {
    const container = document.getElementById('locations-grid');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 28px; margin-bottom: 8px;"></i>
                <p style="font-size: 14px; font-weight: 500;">Nenhuma manifestação encontrada.</p>
            </div>
        `;
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'location-card';

        card.innerHTML = `
            <div>
                <div class="card-top">
                    <span class="badge-cidade">${item.cidade}</span>
                </div>
                <h3>${item.titulo}</h3>
                <p><i class="fa-solid fa-location-dot"></i><span>${item.local}</span></p>
                <div class="card-details-box">
                    <span><i class="fa-regular fa-calendar"></i>${formatDate(item.data)}</span>
                    <span><i class="fa-regular fa-clock"></i>${item.horario}</span>
                </div>
                <p style="font-size: 0.8rem; color: #475569; margin-bottom: 16px;">${item.descricao || ''}</p>
            </div>
            <div>
                ${item.link ? `<a href="${item.link}" target="_blank" class="card-link-btn">Acessar Postagem<i class="fa-solid fa-external-link-alt" style="margin-left: 4px;"></i></a>` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

function updateCounter(count) {
    document.getElementById('counter-locais').innerText = `${count} ${count === 1 ? 'ato cadastrado' : 'atos cadastrados'}`;
}

function filterLocations() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = locationsData.filter(item => 
        item.cidade.toLowerCase().includes(query) ||
        item.titulo.toLowerCase().includes(query) ||
        item.local.toLowerCase().includes(query) ||
        (item.descricao && item.descricao.toLowerCase().includes(query))
    );
    renderLocations(filtered);
    updateCounter(filtered.length);
}

function renderSocialPosts() {
    const grid = document.getElementById('social-grid');
    grid.innerHTML = '';

    if (socialPosts.length === 0) {
        grid.innerHTML = `<p style="color: #94a3b8; font-size: 0.85rem;">Nenhuma postagem recente.</p>`;
        return;
    }

    socialPosts.forEach(post => {
        let iconClass = "fa-solid fa-globe";
        let brandColor = "#e11d48";
        let nomeRede = "Rede Social";

        if (post.rede === "twitter") {
            iconClass = "fa-brands fa-twitter";
            brandColor = "#0ea5e9";
            nomeRede = "X / Twitter";
        } else if (post.rede === "instagram") {
            iconClass = "fa-brands fa-instagram";
            brandColor = "#e1306c";
            nomeRede = "Instagram";
        } else if (post.rede === "tiktok") {
            iconClass = "fa-brands fa-tiktok";
            brandColor = "#000000";
            nomeRede = "TikTok";
        }

        const card = document.createElement('div');
        card.className = 'social-card';
        card.innerHTML = `
            <div class="social-header">
                <div class="social-user-info">
                    <div class="social-avatar" style="background-color: ${brandColor};">
                        <i class="${iconClass}" style="font-size: 1rem; color: white;"></i>
                    </div>
                    <div>
                        <h4>${nomeRede} Oficial</h4>
                        <span>${post.data}</span>
                    </div>
                </div>
                <i class="${iconClass}" style="color: ${brandColor}; font-size: 1.15rem;"></i>
            </div>
            <p style="font-weight: 500; color: #1e293b; margin: 8px 0;">${post.titulo}</p>
            <a href="${post.url}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; color: #e11d48; text-decoration: none; margin-top: 4px;">
                Acessar publicação original <i class="fa-solid fa-external-link-alt" style="font-size: 0.7rem;"></i>
            </a>
        `;
        grid.appendChild(card);
    });
}

function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}