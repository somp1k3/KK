const localResponses = {
    getResponse: function(text) {
        const lower = text.toLowerCase();
        
        // Приветствие
        if (this.matches(lower, ['привет', 'здравствуй', 'hello', 'hi', 'хай'])) {
            return 'Привет! 👋 Рад вас видеть! Я работаю в локальном режиме и готов помочь с вопросами по программированию.';
        }
        
        // Как дела
        if (this.matches(lower, ['как дела', 'how are you', 'как ты'])) {
            return 'Всё отлично! 😊 Готов помогать вам с кодом и отвечать на вопросы. Хотя API DeepSeek временно недоступен, я всё равно здесь!';
        }
        
        // Помощь
        if (this.matches(lower, ['помощь', 'help', 'что ты умеешь', 'функции'])) {
            return this.getHelpResponse();
        }
        
        // API и ключ
        if (this.matches(lower, ['ключ', 'api', 'баланс', 'счет', 'платеж', 'деньги'])) {
            return this.getAPIInfoResponse();
        }
        
        // Программирование
        if (this.matches(lower, ['код', 'программирование', 'разработка', 'кодить'])) {
            return this.getProgrammingResponse(lower);
        }
        
        // HTML
        if (this.matches(lower, ['html', 'верстка', 'разметка', 'тег'])) {
            return this.getHTMLResponse(lower);
        }
        
        // CSS
        if (this.matches(lower, ['css', 'стили', 'дизайн', 'адаптив'])) {
            return this.getCSSResponse(lower);
        }
        
        // JavaScript
        if (this.matches(lower, ['javascript', 'js', 'скрипт', 'функция', 'переменн'])) {
            return this.getJSResponse(lower);
        }
        
        // Сайт
        if (this.matches(lower, ['сайт', 'вебсайт', 'веб-сайт', 'лендинг', 'страница'])) {
            return this.getWebsiteResponse(lower);
        }
        
        // Вопросы
        if (lower.includes('?') || lower.includes('как') || lower.includes('почему') || lower.includes('что такое')) {
            return this.getQuestionResponse(text);
        }
        
        // Благодарность
        if (this.matches(lower, ['спасибо', 'благодарю', 'thanks', 'thank you'])) {
            return 'Пожалуйста! 😊 Всегда рад помочь. Если нужна более сложная помощь, рекомендую пополнить баланс на platform.deepseek.com';
        }
        
        // Прощание
        if (this.matches(lower, ['пока', 'до свидания', 'bye', 'goodbye', 'выход'])) {
            return 'До встречи! 👋 Не забывайте сохранять свой код в GitHub!';
        }
        
        // Общий ответ
        return this.getGeneralResponse(text);
    },
    
    matches: function(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    },
    
    getHelpResponse: function() {
        return `**📋 Что я умею в локальном режиме:**\n\n` +
               `**🎯 Основные темы:**\n` +
               `• HTML/CSS/JavaScript помощь\n` +
               `• Примеры кода и лучшие практики\n` +
               `• Объяснение концепций программирования\n` +
               `• Советы по веб-разработке\n\n` +
               `**💡 Примеры запросов:**\n` +
               `• "Напиши код для модального окна"\n` +
               `• "Как сделать адаптивную сетку?"\n` +
               `• "Объясни promises в JavaScript"\n` +
               `• "Создай простой REST API"\n\n` +
               `**🔧 Для полного доступа:**\n` +
               `Пополните баланс на platform.deepseek.com`;
    },
    
    getAPIInfoResponse: function() {
        return `**🔑 Информация об API:**\n\n` +
               `**Статус:** ❌ Требуется пополнение баланса\n` +
               `**Ключ:** \`sk-30fe27d332404bff9706f08fb337b8eb\`\n\n` +
               `**💰 Как восстановить доступ:**\n` +
               `1. Перейдите на [platform.deepseek.com](https://platform.deepseek.com)\n` +
               `2. Войдите в свой аккаунт\n` +
               `3. В разделе "Billing" пополните баланс\n` +
               `4. Вернитесь сюда - API заработает автоматически\n\n` +
               `**💳 Минимальный депозит:** $5-10\n` +
               `**📊 Тарификация:** Около $0.001 за 1K токенов`;
    },
    
    getProgrammingResponse: function(lowerText) {
        if (lowerText.includes('напиши') || lowerText.includes('создай') || lowerText.includes('пример')) {
            if (lowerText.includes('html')) {
                return this.getHTMLResponse(lowerText);
            } else if (lowerText.includes('css')) {
                return this.getCSSResponse(lowerText);
            } else if (lowerText.includes('javascript') || lowerText.includes('js')) {
                return this.getJSResponse(lowerText);
            } else if (lowerText.includes('функц') || lowerText.includes('function')) {
                return `**📝 Пример функции на JavaScript:**\n\n\`\`\`javascript\n// Простая функция сложения\nfunction addNumbers(a, b) {\n    // Проверка типов\n    if (typeof a !== 'number' || typeof b !== 'number') {\n        throw new Error('Оба аргумента должны быть числами');\n    }\n    \n    // Возврат результата\n    return a + b;\n}\n\n// Использование\nconst result = addNumbers(5, 3); // 8\nconsole.log('Результат:', result);\n\n// Стрелочная функция (ES6)\nconst multiply = (x, y) => x * y;\n\`\`\`\n\n**💡 Советы:**\n• Всегда проверяйте входные параметры\n• Используйте понятные имена функций\n• Добавляйте комментарии для сложной логики`;
            }
        }
        
        return `**💻 Помощь по программированию:**\n\n` +
               `Я могу помочь с:\n\n` +
               `**🔹 Frontend:**\n` +
               `• HTML5 семантическая разметка\n` +
               `• CSS3 Flexbox/Grid анимации\n` +
               `• JavaScript ES6+, React, Vue\n\n` +
               `**🔹 Backend:**\n` +
               `• Node.js, Express\n` +
               `• REST API принципы\n` +
               `• Работа с базами данных\n\n` +
               `**🔹 Инструменты:**\n` +
               `• Git и GitHub\n` +
               `• Webpack, Vite\n` +
               `• Docker основы\n\n` +
               `**🎯 Уточните:** Что именно вас интересует?`;
    },
    
    getHTMLResponse: function(lowerText) {
        if (lowerText.includes('навигац') || lowerText.includes('меню') || lowerText.includes('navbar')) {
            return `**🍔 Навигационное меню на HTML/CSS:**\n\n\`\`\`html\n<!DOCTYPE html>\n<html lang="ru">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Навигация</title>\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n        \n        .navbar {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            padding: 1rem 2rem;\n            box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n        }\n        \n        .nav-container {\n            max-width: 1200px;\n            margin: 0 auto;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n        }\n        \n        .logo {\n            color: white;\n            font-size: 1.5rem;\n            font-weight: bold;\n            text-decoration: none;\n        }\n        \n        .nav-links {\n            display: flex;\n            list-style: none;\n            gap: 2rem;\n        }\n        \n        .nav-links a {\n            color: white;\n            text-decoration: none;\n            font-weight: 500;\n            transition: opacity 0.3s;\n        }\n        \n        .nav-links a:hover {\n            opacity: 0.8;\n        }\n        \n        /* Мобильное меню */\n        .menu-toggle {\n            display: none;\n            background: none;\n            border: none;\n            color: white;\n            font-size: 1.5rem;\n            cursor: pointer;\n        }\n        \n        @media (max-width: 768px) {\n            .menu-toggle {\n                display: block;\n            }\n            \n            .nav-links {\n                display: none;\n                flex-direction: column;\n                position: absolute;\n                top: 100%;\n                left: 0;\n                right: 0;\n                background: #764ba2;\n                padding: 1rem;\n            }\n            \n            .nav-links.active {\n                display: flex;\n            }\n        }\n    </style>\n</head>\n<body>\n    <nav class="navbar">\n        <div class="nav-container">\n            <a href="#" class="logo">МойСайт</a>\n            \n            <button class="menu-toggle" id="menuToggle">\n                ☰\n            </button>\n            \n            <ul class="nav-links" id="navLinks">\n                <li><a href="#">Главная</a></li>\n                <li><a href="#">О нас</a></li>\n                <li><a href="#">Услуги</a></li>\n                <li><a href="#">Портфолио</a></li>\n                <li><a href="#">Контакты</a></li>\n            </ul>\n        </div>\n    </nav>\n\n    <script>\n        const menuToggle = document.getElementById('menuToggle');\n        const navLinks = document.getElementById('navLinks');\n        \n        menuToggle.addEventListener('click', () => {\n            navLinks.classList.toggle('active');\n        });\n    </script>\n</body>\n</html>\n\`\`\``;
        }
        
        if (lowerText.includes('форм') || lowerText.includes('form') || lowerText.includes('input')) {
            return `**📝 HTML форма с валидацией:**\n\n\`\`\`html\n<form id="contactForm">\n    <div class="form-group">\n        <label for="name">Имя:</label>\n        <input type="text" id="name" name="name" required minlength="2">\n        <div class="error" id="nameError"></div>\n    </div>\n    \n    <div class="form-group">\n        <label for="email">Email:</label>\n        <input type="email" id="email" name="email" required>\n        <div class="error" id="emailError"></div>\n    </div>\n    \n    <div class="form-group">\n        <label for="message">Сообщение:</label>\n        <textarea id="message" name="message" rows="4" required></textarea>\n        <div class="error" id="messageError"></div>\n    </div>\n    \n    <button type="submit">Отправить</button>\n</form>\n\n<style>\n.form-group {\n    margin-bottom: 1rem;\n}\n\nlabel {\n    display: block;\n    margin-bottom: 0.5rem;\n    font-weight: bold;\n}\n\ninput, textarea {\n    width: 100%;\n    padding: 0.5rem;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n}\n\n.error {\n    color: red;\n    font-size: 0.875rem;\n    margin-top: 0.25rem;\n    display: none;\n}\n\nbutton {\n    background: #667eea;\n    color: white;\n    padding: 0.75rem 2rem;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n</style>\n\n<script>\nconst form = document.getElementById('contactForm');\n\nform.addEventListener('submit', function(e) {\n    e.preventDefault();\n    \n    // Сброс ошибок\n    clearErrors();\n    \n    // Валидация\n    let isValid = true;\n    \n    // Проверка имени\n    const name = document.getElementById('name');\n    if (name.value.length < 2) {\n        showError('nameError', 'Имя должно содержать минимум 2 символа');\n        isValid = false;\n    }\n    \n    // Проверка email\n    const email = document.getElementById('email');\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (!emailRegex.test(email.value)) {\n        showError('emailError', 'Введите корректный email');\n        isValid = false;\n    }\n    \n    // Проверка сообщения\n    const message = document.getElementById('message');\n    if (message.value.trim().length === 0) {\n        showError('messageError', 'Сообщение не может быть пустым');\n        isValid = false;\n    }\n    \n    if (isValid) {\n        // Отправка формы\n        alert('Форма успешно отправлена!');\n        form.reset();\n    }\n});\n\nfunction showError(elementId, message) {\n    const element = document.getElementById(elementId);\n    element.textContent = message;\n    element.style.display = 'block';\n}\n\nfunction clearErrors() {\n    document.querySelectorAll('.error').forEach(error => {\n        error.textContent = '';\n        error.style.display = 'none';\n    });\n}\n</script>\n\`\`\``;
        }
        
        return `**🌐 Помощь по HTML:**\n\n` +
               `**🎯 Основные теги HTML5:**\n\n` +
               `**Структурные:**\n\`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<aside>\`, \`<footer>\`\n\n` +
               `**Формы:**\n\`<form>\`, \`<input>\`, \`<textarea>\`, \`<select>\`, \`<button>\`, \`<label>\`\n\n` +
               `**Мультимедиа:**\n\`<img>\`, \`<video>\`, \`<audio>\`, \`<canvas>\`, \`<svg>\`\n\n` +
               `**💡 Лучшие практики:**\n` +
               `• Всегда используйте doctype \`<!DOCTYPE html>\`\n` +
               `• Указывайте lang атрибут \`<html lang="ru">\`\n` +
               `• Используйте семантические теги\n` +
               `• Добавляйте alt текст для изображений\n` +
               `• Используйте viewport мета-тег для мобильных\n\n` +
               `**❓ Что конкретно нужно?**`;
    },
    
    getCSSResponse: function(lowerText) {
        return `**🎨 Помощь по CSS:**\n\n` +
               `**🎯 Основные концепции:**\n\n` +
               `**🔹 Flexbox для одномерных раскладок:**\n\`\`\`css\n.container {\n    display: flex;\n    justify-content: center; /* горизонталь */\n    align-items: center;     /* вертикаль */\n    flex-wrap: wrap;        /* перенос */\n    gap: 1rem;             /* отступы */\n}\n\`\`\`\n\n` +
               `**🔹 CSS Grid для двумерных раскладок:**\n\`\`\`css\n.container {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n    gap: 1rem;\n}\n\`\`\`\n\n` +
               `**🔹 Адаптивный дизайн:**\n\`\`\`css\n/* Mobile First подход */\n.element {\n    padding: 1rem;\n    font-size: 1rem;\n}\n\n@media (min-width: 768px) {\n    .element {\n        padding: 2rem;\n        font-size: 1.2rem;\n    }\n}\n\`\`\`\n\n` +
               `**🔹 Анимации:**\n\`\`\`css\n@keyframes fadeIn {\n    from { opacity: 0; transform: translateY(20px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n.element {\n    animation: fadeIn 0.5s ease forwards;\n}\n\`\`\`\n\n` +
               `**🎯 Нужна помощь с конкретным свойством или проблемой?**`;
    },
    
    getJSResponse: function(lowerText) {
        return `**⚡ Помощь по JavaScript:**\n\n` +
               `**🎯 Современный JavaScript (ES6+):**\n\n` +
               `**🔹 Стрелочные функции:**\n\`\`\`javascript\n// Обычная функция\nfunction add(a, b) {\n    return a + b;\n}\n\n// Стрелочная функция\nconst add = (a, b) => a + b;\n\`\`\`\n\n` +
               `**🔹 Деструктуризация:**\n\`\`\`javascript\nconst user = { name: 'John', age: 30 };\nconst { name, age } = user;\nconsole.log(name); // John\n\`\`\`\n\n` +
               `**🔹 Промисы и async/await:**\n\`\`\`javascript\n// Промисы\nfetch('https://api.example.com/data')\n    .then(response => response.json())\n    .then(data => console.log(data))\n    .catch(error => console.error(error));\n\n// async/await\nasync function getData() {\n    try {\n        const response = await fetch('https://api.example.com/data');\n        const data = await response.json();\n        console.log(data);\n    } catch (error) {\n        console.error(error);\n    }\n}\n\`\`\`\n\n` +
               `**🔹 Модули:**\n\`\`\`javascript\n// export в модуле\nexport const PI = 3.14;\nexport function calculateArea(radius) {\n    return PI * radius * radius;\n}\n\n// import в другом файле\nimport { PI, calculateArea } from './math.js';\n\`\`\`\n\n` +
               `**🎯 Что конкретно интересует?**`;
    },
    
    getWebsiteResponse: function(lowerText) {
        return `**🌍 Создание веб-сайта:**\n\n` +
               `**🎯 Пошаговый план:**\n\n` +
               `**1. Планирование:**\n` +
               `• Определите цель сайта\n` +
               `• Создайте структуру (карту сайта)\n` +
               `• Соберите контент\n\n` +
               `**2. Дизайн:**\n` +
               `• Создайте прототип/макет\n` +
               `• Выберите цветовую палитру\n` +
               `• Подберите шрифты\n\n` +
               `**3. Разработка:**\n` +
               `• HTML для структуры\n` +
               `• CSS для стилей\n` +
               `• JavaScript для интерактива\n\n` +
               `**4. Пример базовой структуры HTML:**\n\`\`\`html\n<!DOCTYPE html>\n<html lang="ru">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Мой Сайт</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <header>\n        <nav>\n            <!-- Навигация -->\n        </nav>\n    </header>\n    \n    <main>\n        <section id="hero">\n            <!-- Главная секция -->\n        </section>\n        \n        <section id="about">\n            <!-- О нас -->\n        </section>\n        \n        <section id="services">\n            <!-- Услуги -->\n        </section>\n        \n        <section id="contact">\n            <!-- Контакты -->\n        </section>\n    </main>\n    \n    <footer>\n        <!-- Подвал -->\n    </footer>\n    \n    <script src="script.js"></script>\n</body>\n</html>\n\`\`\`\n\n` +
               `**5. Советы:**\n` +
               `• Начните с мобильной версии (Mobile First)\n` +
               `• Оптимизируйте изображения\n` +
               `• Используйте семантические теги\n` +
               `• Добавьте мета-теги для SEO\n\n` +
               `**❓ Какой тип сайта вы хотите создать?**`;
    },
    
    getQuestionResponse: function(text) {
        const questions = {
            'как создать': 'Начните с планирования, затем создайте HTML структуру, добавьте CSS стили и JavaScript для интерактивности.',
            'что такое': 'Это зависит от контекста. Уточните, о чем именно идет речь?',
            'почему не работает': 'Возможные причины: синтаксическая ошибка, проблема с подключением файлов или неверные данные. Проверьте консоль браузера (F12).',
            'разница между': 'Для сравнения нужны конкретные технологии или подходы. Например, "разница между let и var" или "разница между Flexbox и Grid".',
            'как оптимизировать': 'Используйте минификацию файлов, сжатие изображений, ленивую загрузку и кэширование.',
            'лучшие практики': 'Следуйте стандартам кодирования, используйте семантическую разметку, оптимизируйте производительность и тестируйте на разных устройствах.'
        };
        
        for (const [keyword, answer] of Object.entries(questions)) {
            if (text.toLowerCase().includes(keyword)) {
                return `**❓ Вопрос:** ${text}\n\n**💡 Ответ:** ${answer}\n\n**🎯 Дополнительно:** В полноценном режиме с API я могу дать более детальный ответ с примерами кода.`;
            }
        }
        
        return `**❓ Вопрос:** ${text}\n\n**💡 Общий ответ:** Интересный вопрос! К сожалению, в локальном режиме мои возможности ограничены. Для детального ответа:\n\n1. **Пополните баланс** на platform.deepseek.com\n2. **Используйте Google** с конкретными ключевыми словами\n3. **Посетите Stack Overflow** для ответов сообщества\n\n**🔍 Уточните вопрос** для лучшего ответа.`;
    },
    
    getGeneralResponse: function(text) {
        const responses = [
            `**💬 Вы сказали:** "${text}"\n\n**🤖 Мой ответ:** Я понял ваш запрос. В локальном режиме я могу помочь с:\n• Базовыми вопросами программирования\n• Простыми примерами кода\n• Общими советами по разработке\n\nДля сложных запросов нужен доступ к AI API.`,
            `Запрос принят: **"${text}"**\n\nК сожалению, это выходит за рамки моих текущих возможностей в локальном режиме. Попробуйте уточнить запрос или задать вопрос о:\n\n🎯 **HTML/CSS/JavaScript**\n🎯 **Веб-разработке**\n🎯 **Программировании**\n🎯 **Работе с API**`,
            `**📝 Запрос:** ${text}\n\n**💡 Совет:** Для получения качественного ответа:\n1. Будьте конкретнее\n2. Используйте технические термины\n3. Укажите язык программирования\n4. Опишите ожидаемый результат\n\n**Пример хорошего запроса:** "Как создать слайдер изображений на чистом JavaScript?"`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
};