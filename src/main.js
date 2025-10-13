// src/main.js

// Importamos Swiper y sus estilos.
import Swiper from 'swiper';
// Importa los MÓDULOS que vas a usar
import { Autoplay, Navigation } from 'swiper/modules';

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
    if (video) {
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
        slidesPerView: 3,
        spaceBetween: 25,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 50,
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
 * FUNCIÓN PARA ANIMAR LAS TARJETAS DE RESULTADOS AL HACER SCROLL
 * Versión mejorada con efectos más sofisticados
 */
const initResultsAnimation = () => {
  const resultCards = document.querySelectorAll('.result-card');
  const sectionHeader = document.querySelector('.results-section .section-header');

  if (!resultCards.length) return;

  // Configuración del observer para las tarjetas
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        
        // Añadimos la clase para activar la animación CSS
        card.classList.add('is-visible');
        
        // Añadimos un pequeño delay para el efecto de escalonado
        const index = Array.from(resultCards).indexOf(card);
        card.style.transitionDelay = `${index * 150}ms`;
        
        // Dejamos de observar el elemento una vez que ha sido animado
        cardObserver.unobserve(card);
      }
    });
  }, { 
    threshold: 0.15, // La animación se dispara cuando el 15% de la tarjeta es visible
    rootMargin: '0px 0px -50px 0px' // Se activa un poco antes de que entre completamente
  });

  // Observamos cada tarjeta
  resultCards.forEach(card => {
    cardObserver.observe(card);
  });

  // Observer adicional para el header de la sección
  if (sectionHeader) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // El header ya tiene su animación CSS, así que solo necesitamos observarlo
          headerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    headerObserver.observe(sectionHeader);
  }
};

/**
 * FUNCIÓN PARA MEJORAR LAS INTERACCIONES DE LAS TARJETAS
 */
const enhanceResultsInteractions = () => {
  const resultCards = document.querySelectorAll('.result-card');

  resultCards.forEach(card => {
    // Mejorar la accesibilidad del teclado
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

    // Efecto de ripple al hacer clic
    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        top: ${y}px;
        left: ${x}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(252, 163, 17, 0.3);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
      `;
      
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
};

// Añadir el CSS para el efecto ripple dinámicamente
const addRippleStyles = () => {
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          width: 200px;
          height: 200px;
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

/// En tu función principal, actualiza las inicializaciones:
  initHeaderScroll();
  initMobileMenu();
  initHeroSection();
  initClientsCarousel();

  addRippleStyles();
  initResultsAnimation();
  enhanceResultsInteractions();

});