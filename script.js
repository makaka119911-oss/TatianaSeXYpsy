// Конфигурация Telegram бота
const botToken = '8402206062:AAEJim1GkriKqY_o1mOo0YWSWQDdw5Qy2h0';
const chatId = '-1002313355102';

// Данные для демо-версии личного кабинета
const demoUser = {
    code: 'DEMO2024',
    accessUntil: '2024-12-31',
    trainings: [
        { id: 'oral', name: 'Оральное обольщение', progress: 65 },
        { id: 'lingam', name: 'Массаж Лингам', progress: 30 }
    ]
};

// Глобальные переменные
let currentTraining = '';
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдера
    initSlider();
    
    // Инициализация галереи
    initGallery();
    
    // Инициализация меню для мобильных устройств
    initMobileMenu();
    
    // Инициализация модальных окон
    initModals();
    
    // Инициализация форм
    initForms();
    
    // Инициализация личного кабинета
    initCabinet();
    
    // Плавная прокрутка по якорям
    initSmoothScroll();
});

// Слайдер Hero секции
function initSlider() {
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Автопереключение слайдов
    setInterval(nextSlide, 5000);
    
    // Обработчики кнопок
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
}

// Галерея
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryImages = [
        'gallery1.jpg',
        'gallery2.jpg', 
        'gallery3.jpg',
        'gallery4.jpg',
        'gallery5.jpg',
        'photo_2026-01-28_03-17-53.jpg',
        'photo_2026-01-28_03-18-16.jpg'
    ];
    
    galleryImages.forEach(img => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const imgElement = document.createElement('img');
        imgElement.src = `images/${img}`;
        imgElement.alt = 'Галерея';
        imgElement.loading = 'lazy';
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        
        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(overlay);
        galleryGrid.appendChild(galleryItem);
        
        // Клик для увеличения изображения
        galleryItem.addEventListener('click', function() {
            openLightbox(img);
        });
    });
}

