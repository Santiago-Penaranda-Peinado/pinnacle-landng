// src/main.js

// Importamos todos nuestros estilos SCSS, como ya lo hacíamos.
import './scss/style.scss';

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
    const menuToggle = document.querySelector('.site-header__mobile-toggle');
    const mainNav = document.querySelector('.site-header__nav');
    const navLinks = mainNav.querySelectorAll('a');
    const body = document.body;

    if (!menuToggle || !mainNav) return;

    const toggleMenu = () => {
      // Añade o quita la clase para mostrar/ocultar el menú
      mainNav.classList.toggle('is-active');
      // Añade o quita la clase para bloquear/desbloquear el scroll del body
      body.classList.toggle('no-scroll');

      // Cambia el ícono de hamburguesa por una 'X' y viceversa
      const icon = menuToggle.querySelector('i');
      if (mainNav.classList.contains('is-active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    };
    
    // Escuchamos el clic en el botón de hamburguesa.
    menuToggle.addEventListener('click', toggleMenu);
    
    // Escuchamos clics en los enlaces del menú para cerrarlo automáticamente.
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-active')) {
          toggleMenu();
        }
      });
    });
  };

  // --- INICIALIZAMOS TODAS LAS FUNCIONES ---
  initHeaderScroll();
  initMobileMenu();

});