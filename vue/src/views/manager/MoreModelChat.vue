<template>
    <div class="container">
        <div class="main">
            <div class="chat-windows" :class="['layout-' + layout, { 'mobile': isMobile }]" ref="chatWindows">
                <div class="chat-window" v-for="(chatWindow, index) in chatWindows" :key="index">
                    <div class="chat-header">
                        <select v-model="chatWindow.selectedModel">
                            <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
                        </select>
                    </div>
                    <div class="chat-body">
                        <div v-for="message in chatWindow.messages" :key="message.id" :class="['message', message.role]">
                            <div class="content">{{ message.content }}</div>
                        </div>
                    </div>
                </div>
                <div v-if="isMobile && (layout === 3 || layout === 4)" class="chat-window empty-window"></div>
            </div>
            <div class="input-area">
                <div class="mobile-layout-buttons" v-if="isMobile">
                    <button data-layout="2" :class="{ active: layout === 2 }" @click="setLayout(2)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="14" height="12" rx="2" stroke="#BDBDBD" stroke-width="1.5"/>
                            <line x1="10" y1="4" x2="10" y2="16" stroke="#BDBDBD" stroke-width="1.5"/>
                        </svg>
                    </button>
                    <button data-layout="3" :class="{ active: layout === 3 }" @click="setLayout(3)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="14" height="12" rx="2" stroke="#BDBDBD" stroke-width="1.5"/>
                            <line x1="7.5" y1="4" x2="7.5" y2="16" stroke="#BDBDBD" stroke-width="1.5"/>
                            <line x1="12.5" y1="4" x2="12.5" y2="16" stroke="#BDBDBD" stroke-width="1.5"/>
                        </svg>
                    </button>
                    <button data-layout="4" :class="{ active: layout === 4 }" @click="setLayout(4)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="14" height="12" rx="2" stroke="#BDBDBD" stroke-width="1.5"/>
                            <line x1="10" y1="4" x2="10" y2="16" stroke="#BDBDBD" stroke-width="1.5"/>
                            <line x1="3" y1="10" x2="17" y2="10" stroke="#BDBDBD" stroke-width="1.5"/>
                        </svg>
                    </button>
                </div>
                <div class="input-container">
                    <div class="layout-buttons" v-if="!isMobile">
                        <button data-layout="2" :class="{ active: layout === 2 }" @click="setLayout(2)">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="14" height="12" rx="2" stroke="#BDBDBD" stroke-width="1.5"/>
                                <line x1="10" y1="4" x2="10" y2="16" stroke="#BDBDBD" stroke-width="1.5"/>
                            </svg>
                        </button>
                        <button data-layout="3" :class="{ active: layout === 3 }" @click="setLayout(3)">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="14" height="12" rx="2" stroke="#BDBDBD" stroke-width="1.5"/>
                                <line x1="7.5" y1="4" x2="7.5" y2="16" stroke="#BDBDBD" stroke-width="1.5"/>
                                <line x1="12.5" y1="4" x2="12.5" y2="16" stroke="#BDBDBD" stroke-width="1.5"/>
                            </svg>
                        </button>
                        <button data-layout="4" :class="{ active: layout === 4 }" @click="setLayout(4)">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="14" height="12" rx="2" stroke="#BDBDBD" stroke-width="1.5"/>
                                <line x1="10" y1="4" x2="10" y2="16" stroke="#BDBDBD" stroke-width="1.5"/>
                                <line x1="3" y1="10" x2="17" y2="10" stroke="#BDBDBD" stroke-width="1.5"/>
                            </svg>
                        </button>
                    </div>
                    <input type="text" v-model="userInput" placeholder="输入消息..." @keypress.enter="sendMessage">
                    <button class="input-button" @click="sendMessage">发送</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    overflow: hidden;
}

