// src/main.js

// Importamos Swiper y sus estilos.
import Swiper from 'swiper';
// Importa los MÓDULOS que vas a usar
import { Autoplay, Navigation, Pagination, EffectCards } from 'swiper/modules';

// Importa los ESTILOS base y los de los módulos
import './scss/style.scss';
import 'swiper/css';
import 'swiper/css/navigation';

// Esperamos a que todo el HTML esté cargado antes de ejecutar nuestro código.
document.addEventListener('DOMContentLoaded', () => {

  /**
   * FUNCIÓN PARA EL HEADER FIJO AL HACER SCROLL
   * Añade una clase al header cuando el usuario baja en la página.
   */
  const initHeaderScroll = () => {
    const header = document.querySelector('.site-header');
    if (!header) return; // Si no hay header, no hacemos nada.

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    // Escuchamos el evento de scroll en la ventana.
    window.addEventListener('scroll', handleScroll);
  };


  /**
   * FUNCIÓN PARA EL MENÚ MÓVIL
   * Controla la apertura y cierre del menú en pantallas pequeñas.
   */
    const initMobileMenu = () => {
    const menuToggle = document.querySelector('[data-mobile-toggle]');
    const mainNav = document.querySelector('.site-header__nav');
    const navLinks = mainNav.querySelectorAll('.site-header__nav-link');
    const body = document.body;

    if (!menuToggle || !mainNav) return;

    const toggleMenu = () => {
      const isActive = mainNav.classList.toggle('is-active');
      body.classList.toggle('no-scroll');
      
      // Actualizar estado de accesibilidad
      menuToggle.setAttribute('aria-expanded', isActive);
      
      // Agregar clase al header para estado móvil
      document.querySelector('.site-header').classList.toggle('mobile-open', isActive);
    };

    // Event Listeners
    menuToggle.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en enlaces
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-active')) {
          toggleMenu();
        }
      });
    });

    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-active')) {
        toggleMenu();
      }
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('is-active') && 
          !mainNav.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        toggleMenu();
      }
    });
  };

  /**
     * FUNCIÓN PARA LAS ETIQUETAS FLOTANTES DEL FORMULARIO
     * Asegura que las etiquetas se mantengan arriba si hay contenido.
     */
    const initHeroSection = () => {
    const heroSection = document.querySelector('.hero-section');
    const video = document.querySelector('.hero-section__video-background video');
    const loadingOverlay = document.querySelector('.video-loading-overlay');
    const formInputs = document.querySelectorAll('.form-group__input');

    // Manejar carga del video
    if (video && loadingOverlay) {
      video.addEventListener('loadeddata', () => {
        loadingOverlay.classList.add('loaded');
      });

      // Fallback si el video tarda mucho
      setTimeout(() => {
        loadingOverlay.classList.add('loaded');
      }, 3000);
    }

    // Mejorar inputs del formulario
    formInputs.forEach(input => {
      // Manejar estado inicial
      if (input.value) {
        input.classList.add('has-content');
      }

      input.addEventListener('input', (e) => {
        if (e.target.value) {
          e.target.classList.add('has-content');
        } else {
          e.target.classList.remove('has-content');
        }
      });

      // Efecto de focus mejorado
      input.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focused');
      });
    });

    // Smooth scroll para el indicador
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(scrollIndicator.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    }
  };
  /**
 * FUNCIÓN PARA INICIALIZAR EL CARRUSEL DE CLIENTES MEJORADO
 */
const initClientsCarousel = () => {
  const carousel = document.querySelector('.clients-carousel');
  if (!carousel) return;

  const swiper = new Swiper(carousel, {
    modules: [Autoplay, Navigation],
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 800,
    slidesPerView: 2,
    spaceBetween: 20,
    navigation: {
      nextEl: '.carousel-nav-next',
      prevEl: '.carousel-nav-prev',
    },
    pagination: {
      el: '.carousel-pagination',
      clickable: true,
      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    },
    on: {
      init: function () {
        // Iniciar animación de números
        initStatsCounter();
      },
    },
  });

  return swiper;
};

