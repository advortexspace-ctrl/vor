// Основной скрипт для сайта Advortex

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initNavigation();
    initStarfield();
    initVortexControls();
    initVisualization();
    initContactForm();
    initScrollAnimations();
    initResponsiveFeatures();
});

// Навигация
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Переключение меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Обновление активной ссылки
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Изменение навигации при скролле
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(10, 10, 20, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 20, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Обновление активной ссылки при скролле
        updateActiveNavLink();
    });
}

// Обновление активной ссылки навигации
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Создание звездного поля
function initStarfield() {
    const starfield = document.getElementById('starfield');
    const vizScene = document.getElementById('vizScene');
    
    if (!starfield && !vizScene) return;
    
    // Создание звезд для главной сцены
    if (starfield) {
        createStars(starfield, 150);
    }
    
    // Создание звезд для сцены визуализации
    if (vizScene) {
        createStars(vizScene, 100);
        createVortex(vizScene);
    }
}

// Создание звезд в контейнере
function createStars(container, count) {
    // Очистка существующих звезд
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Случайная позиция
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Случайный размер
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Случайная яркость и анимация
        const opacity = Math.random() * 0.7 + 0.3;
        star.style.opacity = opacity;
        
        const delay = Math.random() * 3;
        star.style.animationDelay = `${delay}s`;
        
        container.appendChild(star);
    }
}

// Создание вихря для сцены визуализации
function createVortex(container) {
    const vortexContainer = document.createElement('div');
    vortexContainer.className = 'vortex-container';
    vortexContainer.style.width = '100%';
    vortexContainer.style.height = '100%';
    
    const vortex = document.createElement('div');
    vortex.className = 'vortex';
    vortex.id = 'interactiveVortex';
    
    // Создание колец
    const ring1 = document.createElement('div');
    ring1.className = 'ring ring-1';
    
    const ring2 = document.createElement('div');
    ring2.className = 'ring ring-2';
    
    const ring3 = document.createElement('div');
    ring3.className = 'ring ring-3';
    
    // Создание ядра
    const core = document.createElement('div');
    core.className = 'vortex-core';
    core.id = 'vortexCore';
    
    // Сборка вихря
    vortex.appendChild(ring1);
    vortex.appendChild(ring2);
    vortex.appendChild(ring3);
    vortex.appendChild(core);
    
    // Создание потоков данных
    const leftStream = document.createElement('div');
    leftStream.className = 'data-stream left-stream';
    leftStream.id = 'leftStream';
    
    const rightStream = document.createElement('div');
    rightStream.className = 'data-stream right-stream';
    rightStream.id = 'rightStream';
    
    const beam = document.createElement('div');
    beam.className = 'beam';
    rightStream.appendChild(beam);
    
    // Создание частиц для левого потока
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        leftStream.appendChild(particle);
    }
    
    // Сборка контейнера
    vortexContainer.appendChild(vortex);
    vortexContainer.appendChild(leftStream);
    vortexContainer.appendChild(rightStream);
    
    container.appendChild(vortexContainer);
    
    // Добавление туманности
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    container.appendChild(nebula);
}

// Управление элементами вихря
function initVortexControls() {
    const rotateToggle = document.getElementById('rotateToggle');
    const glowToggle = document.getElementById('glowToggle');
    const starsToggle = document.getElementById('starsToggle');
    const vortex = document.querySelector('.vortex');
    const vortexCore = document.querySelector('.vortex-core');
    const starfield = document.getElementById('starfield');
    
    // Переключение вращения
    if (rotateToggle && vortex) {
        rotateToggle.addEventListener('click', function() {
            const isPaused = vortex.style.animationPlayState === 'paused';
            
            if (isPaused) {
                vortex.style.animationPlayState = 'running';
                this.querySelector('#rotateIcon').className = 'fas fa-play';
                this.querySelector('#rotateText').textContent = 'Вращение';
            } else {
                vortex.style.animationPlayState = 'paused';
                this.querySelector('#rotateIcon').className = 'fas fa-pause';
                this.querySelector('#rotateText').textContent = 'Пауза';
            }
        });
    }
    
    // Переключение свечения
    if (glowToggle && vortexCore) {
        glowToggle.addEventListener('click', function() {
            const isDimmed = vortexCore.style.opacity === '0.3';
            
            if (isDimmed) {
                vortexCore.style.opacity = '1';
                vortexCore.style.boxShadow = '0 0 30px 10px rgba(136, 255, 255, 0.5)';
                this.querySelector('#glowIcon').className = 'fas fa-lightbulb';
                this.querySelector('#glowText').textContent = 'Свечение';
            } else {
                vortexCore.style.opacity = '0.3';
                vortexCore.style.boxShadow = '0 0 10px 3px rgba(136, 255, 255, 0.3)';
                this.querySelector('#glowIcon').className = 'far fa-lightbulb';
                this.querySelector('#glowText').textContent = 'Тусклое';
            }
        });
    }
    
    // Переключение звезд
    if (starsToggle && starfield) {
        starsToggle.addEventListener('click', function() {
            const stars = starfield.querySelectorAll('.star');
            const areVisible = stars[0].style.opacity !== '0';
            
            if (areVisible) {
                stars.forEach(star => {
                    star.style.opacity = '0';
                });
                this.querySelector('#starsIcon').className = 'far fa-star';
                this.querySelector('#starsText').textContent = 'Звезды';
            } else {
                stars.forEach(star => {
                    star.style.opacity = star.dataset.originalOpacity || '0.5';
                });
                this.querySelector('#starsIcon').className = 'fas fa-star';
                this.querySelector('#starsText').textContent = 'Без звезд';
            }
        });
        
        // Сохранение оригинальной прозрачности звезд
        const stars = starfield.querySelectorAll('.star');
        stars.forEach(star => {
            star.dataset.originalOpacity = star.style.opacity;
        });
    }
}