function openLightbox(imgSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = `images/${imgSrc}`;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 40px;
        cursor: pointer;
    `;
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Закрытие лайтбокса
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === closeBtn) {
            document.body.removeChild(lightbox);
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Модальные окна
function initModals() {
    const buyModal = document.getElementById('buy-modal');
    const cabinetModal = document.getElementById('cabinet-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Кнопки "Купить доступ"
    document.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', function() {
            currentTraining = this.getAttribute('data-training');
            const trainingName = this.closest('.training-card').querySelector('h3').textContent;
            document.getElementById('training-name').textContent = trainingName;
            openModal(buyModal);
        });
    });
    
    // Ссылка на личный кабинет
    document.getElementById('cabinet-link').addEventListener('click', function(e) {
        e.preventDefault();
        openModal(cabinetModal);
    });
    
    // Кнопка входа в кабинет из превью
    document.getElementById('login-btn').addEventListener('click', function() {
        openModal(cabinetModal);
    });
    
    // Закрытие модальных окон
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}

function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Личный кабинет
function initCabinet() {
    const loginBtn = document.getElementById('cabinet-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const code = document.getElementById('cabinet-code').value;
            
            if (code === demoUser.code) {
                // Успешный вход
                document.getElementById('cabinet-login-section').style.display = 'none';
                document.getElementById('cabinet-content').style.display = 'block';
                
                // Обновляем информацию
                updateCabinetInfo();
                
                // Сохраняем в localStorage для демо
                localStorage.setItem('cabinetLoggedIn', 'true');
                localStorage.setItem('cabinetCode', code);
                
                // Обновляем навигацию
                document.getElementById('cabinet-link').innerHTML = '<i class="fas fa-user-circle"></i> Кабинет';
            } else {
                alert('Неверный код доступа. Для демо используйте: DEMO2024');
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Выход из кабинета
            localStorage.removeItem('cabinetLoggedIn');
            localStorage.removeItem('cabinetCode');
            
            document.getElementById('cabinet-login-section').style.display = 'block';
            document.getElementById('cabinet-content').style.display = 'none';
            document.getElementById('cabinet-code').value = '';
            
            document.getElementById('cabinet-link').innerHTML = 'Личный кабинет';
            
            closeModal(document.getElementById('cabinet-modal'));
        });
    }
    
    // Проверяем, был ли пользователь уже авторизован
    if (localStorage.getItem('cabinetLoggedIn') === 'true') {
        document.getElementById('cabinet-login-section').style.display = 'none';
        document.getElementById('cabinet-content').style.display = 'block';
        updateCabinetInfo();
        document.getElementById('cabinet-link').innerHTML = '<i class="fas fa-user-circle"></i> Кабинет';
    }
}

function updateCabinetInfo() {
    // Обновляем дату доступа
    document.getElementById('access-until').textContent = formatDate(demoUser.accessUntil);
    
    // Рассчитываем оставшиеся дни
    const today = new Date();
    const accessDate = new Date(demoUser.accessUntil);
    const daysLeft = Math.ceil((accessDate - today) / (1000 * 60 * 60 * 24));
    document.getElementById('days-left').textContent = daysLeft > 0 ? daysLeft : 0;
    
    // Обновляем список тренингов
    const trainingsList = document.querySelector('.trainings-list');
    trainingsList.innerHTML = '';
    
    demoUser.trainings.forEach(training => {
        const trainingItem = document.createElement('div');
        trainingItem.className = 'training-item';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            height: 10px;
            background: #eee;
            border-radius: 5px;
            margin: 10px 0;
            overflow: hidden;
        `;
        
        const progressFill = document.createElement('div');
        progressFill.style.cssText = `
            height: 100%;
            width: ${training.progress}%;
            background: linear-gradient(to right, var(--primary-color), var(--accent-gold));
            border-radius: 5px;
        `;
        
        progressBar.appendChild(progressFill);
        
        trainingItem.innerHTML = `
            <strong>${training.name}</strong>
            <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                <span>Прогресс: ${training.progress}%</span>
                <button class="btn-details" style="padding: 3px 10px; font-size: 14px;">Продолжить</button>
            </div>
        `;
        
        trainingItem.appendChild(progressBar);
        trainingsList.appendChild(trainingItem);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

// Формы и отправка в Telegram
function initForms() {
    // Форма консультации
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const contact = document.getElementById('contact').value;
            const message = document.getElementById('message').value || 'Нет сообщения';
            
            const telegramMessage = `
<b>📞 НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ</b>

👤 <b>Имя:</b> ${name}
📱 <b>Контакты:</b> ${contact}

💬 <b>Сообщение:</b>
${message}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
            `;
            
            sendToTelegram(telegramMessage).then(() => {
                alert('✅ Заявка отправлена! Татьяна свяжется с вами в Telegram в течение 24 часов.');
                consultationForm.reset();
            }).catch(() => {
                alert('❌ Ошибка отправки. Пожалуйста, напишите напрямую в Telegram.');
            });
        });
    }
    
    // Форма обратной связи в контактах
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            const telegramMessage = `
<b>📧 НОВОЕ СООБЩЕНИЕ С САЙТА</b>

👤 <b>Имя:</b> ${name}
📧 <b>Email:</b> ${email}

💬 <b>Сообщение:</b>
${message}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
            `;
            
            sendToTelegram(telegramMessage).then(() => {
                alert('✅ Сообщение отправлено! Мы ответим вам в ближайшее время.');
                contactForm.reset();
            }).catch(() => {
                alert('❌ Ошибка отправки. Пожалуйста, напишите напрямую в Telegram.');
            });
        });
    }
    
    // Кнопки покупки в модальном окне
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const months = this.getAttribute('data-months');
            const trainingName = document.getElementById('training-name').textContent;
            
            const telegramMessage = `
<b>🛒 НОВЫЙ ЗАКАЗ ТРЕНИНГА</b>

🎯 <b>Тренинг:</b> ${trainingName}
📅 <b>Доступ:</b> ${months} месяцев
💰 <b>Цена:</b> ${months === '6' ? '5 900 ₽' : '9 900 ₽'}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
            
<i>Клиент ожидает инструкций по оплате и доступу.</i>
            `;
            
            sendToTelegram(telegramMessage).then(() => {
                alert(`✅ Запрос на покупку отправлен! Татьяна свяжется с вами для предоставления доступа к тренингу на ${months} месяцев.`);
                closeModal(document.getElementById('buy-modal'));
            }).catch(() => {
                alert('❌ Ошибка отправки. Пожалуйста, напишите напрямую в Telegram для оформления заказа.');
            });
        });
    });
}

// Функция отправки в Telegram
async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        throw error;
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.training-card, .events-column, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// Инициализация анимаций при скролле
window.addEventListener('load', initScrollAnimations);