/**
 * FUNCIÓN PARA ANIMAR LOS CONTADORES DE ESTADÍSTICAS
 */
const initStatsCounter = () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target;
        const target = parseInt(statNumber.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          statNumber.textContent = Math.floor(current);
        }, 16);
        
        observer.unobserve(statNumber);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
};

/**
 * FUNCIÓN PARA MEJORAR LA INTERACCIÓN DEL CARRUSEL
 */
const enhanceClientsSection = () => {
  const clientsSection = document.querySelector('.clients-section');
  
  if (!clientsSection) return;

  // Efecto parallax sutil en scroll
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const decor = clientsSection.querySelector('::before');
    
    if (decor) {
      decor.style.transform = `translateY(${rate}px)`;
    }
  };

  window.addEventListener('scroll', handleScroll);
};

/**
 * FUNCIÓN PARA EL PRELOADER MEJORADO
 */
const initPreloader = () => {
  const preloader = document.getElementById('preloader');
  const progressFill = document.querySelector('.preloader__progress-fill');
  const progressText = document.querySelector('.preloader__progress-text');
  
  if (!preloader) return;

  let progress = 0;
  const targetProgress = 100;
  const duration = 2500; // 2.5 segundos
  const interval = 50; // Actualizar cada 50ms
  const steps = duration / interval;
  const increment = targetProgress / steps;

  // Simular progreso de carga
  const progressInterval = setInterval(() => {
    progress += increment;
    
    if (progress >= targetProgress) {
      progress = targetProgress;
      clearInterval(progressInterval);
      
      // Esperar un poco más para una transición suave
      setTimeout(() => {
        preloader.classList.add('loaded');
        
        // Remover completamente del DOM después de la animación
        setTimeout(() => {
          preloader.remove();
        }, 800);
      }, 300);
    }
    
    // Actualizar barra de progreso y texto
    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
    if (progressText) {
      progressText.textContent = `${Math.floor(progress)}%`;
    }
  }, interval);

  // Fallback: si hay algún error, asegurar que el preloader se quite
  window.addEventListener('load', () => {
    clearInterval(progressInterval);
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 800);
      }
    }, 1000);
  });

  // Fallback por timeout (10 segundos máximo)
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('loaded')) {
      clearInterval(progressInterval);
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 800);
    }
  }, 10000);
};

/**
 * FUNCIÓN PARA PREVENIR SCROLL DURANTE EL PRELOADER
 */
const preventScrollDuringPreload = () => {
  const body = document.body;
  
  // Prevenir scroll
  body.style.overflow = 'hidden';
  
  // Restaurar scroll cuando el preloader termine
  const checkPreloaderRemoved = setInterval(() => {
    const preloader = document.getElementById('preloader');
    if (!preloader || preloader.classList.contains('loaded')) {
      body.style.overflow = '';
      clearInterval(checkPreloaderRemoved);
    }
  }, 100);
};


// --- INICIALIZAMOS TODAS LAS FUNCIONES ---
  // Inicializar preloader primero
  preventScrollDuringPreload();
  initPreloader();
  
  // Luego inicializar el resto de funciones
  initHeaderScroll();
  initMobileMenu();
  initHeroSection();
  initClientsCarousel();
  enhanceClientsSection();
  initLocationsCarousel();

  /**
   * FUNCIÓN PARA EL CARRUSEL DE UBICACIONES
   */
  function initLocationsCarousel() {
    const locationsCarousel = document.querySelector('.locations-carousel');
    if (!locationsCarousel) return;

    new Swiper(locationsCarousel, {
      modules: [Autoplay, Navigation, Pagination, EffectCards], 
      effect: 'cards', // Efecto de cartas apiladas
      grabCursor: true,
      cardsEffect: {
        perSlideOffset: 8,
        perSlideRotate: 2,
        slideShadows: true,
      },
      speed: 1000,
      loop: false, // Desactivamos loop infinito real porque tenemos pocos slides (3)
      rewind: true, // Habilitamos rewind para que vuelva al principio al terminar
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.locations-pagination',
        clickable: true,
      },
    });
  }

});