// Интерактивная визуализация
function initVisualization() {
    const rotationSpeed = document.getElementById('rotationSpeed');
    const glowIntensity = document.getElementById('glowIntensity');
    const starDensity = document.getElementById('starDensity');
    const colorOptions = document.querySelectorAll('.color-option');
    const vizScene = document.getElementById('vizScene');
    
    // Обновление скорости вращения
    if (rotationSpeed) {
        const speedValue = document.getElementById('speedValue');
        const rotationStat = document.getElementById('rotationStat');
        const interactiveVortex = document.getElementById('interactiveVortex');
        
        rotationSpeed.addEventListener('input', function() {
            const value = this.value;
            speedValue.textContent = value;
            
            if (rotationStat) {
                rotationStat.textContent = parseFloat(value).toFixed(1);
            }
            
            if (interactiveVortex) {
                const speed = 40 - (value * 3); // Меньше значение = быстрее вращение
                interactiveVortex.style.animationDuration = `${speed}s`;
            }
        });
    }
    
    // Обновление интенсивности свечения
    if (glowIntensity) {
        const glowValue = document.getElementById('glowValue');
        const glowStat = document.getElementById('glowStat');
        const vortexCore = document.getElementById('vortexCore');
        
        glowIntensity.addEventListener('input', function() {
            const value = this.value;
            glowValue.textContent = value;
            
            if (glowStat) {
                glowStat.textContent = `${value}0%`;
            }
            
            if (vortexCore) {
                const intensity = value / 10;
                const glowSize = 10 + (value * 3);
                vortexCore.style.opacity = intensity;
                vortexCore.style.boxShadow = `0 0 ${glowSize}px ${glowSize/2}px rgba(136, 255, 255, ${intensity * 0.7})`;
            }
        });
    }
    
    // Обновление плотности звезд
    if (starDensity && vizScene) {
        const densityValue = document.getElementById('densityValue');
        const starsStat = document.getElementById('starsStat');
        
        starDensity.addEventListener('input', function() {
            const value = this.value;
            densityValue.textContent = value;
            
            if (starsStat) {
                starsStat.textContent = value;
            }
            
            // Пересоздание звезд с новой плотностью
            createStars(vizScene, parseInt(value));
            createVortex(vizScene); // Воссоздаем вихрь, так как звезды его перезаписывают
        });
    }
    
    // Изменение цвета
    if (colorOptions.length > 0) {
        const vortexCore = document.getElementById('vortexCore');
        const rings = document.querySelectorAll('.ring');
        const leftStream = document.getElementById('leftStream');
        const rightStream = document.getElementById('rightStream');
        
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Удаление активного класса у всех опций
                colorOptions.forEach(opt => opt.classList.remove('active'));
                
                // Добавление активного класса к выбранной опции
                this.classList.add('active');
                
                const color = this.getAttribute('data-color');
                
                // Обновление цвета вихря
                if (vortexCore) {
                    vortexCore.style.backgroundColor = color;
                    
                    // Обновление тени свечения
                    const currentGlow = glowIntensity ? glowIntensity.value : 5;
                    const intensity = currentGlow / 10;
                    const glowSize = 10 + (currentGlow * 3);
                    
                    // Преобразование hex в rgba
                    const r = parseInt(color.slice(1, 3), 16);
                    const g = parseInt(color.slice(3, 5), 16);
                    const b = parseInt(color.slice(5, 7), 16);
                    
                    vortexCore.style.boxShadow = `0 0 ${glowSize}px ${glowSize/2}px rgba(${r}, ${g}, ${b}, ${intensity * 0.7})`;
                }
                
                // Обновление цвета колец
                if (rings.length > 0) {
                    rings.forEach(ring => {
                        ring.style.borderColor = `${color}80`; // 80 = 50% прозрачность в hex
                    });
                }
                
                // Обновление цвета потоков
                if (rightStream) {
                    rightStream.style.background = `linear-gradient(90deg, transparent, ${color}, transparent)`;
                }
            });
        });
    }
}

// Форма обратной связи
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все обязательные поля.');
                return;
            }
            
            // В реальном приложении здесь был бы AJAX запрос
            alert('Сообщение отправлено! В реальном приложении эта форма отправила бы данные на сервер.');
            
            // Сброс формы
            contactForm.reset();
        });
    }
}

// Анимации при скролле
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.about-card, .principle-card, .contact-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Настройка начального состояния
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Адаптивные функции
function initResponsiveFeatures() {
    // Динамическое обновление количества звезд при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Пересоздание звезд с учетом нового размера экрана
            const starfield = document.getElementById('starfield');
            if (starfield) {
                const starCount = Math.min(300, Math.max(50, 
                    Math.floor((window.innerWidth * window.innerHeight) / 5000)
                ));
                createStars(starfield, starCount);
            }
        }, 250);
    });
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Инициализация при загрузке
window.onload = function() {
    // Добавление эффекта затухания при загрузке
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
    
    // Инициализация значений для визуализации
    const rotationSpeed = document.getElementById('rotationSpeed');
    const glowIntensity = document.getElementById('glowIntensity');
    const starDensity = document.getElementById('starDensity');
    
    if (rotationSpeed) rotationSpeed.dispatchEvent(new Event('input'));
    if (glowIntensity) glowIntensity.dispatchEvent(new Event('input'));
    if (starDensity) starDensity.dispatchEvent(new Event('input'));
};
