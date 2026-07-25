// ===== Custom Cursor =====
const cursor = document.getElementById('custom-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

if (window.innerWidth > 768 && cursor) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    document.querySelectorAll('a, button, .stat-card, .about-card, .tech-card, .timeline-content, .response-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mousedown', () => cursor.classList.add('clicking'));
        el.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
    });
}

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll =====
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    });
}

// ===== AOS-like Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');

            // Animate barrier bars
            if (entry.target.querySelector('.barrier-fill')) {
                entry.target.querySelectorAll('.barrier-fill').forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

// ===== Modal =====
function showModal(type) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');

    const content = {
        login: `
            <h2>Вход в систему</h2>
            <form class="modal-form">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com">
                </div>
                <div class="form-group">
                    <label>Пароль</label>
                    <input type="password" placeholder="••••••••">
                </div>
                <button type="button" class="btn btn-primary btn-lg" style="width:100%">Войти</button>
                <p style="text-align:center;margin-top:16px;color:var(--text-muted);font-size:0.875rem">
                    Ещё нет аккаунта? <a href="#" style="color:var(--primary-light)">Зарегистрироваться</a>
                </p>
            </form>
        `,
        register: `
            <h2>Регистрация</h2>
            <form class="modal-form">
                <div class="form-group">
                    <label>Тип аккаунта</label>
                    <select>
                        <option>Производитель</option>
                        <option>Покупатель</option>
                        <option>Инвестор</option>
                        <option>Партнёр</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Компания</label>
                    <input type="text" placeholder="Название компании">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com">
                </div>
                <div class="form-group">
                    <label>Пароль</label>
                    <input type="password" placeholder="••••••••">
                </div>
                <button type="button" class="btn btn-primary btn-lg" style="width:100%">Зарегистрироваться</button>
            </form>
        `,
        demo: `
            <h2>🎬 Демо платформы</h2>
            <div class="demo-content">
                <div class="demo-video-placeholder">
                    <div class="demo-play-btn">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                    </div>
                    <p>Интерактивная демонстрация платформы TextileChain</p>
                </div>
                <div class="demo-features">
                    <div class="demo-feature">
                        <span>🔗</span>
                        <p>Блокчейн-трекинг от хлопка до продажи</p>
                    </div>
                    <div class="demo-feature">
                        <span>🤖</span>
                        <p>AI-прогнозирование спроса</p>
                    </div>
                    <div class="demo-feature">
                        <span>📊</span>
                        <p>ERP на 40+ предприятиях</p>
                    </div>
                </div>
            </div>
        `,
        docs: `<h2>📚 Документация</h2><p>Техническая документация платформы будет доступна после регистрации.</p>`,
        api: `<h2>🔌 API</h2><p>API документация для интеграции с ERP-системами.</p>`,
        partners: `<h2>🤝 Партнёрам</h2><p>Информация для потенциальных партнёров и инвесторов.</p>`,
        careers: `<h2>💼 Карьера</h2><p>Вакансии в проекте Eurasia Textile.</p>`
    };

    body.innerHTML = content[type] || '<h2>Информация</h2><p>Скоро будет доступно.</p>';
    modal.classList.add('active');

    // Add modal styles dynamically
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-form { display: flex; flex-direction: column; gap: 16px; margin-top: 24px; }
            .form-group { display: flex; flex-direction: column; gap: 6px; }
            .form-group label { font-size: 0.875rem; font-weight: 500; color: var(--text-secondary); }
            .form-group input, .form-group select { 
                padding: 12px 16px; 
                background: var(--bg-dark); 
                border: 1px solid var(--border); 
                border-radius: var(--radius-sm); 
                color: var(--text-primary); 
                font-size: 0.9375rem;
                font-family: inherit;
            }
            .form-group input:focus, .form-group select:focus { 
                outline: none; 
                border-color: var(--primary-light); 
                box-shadow: 0 0 0 3px rgba(45, 138, 94, 0.1);
            }
            .demo-content { margin-top: 24px; }
            .demo-video-placeholder { 
                background: linear-gradient(135deg, var(--primary-dark), var(--accent-blue)); 
                border-radius: var(--radius); 
                padding: 48px; 
                text-align: center; 
                margin-bottom: 24px;
                min-height: 200px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
            }
            .demo-play-btn { 
                width: 80px; 
                height: 80px; 
                background: rgba(255,255,255,0.2); 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
            }
            .demo-play-btn:hover { 
                background: rgba(255,255,255,0.3); 
                transform: scale(1.1);
            }
            .demo-video-placeholder p { color: rgba(255,255,255,0.8); font-size: 0.9375rem; }
            .demo-features { display: flex; flex-direction: column; gap: 12px; }
            .demo-feature { 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                padding: 12px 16px; 
                background: var(--bg-dark); 
                border-radius: var(--radius-sm);
                border: 1px solid var(--border);
            }
            .demo-feature span { font-size: 1.25rem; }
            .demo-feature p { font-size: 0.875rem; color: var(--text-secondary); }
        `;
        document.head.appendChild(style);
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        closeModal();
    }
});

// ===== Charts =====
const chartColors = {
    primary: '#2d8a5e',
    primaryDark: '#1a5c3a',
    gold: '#c9a84c',
    red: '#c41e3a',
    blue: '#1a3a5c',
    text: '#8ba892',
    textLight: '#f0f4f1',
    grid: 'rgba(45, 138, 94, 0.1)'
};

Chart.defaults.color = chartColors.text;
Chart.defaults.borderColor = chartColors.grid;
Chart.defaults.font.family = "'Inter', sans-serif";

// Export Structure Chart
const exportCtx = document.getElementById('exportStructureChart');
if (exportCtx) {
    new Chart(exportCtx, {
        type: 'bar',
        data: {
            labels: ['Ковры', 'Носки', 'Ткани', 'Трикотаж', 'Пряжа', 'Готовая одежда'],
            datasets: [{
                label: 'Объём ($ млн)',
                data: [5.4, 10.3, 37.4, 71.8, 217.8, 286.6],
                backgroundColor: [
                    'rgba(45, 138, 94, 0.3)',
                    'rgba(45, 138, 94, 0.4)',
                    'rgba(45, 138, 94, 0.5)',
                    'rgba(45, 138, 94, 0.6)',
                    'rgba(201, 168, 76, 0.7)',
                    'rgba(26, 58, 92, 0.8)'
                ],
                borderColor: [
                    '#2d8a5e', '#2d8a5e', '#2d8a5e', '#2d8a5e', '#c9a84c', '#1a3a5c'
                ],
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#111a15',
                    borderColor: 'rgba(45, 138, 94, 0.3)',
                    borderWidth: 1,
                    titleColor: '#f0f4f1',
                    bodyColor: '#8ba892',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(45, 138, 94, 0.05)' },
                    ticks: { color: '#5a7a62' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#8ba892', font: { size: 12 } }
                }
            }
        }
    });
}

// Trade Dynamic Chart
const tradeCtx = document.getElementById('tradeDynamicChart');
if (tradeCtx) {
    new Chart(tradeCtx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Товарооборот ($ млрд)',
                data: [6.2, 7.1, 8.3, 7.9, 8.5, 9.6],
                borderColor: '#2d8a5e',
                backgroundColor: 'rgba(45, 138, 94, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2d8a5e',
                pointBorderColor: '#0a0f0d',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#111a15',
                    borderColor: 'rgba(45, 138, 94, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(45, 138, 94, 0.05)' },
                    ticks: { color: '#5a7a62' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#8ba892' }
                }
            }
        }
    });
}

// Market Share Chart
const shareCtx = document.getElementById('marketShareChart');
if (shareCtx) {
    new Chart(shareCtx, {
        type: 'doughnut',
        data: {
            labels: ['Другие', 'Китай', 'Россия', 'Турция', 'ЕАЭС'],
            datasets: [{
                data: [60.3, 19.2, 16.6, 3.9, 8.5],
                backgroundColor: [
                    'rgba(90, 122, 98, 0.3)',
                    '#c41e3a',
                    '#1a3a5c',
                    '#c9a84c',
                    '#2d8a5e'
                ],
                borderColor: '#0a0f0d',
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#8ba892',
                        padding: 16,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: '#111a15',
                    borderColor: 'rgba(45, 138, 94, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`
                    }
                }
            }
        }
    });
}