.main {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.chat-windows {
    display: grid;
    gap: 10px;
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 10px; /* 调整间距 */
}

.chat-windows.mobile {
    grid-template-columns: 1fr;
}

.layout-2 {
    grid-template-columns: 1fr 1fr;
}

.layout-3 {
    grid-template-columns: 1fr 1fr 1fr;
}

.layout-4 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

.chat-windows.mobile.layout-2,
.chat-windows.mobile.layout-3,
.chat-windows.mobile.layout-4 {
    grid-template-columns: 1fr;
}

.chat-windows.mobile.layout-4 {
    grid-template-rows: repeat(4, 1fr);
}

.chat-window {
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.chat-window.empty-window {
    background-color: transparent;
    border: none;
    box-shadow: none;
}

.chat-header {
    background-color: rgba(255, 255, 255, 0.5);
    color: #555;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.chat-header select {
    background-color: rgba(255, 255, 255, 0.5);
    color: #555;
    border: none;
    padding: 5px 10px;
    border-radius: 10px;
}

.chat-body {
    flex-grow: 1;
    padding: 10px;
    overflow-y: auto;
    color: #333;
}

.input-area {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-top: 10px; /* 可选，调整间距 */
}

.layout-buttons {
    display: flex;
    margin-right: 10px;
}

.mobile-layout-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.layout-buttons button,
.mobile-layout-buttons button {
    background-color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
    margin-right: 5px;
    opacity: 0.5;
    transition: opacity 0.3s;
}

.layout-buttons button:last-child,
.mobile-layout-buttons button:last-child {
    margin-right: 0;
}

.layout-buttons button.active,
.mobile-layout-buttons button.active {
    opacity: 1;
}

.layout-buttons button svg,
.mobile-layout-buttons button svg {
    width: 32px;
    height: 32px;
}

.input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.input-container input {
    flex-grow: 1;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-right: 10px;
}

.input-button {
    padding: 5px 10px;
    background-color: #87cefa;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.message {
    display: flex;
    margin: 5px 0;
    max-width: 100%;
}

.user {
    justify-content: flex-end;
}

.assistant {
    justify-content: flex-start;
}

.content {
    padding: 10px;
    border-radius: 18px;
    word-wrap: break-word;
    white-space: pre-wrap;
    max-width: 100%;
}

.user .content {
    background-color: #e0f7fa;
    color: #000;
    border-bottom-right-radius: 4px;
}

.assistant .content {
    background-color: #e0f7fa;
    color: #000;
    border-bottom-left-radius: 4px;
}

@media (max-width: 768px) {
    .container {
        height: 100vh;
    }

    .main {
        height: 100%;
    }

    .chat-windows {
        height: calc(100% - 120px); /* 调整这个值以适应移动布局按钮和输入框的高度 */
        margin-bottom: 10px; /* 调整间距 */
    }

    .input-area {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        margin-top: 10px; /* 可选，调整间距 */
    }
}
</style>

<script>
export default {
    name: 'MultiModelChat',
    data() {
        return {
            userInput: '',
            chatWindows: [
                { messages: [], selectedModel: 'gpt-3.5-turbo-0125' },
                { messages: [], selectedModel: 'gpt-3.5-turbo-0125' }
            ],
            models: this.getModelsFromEnv(),
            layout: 2,
            isMobile: false
        };
    },
    methods: {
        getModelsFromEnv() {
            const modelsEnv = process.env.VUE_APP_MODELS || '';
            return modelsEnv.split(',').map(model => model.trim());
        },
        setLayout(layout) {
            this.layout = layout;
            this.adjustChatWindows(layout);
            this.$nextTick(() => {
                this.adjustChatWindowHeight();
            });
        },
        adjustChatWindows(layout) {
            const currentLength = this.chatWindows.length;
            if (currentLength < layout) {
                for (let i = currentLength; i < layout; i++) {
                    this.chatWindows.push({ messages: [], selectedModel: this.models[0] });
                }
            } else if (currentLength > layout) {
                this.chatWindows.splice(layout);
            }
        },
        async sendMessage() {
            if (!this.userInput.trim()) return;

            const userMessageContent = this.userInput;
            this.userInput = '';

            const sendRequestToWindow = async (chatWindow, index) => {
                const userMessage = { id: Date.now() + index, role: 'user', content: userMessageContent };
                chatWindow.messages.push(userMessage);

                const assistantMessage = { id: Date.now() + index + 1000, role: 'assistant', content: '' };
                chatWindow.messages.push(assistantMessage);

                try {
                    const response = await fetch(
                        `${process.env.VUE_APP_API_BASE_URL}/v1/chat/completions`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${process.env.VUE_APP_API_KEY}`
                            },
                            body: JSON.stringify({
                                messages: [
                                    { role: 'system', content: '你是一个友善的助手' },
                                    { role: 'user', content: userMessageContent }
                                ],
                                stream: true,
                                model: chatWindow.selectedModel,
                                temperature: 0.5,
                                presence_penalty: 2
                            })
                        }
                    );

                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8');

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk.split('\n').filter(line => line.trim());
                        for (const line of lines) {
                            if (line === 'data: [DONE]') return;
                            if (line.startsWith('data: ')) {
                                const data = JSON.parse(line.slice(6));
                                if (data.choices && data.choices.length > 0) {
                                    const delta = data.choices[0].delta;
                                    if (delta && delta.content) {
                                        assistantMessage.content += delta.content;
                                    }
                                }
                            }
                        }
                    }
                } catch (error) {
                    assistantMessage.content = `请求失败: ${error.message}`;
                }
            };

            await Promise.all(this.chatWindows.map(sendRequestToWindow));

            this.$nextTick(() => {
                this.adjustChatWindowHeight();
            });
        },
        handleResize() {
            this.isMobile = window.innerWidth <= 768;
            this.$nextTick(() => {
                this.adjustChatWindowHeight();
            });
        },
        adjustChatWindowHeight() {
            const chatBodies = this.$refs.chatWindows.querySelectorAll('.chat-body');
            chatBodies.forEach(chatBody => {
                chatBody.scrollTop = chatBody.scrollHeight;
            });
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>
