const apiService = {
    API_KEY: 'sk-30fe27d332404bff9706f08fb337b8eb',
    API_URL: 'https://api.deepseek.com/v1/chat/completions',
    
    async sendMessage(text, conversationHistory = []) {
        try {
            // Формируем историю сообщений
            const messages = [
                {
                    role: 'system',
                    content: 'Ты полезный ассистент по программированию. Отвечай на русском языке. Давай подробные объяснения с примерами кода.'
                },
                ...conversationHistory.slice(-6).map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                { role: 'user', content: text }
            ];
            
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.API_KEY}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: messages,
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });
            
            if (response.status === 402) {
                throw new Error('insufficient_balance');
            }
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                success: true,
                message: data.choices[0].message.content,
                tokens: data.usage?.total_tokens || 0
            };
            
        } catch (error) {
            console.error('API Error:', error);
            
            if (error.message === 'insufficient_balance') {
                return {
                    success: false,
                    error: 'Недостаточно средств на счете API',
                    code: 'INSUFFICIENT_BALANCE'
                };
            }
            
            return {
                success: false,
                error: error.message,
                code: 'API_ERROR'
            };
        }
    },
    
    async checkStatus() {
        try {
            const response = await fetch('https://api.deepseek.com/v1/models', {
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`
                }
            });
            
            if (response.status === 402) {
                return 'no_balance';
            }
            
            if (response.ok) {
                return 'online';
            }
            
            return 'offline';
            
        } catch (error) {
            return 'offline';
        }
    },
    
    async getBalance() {
        try {
            // Note: DeepSeek API не предоставляет прямого метода проверки баланса
            // Используем тестовый запрос
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.API_KEY}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{ role: 'user', content: 'Hello' }],
                    max_tokens: 1
                })
            });
            
            if (response.status === 402) {
                return { balance: 0, status: 'insufficient' };
            }
            
            return { status: 'active' };
            
        } catch (error) {
            return { status: 'error', error: error.message };
        }
    }
};