// Value Model Chart
const valueCtx = document.getElementById('valueModelChart');
if (valueCtx) {
    new Chart(valueCtx, {
        type: 'doughnut',
        data: {
            labels: ['Узбекистан: Хлопок, рабочая сила, производство', 'Россия: Технологии, сырье, дизайн', 'Совместный экспорт: Eurasia Textile'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: ['#c9a84c', '#1a3a5c', '#2d8a5e'],
                borderColor: '#0a0f0d',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#8ba892',
                        padding: 12,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

// Financial Chart
const financialCtx = document.getElementById('financialChart');
if (financialCtx) {
    new Chart(financialCtx, {
        type: 'bar',
        data: {
            labels: ['2027', '2028', '2029', '2030'],
            datasets: [
                {
                    label: 'Выручка',
                    data: [120, 320, 580, 850],
                    backgroundColor: '#1a3a5c',
                    borderRadius: 6
                },
                {
                    label: 'Прибыль',
                    data: [15, 48, 145, 255],
                    backgroundColor: '#c9a84c',
                    borderRadius: 6
                },
                {
                    label: 'Инвестиции',
                    data: [80, 15, 5, 0],
                    backgroundColor: '#c41e3a',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#8ba892', padding: 16 }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(45, 138, 94, 0.05)' },
                    ticks: { color: '#5a7a62' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#8ba892' }
                }
            }
        }
    });
}

// Investment Chart
const investCtx = document.getElementById('investmentChart');
if (investCtx) {
    new Chart(investCtx, {
        type: 'pie',
        data: {
            labels: ['Технологический хаб (45%)', 'Оборудование (20%)', 'Логистика (15%)', 'Цифровая платформа (8%)', 'Обучение и сертификация (12%)'],
            datasets: [{
                data: [45, 20, 15, 8, 12],
                backgroundColor: ['#1a3a5c', '#c9a84c', '#5a7a62', '#2d8a5e', '#8ba892'],
                borderColor: '#0a0f0d',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#8ba892', padding: 8, font: { size: 11 } }
                }
            }
        }
    });
}

// Risk Matrix Chart
const riskCtx = document.getElementById('riskMatrixChart');
if (riskCtx) {
    new Chart(riskCtx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Конкуренция',
                    data: [{x: 8, y: 9}],
                    backgroundColor: '#c41e3a',
                    pointRadius: 12
                },
                {
                    label: 'Политика',
                    data: [{x: 5, y: 9}],
                    backgroundColor: '#c9a84c',
                    pointRadius: 10
                },
                {
                    label: 'Курсы',
                    data: [{x: 8, y: 6}],
                    backgroundColor: '#c9a84c',
                    pointRadius: 10
                },
                {
                    label: 'Логистика',
                    data: [{x: 6, y: 6}],
                    backgroundColor: '#2d8a5e',
                    pointRadius: 10
                },
                {
                    label: 'Техсбои',
                    data: [{x: 3, y: 6}],
                    backgroundColor: '#2d8a5e',
                    pointRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#111a15',
                    borderColor: 'rgba(45, 138, 94, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    min: 0,
                    max: 10,
                    title: { display: true, text: 'Вероятность', color: '#5a7a62' },
                    grid: { color: 'rgba(45, 138, 94, 0.05)' },
                    ticks: { color: '#5a7a62' }
                },
                y: {
                    min: 0,
                    max: 10,
                    title: { display: true, text: 'Влияние', color: '#5a7a62' },
                    grid: { color: 'rgba(45, 138, 94, 0.05)' },
                    ticks: { color: '#5a7a62' }
                }
            }
        }
    });
}

// KPI Chart
const kpiCtx = document.getElementById('kpiChart');
if (kpiCtx) {
    new Chart(kpiCtx, {
        type: 'bar',
        data: {
            labels: ['Экспорт текстиля', 'Рабочие места', 'Предприятия', 'Доля РФ в сырье', 'Снижение логистики'],
            datasets: [
                {
                    label: '2025 (факт)',
                    data: [2.2, 580, 907, 15, 0],
                    backgroundColor: 'rgba(90, 122, 98, 0.5)',
                    borderRadius: 6
                },
                {
                    label: '2028 (цель)',
                    data: [4.0, 650, 1600, 35, 45],
                    backgroundColor: '#2d8a5e',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#8ba892', padding: 16 }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(45, 138, 94, 0.05)' },
                    ticks: { color: '#5a7a62' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#8ba892', font: { size: 10 } }
                }
            }
        }
    });
}

// Scaling Chart
const scaleCtx = document.getElementById('scalingChart');
if (scaleCtx) {
    new Chart(scaleCtx, {
        type: 'line',
        data: {
            labels: ['Фаза 1
2026-27', 'Фаза 2
2028-29', 'Фаза 3
2030+'],
            datasets: [
                {
                    label: 'Выручка ($ млн)',
                    data: [120, 580, 850],
                    borderColor: '#1a3a5c',
                    backgroundColor: 'rgba(26, 58, 92, 0.1)',
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'Рабочие места',
                    data: [2000, 10000, 15000],
                    borderColor: '#2d8a5e',
                    backgroundColor: 'rgba(45, 138, 94, 0.1)',
                    fill: true,
                    tension: 0.3,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#8ba892', padding: 16 }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: { color: 'rgba(45, 138, 94, 0.05)' },
                    ticks: { color: '#5a7a62' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { display: false },
                    ticks: { color: '#2d8a5e' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#8ba892' }
                }
            }
        }
    });
}

// ===== Map =====
const mapEl = document.getElementById('map');
if (mapEl && typeof L !== 'undefined') {
    const map = L.map('map', {
        center: [42.5, 62],
        zoom: 4,
        scrollWheelZoom: false,
        zoomControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Markers
    const markers = [
        { coords: [40.38, 71.78], title: 'Фергана — Технологический хаб', color: '#1a3a5c', type: 'tech' },
        { coords: [41.3, 69.24], title: 'Ташкент — Главный офис', color: '#1a3a5c', type: 'tech' },
        { coords: [40.12, 67.83], title: 'Самарканд — Зона хлопководства', color: '#2d8a5e', type: 'cotton' },
        { coords: [41.38, 64.58], title: 'Бухара — Хлопковые поля', color: '#2d8a5e', type: 'cotton' },
        { coords: [55.75, 37.61], title: 'Москва — Штаб-квартира', color: '#c41e3a', type: 'market' },
        { coords: [54.99, 73.36], title: 'Омск — Распределительный центр', color: '#c9a84c', type: 'route' },
        { coords: [55.03, 82.91], title: 'Новосибирск — Логистический хаб', color: '#c9a84c', type: 'route' },
        { coords: [51.16, 71.47], title: 'Астана — Транзитный узел', color: '#c9a84c', type: 'route' }
    ];

    markers.forEach(m => {
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="width:16px;height:16px;background:${m.color};border-radius:50%;border:2px solid #fff;box-shadow:0 0 10px ${m.color};"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        L.marker(m.coords, { icon })
            .addTo(map)
            .bindPopup(`<b style="color:#1a5c3a">${m.title}</b>`, {
                className: 'custom-popup'
            });
    });

    // Route lines
    const routes = [
        [[40.38, 71.78], [41.3, 69.24], [51.16, 71.47], [54.99, 73.36], [55.75, 37.61]],
        [[40.12, 67.83], [41.3, 69.24], [51.16, 71.47], [55.03, 82.91], [55.75, 37.61]]
    ];

    routes.forEach(route => {
        L.polyline(route, {
            color: '#c9a84c',
            weight: 2,
            opacity: 0.6,
            dashArray: '10, 5'
        }).addTo(map);
    });

    // Add popup styles
    const popupStyle = document.createElement('style');
    popupStyle.textContent = `
        .custom-popup .leaflet-popup-content-wrapper {
            background: #111a15;
            border: 1px solid rgba(45, 138, 94, 0.3);
            border-radius: 12px;
            color: #f0f4f1;
        }
        .custom-popup .leaflet-popup-tip {
            background: #111a15;
            border: 1px solid rgba(45, 138, 94, 0.3);
        }
    `;
    document.head.appendChild(popupStyle);
}

// ===== Particles =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(45, 138, 94, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
    }
`;
document.head.appendChild(particleStyle);

createParticles();

// ===== GSAP Animations =====
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title animation
    gsap.from('.hero-title .title-line', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.from('.stat-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1
    });

    gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.3
    });
}

// ===== Mobile Menu =====
const mobileToggle = document.getElementById('mobileToggle');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        // Add mobile menu functionality here
    });
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

console.log('🌿 Eurasia Textile Platform loaded successfully');
