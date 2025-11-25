// script.js
// Funcionalidad de navegación responsive y animaciones

document.addEventListener('DOMContentLoaded', function () {
    // Menú responsive
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace (en móvil)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });


    // Animaciones de aparición en Hero y secciones
    function fadeInOnScroll() {
        // Fade in para hero
        document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
        // Timeline animado
        document.querySelectorAll('.timeline-content').forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                setTimeout(() => el.classList.add('visible'), i * 120);
            }
        });
        // Tarjetas de especialidades, formación, referencias, info (sin efecto zoom)
        // document.querySelectorAll('.especialidad-card, .formacion-card, .referencia-card, .info-card').forEach((el, i) => {
        //     const rect = el.getBoundingClientRect();
        //     if (rect.top < window.innerHeight - 60) {
        //         if (!el.classList.contains('zoom-in')) {
        //             el.classList.add('zoom-in');
        //         }
        //     }
        // });
    }
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();

    // Scroll suave para navegación con offset (navbar fijo)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validación de formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;
            const formData = new FormData(contactForm);
            contactForm.querySelectorAll('.form-error').forEach(span => span.textContent = '');
            contactForm.querySelector('.form-message').textContent = '';

            // Validación básica
            if (!formData.get('nombre')) {
                setError('nombre', 'El nombre es obligatorio');
                valid = false;
            }
            if (!formData.get('email') || !validateEmail(formData.get('email'))) {
                setError('email', 'Ingrese un email válido');
                valid = false;
            }
            if (!formData.get('tipoOportunidad')) {
                setError('tipoOportunidad', 'Seleccione una opción');
                valid = false;
            }
            if (!formData.get('mensaje')) {
                setError('mensaje', 'El mensaje es obligatorio');
                valid = false;
            }
            if (!valid) return;

            // Simulación de envío exitoso
            contactForm.reset();
            contactForm.querySelector('.form-message').textContent = '¡Mensaje enviado correctamente!';
            contactForm.querySelector('.form-message').classList.add('success');
        });
    }

    function setError(field, message) {
        const input = document.getElementById(field);
        if (input) {
            const errorSpan = input.parentElement.querySelector('.form-error');
            if (errorSpan) errorSpan.textContent = message;
        }
    }

    function validateEmail(email) {
        // Validación simple de email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Animación de barra de habilidades
    document.querySelectorAll('.skill-progress').forEach((bar, i) => {
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }, 300 + i * 200);
    });
});
