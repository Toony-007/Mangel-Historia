// Funcionalidad principal de la página web
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initializeNavigation();
    initializeScrollAnimations();
    initializeInteractiveElements();
    initializeProgressIndicator();
    initializeTooltips();
    initializeLazyLoading();
    initializeAccessibility();
});

// Navegación suave y activa
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const navigation = document.getElementById('navigation');
    
    // Navegación suave al hacer clic
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navigation.offsetHeight - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Actualizar navegación activa al hacer scroll
    window.addEventListener('scroll', throttle(() => {
        let current = '';
        const scrollPosition = window.pageYOffset + navigation.offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Efecto de navegación al hacer scroll
        if (window.pageYOffset > 100) {
            navigation.style.background = 'rgba(255, 255, 255, 0.98)';
            navigation.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navigation.style.background = 'rgba(255, 255, 255, 0.95)';
            navigation.style.boxShadow = 'none';
        }
    }, 100));
}

// Animaciones de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animaciones específicas para diferentes elementos
                if (entry.target.classList.contains('principle-card')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('tribute-card')) {
                    animatePercentage(entry.target);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .principle-card,
        .mechanism-card,
        .tribute-card,
        .timeline-item,
        .organ-card,
        .fort-card,
        .social-level,
        .power-card,
        .order-card,
        .reform-item,
        .conflict-item,
        .consequence-category
    `);
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Elementos interactivos
function initializeInteractiveElements() {
    // Efecto hover mejorado para tarjetas
    const cards = document.querySelectorAll(`
        .principle-card,
        .mechanism-card,
        .tribute-card,
        .organ-card,
        .fort-card,
        .power-card,
        .order-card,
        .reform-item,
        .participation-card,
        .consequence-category
    `);
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de click para elementos interactivos
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
    
    // Animación del indicador de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const firstSection = document.querySelector('.content-section');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Indicador de progreso de lectura
function initializeProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 50));
}

// Tooltips informativos
function initializeTooltips() {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(44, 62, 80, 0.95);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.9rem;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 10000;
        max-width: 200px;
        text-align: center;
    `;
    document.body.appendChild(tooltip);
    
    // Agregar tooltips a elementos específicos
    const tooltipElements = [
        { selector: '.tribute-percentage', text: 'Porcentaje de impuesto aplicado' },
        { selector: '.timeline-marker', text: 'Período histórico importante' },
        { selector: '.objective-icon', text: 'Objetivo principal del sistema colonial' },
        { selector: '.mechanism-icon', text: 'Mecanismo de control administrativo' },
        { selector: '.power-icon', text: 'Poder otorgado por el Patronato Real' }
    ];
    
    tooltipElements.forEach(({ selector, text }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                tooltip.textContent = text;
                tooltip.style.opacity = '1';
                updateTooltipPosition(e, tooltip);
            });
            
            element.addEventListener('mousemove', function(e) {
                updateTooltipPosition(e, tooltip);
            });
            
            element.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
            });
        });
    });
}

// Carga perezosa de imágenes
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Mejoras de accesibilidad
function initializeAccessibility() {
    // Navegación por teclado mejorada
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Saltar al contenido principal
    const skipLink = document.createElement('a');
    skipLink.href = '#introduccion';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Anunciar cambios de sección para lectores de pantalla
    const sections = document.querySelectorAll('.content-section');
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector('.section-title');
                if (sectionTitle) {
                    announcer.textContent = `Sección: ${sectionTitle.textContent}`;
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Animaciones específicas
function animateCounter(element) {
    const counter = element.querySelector('.principle-icon');
    if (counter && counter.textContent.match(/\d/)) {
        const finalNumber = parseInt(counter.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 30;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                counter.textContent = finalNumber;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(currentNumber);
            }
        }, 50);
    }
}

function animatePercentage(element) {
    const percentage = element.querySelector('.tribute-percentage');
    if (percentage && percentage.textContent.includes('%')) {
        const finalValue = parseInt(percentage.textContent);
        let currentValue = 0;
        const increment = finalValue / 20;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                percentage.textContent = finalValue + '%';
                clearInterval(timer);
            } else {
                percentage.textContent = Math.floor(currentValue) + '%';
            }
        }, 75);
    }
}

function animateTimelineItem(element) {
    const marker = element.querySelector('.timeline-marker');
    if (marker) {
        marker.style.transform = 'scale(0)';
        marker.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            marker.style.transform = 'scale(1)';
        }, 200);
    }
}

// Utilidades
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function updateTooltipPosition(e, tooltip) {
    const x = e.clientX;
    const y = e.clientY;
    const tooltipRect = tooltip.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let left = x + 10;
    let top = y - tooltipRect.height - 10;
    
    // Ajustar posición si se sale de la pantalla
    if (left + tooltipRect.width > windowWidth) {
        left = x - tooltipRect.width - 10;
    }
    
    if (top < 0) {
        top = y + 10;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
}

// Funcionalidad de búsqueda (opcional)
function initializeSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        background: white;
        border-radius: 25px;
        box-shadow: var(--shadow);
        padding: 5px;
        transition: var(--transition);
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar en el contenido...';
    searchInput.style.cssText = `
        border: none;
        outline: none;
        padding: 10px 15px;
        border-radius: 20px;
        width: 200px;
        font-size: 0.9rem;
    `;
    
    searchContainer.appendChild(searchInput);
    document.body.appendChild(searchContainer);
    
    // Funcionalidad de búsqueda
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value);
        }, 300);
    });
}

function performSearch(query) {
    const sections = document.querySelectorAll('.content-section');
    const results = [];
    
    if (query.length < 3) {
        clearSearchHighlights();
        return;
    }
    
    sections.forEach(section => {
        const textContent = section.textContent.toLowerCase();
        if (textContent.includes(query.toLowerCase())) {
            results.push(section);
            highlightSearchTerm(section, query);
        }
    });
    
    if (results.length > 0) {
        results[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function highlightSearchTerm(section, term) {
    // Implementación básica de resaltado
    const walker = document.createTreeWalker(
        section,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(term.toLowerCase())) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        const regex = new RegExp(`(${term})`, 'gi');
        const highlightedText = textNode.textContent.replace(regex, '<mark class="search-highlight">$1</mark>');
        
        if (highlightedText !== textNode.textContent) {
            const wrapper = document.createElement('span');
            wrapper.innerHTML = highlightedText;
            parent.replaceChild(wrapper, textNode);
        }
    });
}

function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// Modo oscuro (opcional)
function initializeDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow);
        transition: var(--transition);
        z-index: 1000;
    `;
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(darkModeToggle);
}

// Inicializar funcionalidades opcionales
// initializeSearch();
// initializeDarkMode();

// Manejo de errores
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Página cargada en ${Math.round(loadTime)}ms`);
    
    // Lazy load de funcionalidades no críticas
    setTimeout(() => {
        // Cargar funcionalidades adicionales después de la carga inicial
        if ('IntersectionObserver' in window) {
            console.log('Funcionalidades avanzadas cargadas');
        }
    }, 1000);
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registrado con éxito:', registration.scope);
            })
            .catch(function(error) {
                console.log('SW falló al registrarse:', error);
            });
    });
}