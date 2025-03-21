// Three.js сцена
let camera, scene, renderer;
let particlesMesh, sphere;

// Ініціалізація 3D-сцени
function init3DScene() {
    // Сцена
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    
    // Камера
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Створення частинок для імітації туману
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x4776e6,
        transparent: true,
        opacity: 0.5
    });
    
    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Додавання освітлення
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x4776e6, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // Додавання сфери для представлення спогаду
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.7,
        emissive: 0x4776e6,
        emissiveIntensity: 0.3
    });
    
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Рендерер
    const canvas = document.getElementById('experience-canvas');
    if (canvas) {
        renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            canvas: canvas 
        });
        
        const previewElement = document.querySelector('.experience-preview');
        if (previewElement) {
            renderer.setSize(previewElement.offsetWidth, previewElement.offsetHeight);
        } else {
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
    
    // Анімація
    animate();
    
    // Обробка зміни розміру вікна
    window.addEventListener('resize', handleResize);
}

// Функція анімації
function animate() {
    requestAnimationFrame(animate);
    
    if (particlesMesh) {
        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;
    }
    
    if (sphere) {
        sphere.rotation.y += 0.005;
        
        // Пульсація сфери
        const time = Date.now() * 0.001;
        sphere.scale.x = 1 + Math.sin(time) * 0.1;
        sphere.scale.y = 1 + Math.sin(time) * 0.1;
        sphere.scale.z = 1 + Math.sin(time) * 0.1;
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Обробка зміни розміру вікна
function handleResize() {
    const previewElement = document.querySelector('.experience-preview');
    
    if (camera && previewElement) {
        camera.aspect = previewElement.offsetWidth / previewElement.offsetHeight;
        camera.updateProjectionMatrix();
    }
    
    if (renderer && previewElement) {
        renderer.setSize(previewElement.offsetWidth, previewElement.offsetHeight);
    }
}

// Обробники подій після завантаження DOM
document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація 3D-сцени
    init3DScene();
    
    // Обробка кліків на кнопку "Створити відлуння"
    document.querySelectorAll('.create-echo-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const uploaderElement = document.getElementById('memory-uploader');
            if (uploaderElement) {
                uploaderElement.style.display = 'block';
                uploaderElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Налаштування зони завантаження файлів
    const uploaderZone = document.getElementById('uploader-zone');
    const fileInput =
// Обробка подій після завантаження сторінки
document.addEventListener('DOMContentLoaded', function() {
    // Кнопки тарифних планів
    const planButtons = document.querySelectorAll('.plan .btn');
    
    // Додаємо обробник подій до кожної кнопки
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Визначаємо, яка кнопка була натиснута
            const planName = this.closest('.plan').querySelector('h3').textContent;
            
            // Показуємо повідомлення в залежності від плану
            if (planName === 'Безкоштовно') {
                showMessage('Ви обрали безкоштовний план. Почніть створювати ваші перші відлуння!');
            } else if (planName === 'Echoes Plus') {
                showMessage('Дякуємо за вибір преміум-плану Echoes Plus! На даний момент ця функція знаходиться в розробці.');
            }
        });
    });
    
    // Кнопка "Створити відлуння"
    const createButton = document.querySelector('.hero .btn');
    createButton.addEventListener('click', function() {
        showMessage('Функціонал створення відлунь знаходиться в розробці. Скоро ви зможете завантажувати свої спогади!');
    });
    
    // Анімація для елементів при прокрутці
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature, .plan');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Якщо елемент у полі зору
            if (position.top < window.innerHeight && position.bottom >= 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Ініціалізуємо анімацію при прокрутці
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запускаємо один раз при завантаженні
});

// Функція для показу повідомлень
function showMessage(text) {
    // Перевіряємо, чи існує вже модальне вікно
    let messageModal = document.getElementById('message-modal');
    
    // Якщо ні, створюємо його
    if (!messageModal) {
        messageModal = document.createElement('div');
        messageModal.id = 'message-modal';
        messageModal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <p id="modal-message"></p>
            </div>
        `;
        document.body.appendChild(messageModal);
        
        // Додаємо обробник для закриття модального вікна
        const closeBtn = messageModal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            messageModal.style.display = 'none';
        });
        
        // Закриття модального вікна при клацанні поза ним
        window.addEventListener('click', function(event) {
            if (event.target === messageModal) {
                messageModal.style.display = 'none';
            }
        });
    }
    
    // Оновлюємо повідомлення і показуємо модальне вікно
    document.getElementById('modal-message').textContent = text;
    messageModal.style.display = 'flex';
}
