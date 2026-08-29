// スライドショーの状態管理
let slideIndex = 1;

// ページロード時にデータを読み込む
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // すべてのJSONファイルを読み込む
        const [profileData, skillsData, activitiesData, presentationsData, experienceData, socialData, imagesData] = await Promise.all([
            loadJSON('datas/profile.json'),
            loadJSON('datas/skills.json'),
            loadJSON('datas/activities.json'),
            loadJSON('datas/presentations.json'),
            loadJSON('datas/experience.json'),
            loadJSON('datas/social.json'),
            loadJSON('datas/images.json')
        ]);

        // データを画面に反映
        renderProfile(profileData);
        renderSkills(skillsData);
        renderActivities(activitiesData);
        renderPresentations(presentationsData);
        renderExperience(experienceData);
        renderSocialLinks(socialData);
        renderSlideshow(imagesData);

        // スライドショーの初期化
        showSlide(slideIndex);
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
    }
});

// JSONファイルを読み込む関数
async function loadJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`${path}の読み込みに失敗しました:`, error);
        return {};
    }
}

// プロフィールを描画
function renderProfile(data) {
    document.getElementById('siteName').textContent = data.siteName || 'My Portfolio';
    
    // ヒーロー画像を設定
    if (data.heroImage) {
        const heroSection = document.querySelector('.hero');
        heroSection.style.backgroundImage = `url(${data.heroImage})`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }
    
    document.getElementById('mainTitle').innerHTML = data.name || 'ようこそ';
    document.getElementById('mainSubtitle').innerHTML = data.title || 'あなたの職業';
    document.getElementById('profileName').innerHTML = data.name || '山田太郎';
    document.getElementById('profileAffiliation').innerHTML = data.affiliation || '◯◯大学';
    document.getElementById('profileHobbies').innerHTML = data.hobbies || 'プログラミング、読書';
    document.getElementById('profileComment').innerHTML = data.comment || 'コメント';
    document.getElementById('footerText').textContent = data.footer || '© 2024 My Portfolio. All rights reserved.';
}

// スキルを描画
function renderSkills(data) {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';

    if (data.skills && Array.isArray(data.skills)) {
        data.skills.forEach((skill, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.style.cursor = 'pointer';
            skillCard.onclick = () => openSkillModal(skill);
            skillCard.innerHTML = `
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
                <div class="skill-level-badge">${skill.level || '未設定'}</div>
            `;
            container.appendChild(skillCard);
        });
    }
}

// スキル詳細モーダルを開く
function openSkillModal(skill) {
    document.getElementById('modalSkillName').innerHTML = skill.name;
    document.getElementById('modalSkillLevel').textContent = skill.level || '未設定';
    document.getElementById('modalSkillDetail').innerHTML = skill.detail || '詳しい説明がありません';
    
    // 画像がある場合は表示、ない場合は非表示
    const imageElement = document.getElementById('modalSkillImage');
    if (skill.image && skill.image.trim() !== '') {
        imageElement.src = skill.image;
        imageElement.style.display = 'block';
    } else {
        imageElement.style.display = 'none';
    }
    
    document.getElementById('skillModal').style.display = 'block';
}

// スキル詳細モーダルを閉じる
function closeSkillModal() {
    document.getElementById('skillModal').style.display = 'none';
}

// モーダル外をクリックすると閉じる
window.onclick = function(event) {
    const modal = document.getElementById('skillModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// 活動歴を描画（最初の3件、最新順）
function renderActivities(data) {
    const container = document.getElementById('activitiesContainer');
    container.innerHTML = '';

    if (data.activities && Array.isArray(data.activities)) {
        // 逆順にしてから最初の3件を取得
        const displayItems = data.activities.reverse().slice(0, 3);
        displayItems.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <div class="activity-card">
                    <div class="activity-date">${activity.date}</div>
                    <h3>${activity.title}</h3>
                    <p>${activity.description}</p>
                </div>
            `;
            container.appendChild(activityItem);
        });
    }
}

// 対外発表を描画（最初の3件、最新順）
function renderPresentations(data) {
    const container = document.getElementById('presentationsContainer');
    container.innerHTML = '';

    if (data.presentations && Array.isArray(data.presentations)) {
        // 逆順にしてから最初の3件を取得
        const displayItems = data.presentations.reverse().slice(0, 3);
        displayItems.forEach(presentation => {
            const presentationItem = document.createElement('div');
            presentationItem.className = 'presentation-item';
            presentationItem.innerHTML = `
                <div class="presentation-date">${presentation.date}</div>
                <h3>${presentation.title}</h3>
                <p>${presentation.description}</p>
                <div class="presentation-venue">${presentation.venue}</div>
            `;
            container.appendChild(presentationItem);
        });
    }
}

// 経歴を描画（最初の3件、最新順）
function renderExperience(data) {
    const container = document.getElementById('experienceContainer');
    container.innerHTML = '';

    if (data.experience && Array.isArray(data.experience)) {
        // 逆順にしてから最初の3件を取得
        const displayItems = data.experience.reverse().slice(0, 3);
        displayItems.forEach(exp => {
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            experienceItem.innerHTML = `
                <div class="experience-period">${exp.period}</div>
                <h3>${exp.title}</h3>
                <p>${exp.description}</p>
            `;
            container.appendChild(experienceItem);
        });
    }
}

// ソーシャルリンクを描画
function renderSocialLinks(data) {
    const container = document.getElementById('linksContainer');
    container.innerHTML = '';

    if (data.links && Array.isArray(data.links)) {
        data.links.forEach(link => {
            const linkItem = document.createElement('div');
            linkItem.className = 'link-item';
            linkItem.innerHTML = `
                <a href="${link.url}" target="_blank" title="${link.name}">${link.icon}</a>
                <h3>${link.name}</h3>
                <p>${link.description}</p>
            `;
            container.appendChild(linkItem);
        });
    }
}

// スライドショーを描画
function renderSlideshow(data) {
    const container = document.getElementById('slideshowContainer');
    const dotsContainer = document.getElementById('dotsContainer');

    if (data.profileImages && Array.isArray(data.profileImages)) {
        // スライド要素を生成
        const slidesHTML = data.profileImages.map((image, index) => {
            return `
                <div class="slide fade">
                    <img src="${image.filename}" alt="${image.comment}">
                    <div class="slide-caption">${image.comment}</div>
                </div>
            `;
        }).join('');

        // dotsContainerの前に全てのスライドを挿入
        const prevButton = container.querySelector('.prev');
        container.insertAdjacentHTML('beforeend', slidesHTML);
        
        // ドット要素を生成
        data.profileImages.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.onclick = () => currentSlide(index + 1);
            dotsContainer.appendChild(dot);
        });
    }
}

// スライドショー関数
function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('fade');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('fade');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}
