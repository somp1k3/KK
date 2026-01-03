// Утилиты для работы с чатом
const utils = {
    // Форматирование даты и времени
    formatDateTime: function(date = new Date()) {
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    },
    
    // Форматирование времени
    formatTime: function(date = new Date()) {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // Подсветка синтаксиса (базовая реализация)
    highlightSyntax: function(code, language = 'javascript') {
        const keywords = {
            javascript: [
                'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while',
                'return', 'class', 'extends', 'import', 'export', 'async', 'await',
                'try', 'catch', 'finally', 'throw', 'new', 'this', 'typeof',
                'instanceof', 'true', 'false', 'null', 'undefined'
            ],
            html: [
                'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
                'form', 'input', 'button', 'textarea', 'select', 'option'
            ],
            css: [
                'color', 'background', 'font', 'margin', 'padding', 'border',
                'display', 'position', 'width', 'height', 'flex', 'grid',
                'animation', 'transition', 'transform', '@media', '@keyframes'
            ]
        };
        
        let highlighted = code;
        
        if (keywords[language]) {
            keywords[language].forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
            });
        }
        
        // Подсветка строк
        highlighted = highlighted.replace(/'([^']*)'/g, `<span class="string">'$1'</span>`);
        highlighted = highlighted.replace(/"([^"]*)"/g, `<span class="string">"$1"</span>`);
        
        // Подсветка чисел
        highlighted = highlighted.replace(/\b(\d+)\b/g, `<span class="number">$1</span>`);
        
        // Подсветка комментариев
        if (language === 'javascript') {
            highlighted = highlighted.replace(/\/\/.*$/gm, `<span class="comment">$&</span>`);
            highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, `<span class="comment">$&</span>`);
        }
        
        return highlighted;
    },
    
    // Генератор уникального ID
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Проверка мобильного устройства
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // Сохранение в localStorage с обработкой ошибок
    saveToStorage: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
            return false;
        }
    },
    
    // Загрузка из localStorage с обработкой ошибок
    loadFromStorage: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Ошибка загрузки из localStorage:', error);
            return null;
        }
    },
    
    // Копирование текста в буфер обмена
    copyToClipboard: function(text) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text)
                    .then(resolve)
                    .catch(reject);
            } else {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    resolve();
                } catch (error) {
                    reject(error);
                } finally {
                    textArea.remove();
                }
            }
        });
    },
    
    // Экранирование HTML
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Дебаунс функция
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Троттлинг функция
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Проверка онлайн статуса
    checkOnlineStatus: function() {
        return navigator.onLine;
    },
    
    // Отслеживание изменений онлайн статуса
    setupOnlineStatusListener: function(callback) {
        window.addEventListener('online', () => callback(true));
        window.addEventListener('offline', () => callback(false));
    },
    
    // Форматирование размера файла
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// Добавляем CSS для подсветки синтаксиса
const style = document.createElement('style');
style.textContent = `
    .keyword { color: #0077aa; font-weight: bold; }
    .string { color: #d14; }
    .number { color: #099; }
    .comment { color: #999; font-style: italic; }
`;
document.head.appendChild(style);