// Основной файл приложения
class ChatApp {
    constructor() {
        this.messagesContainer = document.getElementById('messagesContainer');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.clearButton = document.getElementById('clearButton');
        this.statusBar = document.getElementById('statusBar');
        this.apiStatus = document.getElementById('apiStatus');
        this.messageCount = document.getElementById('messageCount');
        this.responseTime = document.getElementById('responseTime');
        this.currentTime = document.getElementById('currentTime');
        this.examplesGrid = document.getElementById('examplesGrid');
        
        this.conversation = [];
        this.settings = {
            soundEnabled: true,
            autoScroll: true,
            historyLimit: 100
        };
        
        this.messageCounter = 1;
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.updateCurrentTime();
        this.loadExamples();
        this.loadHistory();
        
        // Обновляем время каждую минуту
        setInterval(() => this.updateCurrentTime(), 60000);
    }
    
    setupEventListeners() {
        // Отправка по Enter
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
                e.preventDefault();
                this.sendMessage();
            } else if (e.key === 'Enter' && e.ctrlKey) {
                // Ctrl+Enter для новой строки
                const start = this.userInput.selectionStart;
                const end = this.userInput.selectionEnd;
                this.userInput.value = this.userInput.value.substring(0, start) + '\n' + this.userInput.value.substring(end);
                this.userInput.selectionStart = this.userInput.selectionEnd = start + 1;
                e.preventDefault();
            }
        });
        
        // Автоматическое увеличение высоты textarea
        this.userInput.addEventListener('input', () => {
            this.userInput.style.height = 'auto';
            this.userInput.style.height = Math.min(this.userInput.scrollHeight, 120) + 'px';
        });
        
        // Очистка чата
        this.clearButton.addEventListener('click', () => this.clearChat());
    }
    
    updateCurrentTime() {
        const now = new Date();
        this.currentTime.textContent = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    async sendMessage() {
        const text = this.userInput.value.trim();
        if (!text) return;
        
        // Добавляем сообщение пользователя
        this.addMessage(text, 'user');
        this.userInput.value = '';
        this.userInput.style.height = 'auto';
        
        // Показываем статус "печатает"
        this.showTypingIndicator();
        
        // Замер времени ответа
        const startTime = Date.now();
        
        try {
            // Пытаемся использовать API
            const response = await apiService.sendMessage(text, this.conversation);
            
            if (response.success) {
                this.addMessage(response.message, 'bot');
                this.updateStatus('success', `Ответ получен за ${Date.now() - startTime}мс`);
            } else {
                // Используем локальные ответы
                const localResponse = localResponses.getResponse(text);
                this.addMessage(localResponse, 'bot');
                this.updateStatus('warning', 'Использую локальные ответы');
            }
            
        } catch (error) {
            console.error('Ошибка:', error);
            const localResponse = localResponses.getResponse(text);
            this.addMessage(localResponse, 'bot');
            this.updateStatus('error', 'Ошибка сети');
        } finally {
            this.hideTypingIndicator();
            this.updateResponseTime(Date.now() - startTime);
        }
    }
    
    addMessage(text, sender) {
        const messageId = 'msg-' + Date.now();
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.id = messageId;
        
        const time = new Date().toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const avatarIcon = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
        const senderName = sender === 'user' ? 'Вы' : 'Ассистент';
        
        messageDiv.innerHTML = `
            <div class="avatar">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="content">
                <div class="header">
                    <span class="sender">${senderName}</span>
                    <span class="time">${time}</span>
                </div>
                <div class="text">${this.formatMessage(text)}</div>
            </div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        
        // Сохраняем в историю
        this.conversation.push({
            role: sender === 'user' ? 'user' : 'assistant',
            content: text,
            timestamp: Date.now()
        });
        
        // Обновляем счетчик
        this.messageCounter++;
        this.messageCount.textContent = `Сообщений: ${this.messageCounter}`;
        
        // Автопрокрутка
        if (this.settings.autoScroll) {
            messageDiv.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Сохраняем историю
        this.saveHistory();
        
        // Звук нового сообщения
        if (this.settings.soundEnabled && sender === 'bot') {
            this.playSound();
        }
    }
    
    formatMessage(text) {
        // Форматирование Markdown-подобного синтаксиса
        return text
            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/\n/g, '<br>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
    }
    
    showTypingIndicator() {
        this.sendButton.disabled = true;
        this.sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Отправка...</span>';
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="content">
                <div class="header">
                    <span class="sender">Ассистент</span>
                </div>
                <div class="text typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        
        this.messagesContainer.appendChild(typingDiv);
        if (this.settings.autoScroll) {
            typingDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    hideTypingIndicator() {
        this.sendButton.disabled = false;
        this.sendButton.innerHTML = '<i class="fas fa-paper-plane"></i><span>Отправить</span>';
        
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    updateStatus(type, message) {
        const statusContent = this.statusBar.querySelector('.status-content');
        const icon = statusContent.querySelector('i');
        
        switch(type) {
            case 'success':
                icon.style.color = '#4caf50';
                break;
            case 'warning':
                icon.style.color = '#ff9800';
                break;
            case 'error':
                icon.style.color = '#f44336';
                break;
            default:
                icon.style.color = '#4caf50';
        }
        
        statusContent.querySelector('span').textContent = message;
    }
    
    updateResponseTime(time) {
        this.responseTime.textContent = `Время ответа: ${time}мс`;
    }
    
    loadExamples() {
        const examples = [
            "Напиши HTML код для навигационного меню",
            "Как создать адаптивную сетку на CSS Grid?",
            "Пример JavaScript для валидации формы",
            "Объясни, как работает async/await",
            "Создай простой REST API на Node.js",
            "Как оптимизировать загрузку сайта?",
            "Пример кода для модального окна",
            "Разница между let, const и var",
            "Как работать с LocalStorage?",
            "Создай простой чат на WebSocket"
        ];
        
        this.examplesGrid.innerHTML = examples.map(example => 
            `<button class="example-btn" onclick="chatApp.useExample('${example}')">${example}</button>`
        ).join('');
    }
    
    useExample(example) {
        this.userInput.value = example;
        this.userInput.focus();
    }
    
    clearChat() {
        if (confirm('Очистить всю историю чата?')) {
            this.messagesContainer.innerHTML = `
                <div class="message bot">
                    <div class="avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="content">
                        <div class="header">
                            <span class="sender">Ассистент</span>
                            <span class="time">${new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}</span>
                        </div>
                        <div class="text">
                            Чат очищен. Чем могу помочь?
                        </div>
                    </div>
                </div>
            `;
            
            this.conversation = [];
            this.messageCounter = 1;
            this.messageCount.textContent = 'Сообщений: 1';
            this.responseTime.textContent = 'Время ответа: —';
            localStorage.removeItem('chatHistory');
        }
    }
    
    saveHistory() {
        if (this.settings.historyLimit > 0) {
            const history = this.conversation.slice(-this.settings.historyLimit);
            localStorage.setItem('chatHistory', JSON.stringify(history));
        }
    }
    
    loadHistory() {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            try {
                const history = JSON.parse(saved);
                // Пропускаем первое системное сообщение
                history.forEach(msg => {
                    if (msg.role === 'user') {
                        this.addMessage(msg.content, 'user');
                    } else if (msg.role === 'assistant') {
                        this.addMessage(msg.content, 'bot');
                    }
                });
            } catch (e) {
                console.error('Ошибка загрузки истории:', e);
            }
        }
    }
    
    loadSettings() {
        const saved = localStorage.getItem('chatSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
        
        // Применяем настройки
        document.getElementById('soundToggle').checked = this.settings.soundEnabled;
        document.getElementById('autoScrollToggle').checked = this.settings.autoScroll;
        document.getElementById('historyLimit').value = this.settings.historyLimit;
    }
    
    saveSettings() {
        this.settings.soundEnabled = document.getElementById('soundToggle').checked;
        this.settings.autoScroll = document.getElementById('autoScrollToggle').checked;
        this.settings.historyLimit = parseInt(document.getElementById('historyLimit').value);
        
        localStorage.setItem('chatSettings', JSON.stringify(this.settings));
        closeModal();
        alert('Настройки сохранены!');
    }
    
    playSound() {
        const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
        audio.volume = 0.3;
        audio.play().catch(() => {});
    }
}

// Глобальные функции для HTML событий
let chatApp;

window.onload = function() {
    chatApp = new ChatApp();
    checkAPIStatus();
};

function sendMessage() {
    chatApp.sendMessage();
}

function clearChat() {
    chatApp.clearChat();
}

function checkAPIStatus() {
    apiService.checkStatus().then(status => {
        const apiStatusElement = document.getElementById('apiStatus');
        if (status === 'online') {
            apiStatusElement.innerHTML = 'API: <span class="online">Активен</span>';
        } else if (status === 'no_balance') {
            apiStatusElement.innerHTML = 'API: <span class="offline">Нет баланса</span>';
        } else {
            apiStatusElement.innerHTML = 'API: <span class="offline">Не доступен</span>';
        }
    });
}

function showModal() {
    document.getElementById('settingsModal').classList.add('active');
}

function closeModal() {
    document.getElementById('settingsModal').classList.remove('active');
}

function saveSettings() {
    chatApp.saveSettings();
}