export function setupSmoothScroll() {
    // Seleccion de elementos del DOM con clase `nav-link` (enlaces de navegacion)
    const navLinks = document.querySelectorAll('.nav-link');
    // Seleccion del elemento `<header>` de página, para futuros calculos de desplazamiento
    const header = document.querySelector('header');
    
    // Iteracion por cada enlace de navegación seleccionados
    navLinks.forEach(link => {
        // Listener de evento `click` para cada enlace
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Obtencion de valor de atributo `data-targer`que contiene el id (#) de la seccion de enlace
            const target = (link as HTMLElement).dataset.target;

            if (target) {
                // En caso de verificar el valor de `target` selecciona el elemento del DOM que tiene ese ID (#)
                const targetElement = document.getElementById(target);
                // En caso de encontrar el `destino, se realiza el calculo de desplazamiento
                if (targetElement) {
                    // Calculo de altura del header
                    const headerHeight = header?.offsetHeight || 0;
                    // Calculo posicion vertical del destino y ajuste a la altura de `header`
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    // Aplicacion de desplazamiento suave(smooth)
                    window.scrollTo({ top: targetPosition, behavior: 'smooth'});
                }
            }
        });
    });

    // Intersection Observer para resaltar el enlace activo
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: `-${header?.offsetHeight || 0}px 0px 0px 0px`,
        threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                document.querySelector(`.nav-link[data-target="${id}"]`)?.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
}