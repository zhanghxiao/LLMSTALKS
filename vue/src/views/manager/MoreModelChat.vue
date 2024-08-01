<template>
    <div class="container">
        <div class="main">
            <div class="chat-windows" :class="['layout-' + layout, { 'mobile': isMobile }]" ref="chatWindows">
                <div v-for="(chatWindow, index) in chatWindows" :key="index"
                     :class="['chat-window', { 'empty-window': showEmptyWindow && index === chatWindows.length - 1 }]">
                    <div class="chat-header">
                        <select v-model="chatWindow.selectedModel">
                            <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
                        </select>
                        <div class="search-toggle">
                            <span>搜索功能</span>
                            <label class="switch">
                                <input type="checkbox" v-model="chatWindow.isSearchEnabled" @change="toggleSearch(index)">
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div class="chat-body">
                        <div v-for="message in chatWindow.messages" :key="message.id" :class="['message', message.role]">
                            <div class="content">
                                <MarkdownRenderer :content="message.content" />
                            </div>
                            <details v-if="message.searchResults" class="search-results">
                                <summary>点击查看搜索结果</summary>
                                <div v-for="result in message.searchResults" :key="result.href" class="search-result-item">
                                    <h3><a :href="result.href" target="_blank">{{ result.title }}</a></h3>
                                    <p>{{ result.body }}</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
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

<script>
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

export default {
    name: 'MultiModelChat',
    components: {
        MarkdownRenderer
    },
    data() {
        return {
            userInput: '',
            chatWindows: [
                { messages: [], selectedModel: 'gpt-4o-mini', currentSession: [], isSearchEnabled: false },
                { messages: [], selectedModel: 'gpt-4o-mini', currentSession: [], isSearchEnabled: false }
            ],
            models: this.getModelsFromEnv(),
            layout: 2,
            isMobile: false,
            showEmptyWindow: false,
            SEARCH_API_URL: 'https://mistpe-search.hf.space/search'
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
            const targetLength = this.isMobile ? layout + 1 : layout;
            
            if (currentLength < targetLength) {
                for (let i = currentLength; i < targetLength; i++) {
                    this.chatWindows.push({ messages: [], selectedModel: this.models[0], currentSession: [], isSearchEnabled: false });
                }
            } else if (currentLength > targetLength) {
                this.chatWindows.splice(targetLength);
            }
            
            this.showEmptyWindow = this.isMobile;
        },
        toggleSearch(index) {
            const chatWindow = this.chatWindows[index];
            const toggleMessage = chatWindow.isSearchEnabled
                ? "搜索功能已开启，我现在可以上网查资料啦！😎"
                : "搜索功能已关闭，接下来就看我自由发挥了";
            this.addMessage(chatWindow, 'system', toggleMessage);
        },
        addMessage(chatWindow, role, content, searchResults = null) {
            const message = { id: Date.now(), role, content };
            if (searchResults) {
                message.searchResults = searchResults;
            }
            chatWindow.messages.push(message);
            if (role !== 'system') {
                chatWindow.currentSession.push({ role, content });
            }
            this.$nextTick(() => {
                this.adjustChatWindowHeight();
            });
        },
        async sendMessage() {
            if (!this.userInput.trim()) return;

            const userMessageContent = this.userInput;
            this.userInput = '';

            const sendRequestToWindow = async (chatWindow) => {
                this.addMessage(chatWindow, 'user', userMessageContent);

                try {
                    let aiResponse;
                    let searchResults = null;
                    if (chatWindow.isSearchEnabled) {
                        searchResults = await this.performSearch(userMessageContent);
                    }

                    if (chatWindow.isSearchEnabled && searchResults && searchResults.search_results && searchResults.search_results.length > 0) {
                        const summaryPrompt = `基于以下搜索结果回答用户的问题：
搜索结果：${JSON.stringify(searchResults.search_results)}
用户问题：${userMessageContent}`;
                        aiResponse = await this.getAIResponse(chatWindow, summaryPrompt);
                        this.addMessage(chatWindow, 'assistant', aiResponse, searchResults.search_results);
                    } else {
                        if (chatWindow.isSearchEnabled) {
                            aiResponse = "抱歉，我没有找到相关的搜索结果。让我试试直接回答你的问题。";
                            this.addMessage(chatWindow, 'assistant', aiResponse);
                        }
                        aiResponse = await this.getAIResponse(chatWindow, userMessageContent);
                        this.addMessage(chatWindow, 'assistant', aiResponse);
                    }

                    // 保持最多6组上下文
                    if (chatWindow.currentSession.length > 12) {
                        chatWindow.currentSession = chatWindow.currentSession.slice(-12);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    this.addMessage(chatWindow, 'assistant', '对不起，我无法处理您的请求。');
                }
            };

            await Promise.all(this.chatWindows.map(sendRequestToWindow));

            this.$nextTick(() => {
                this.adjustChatWindowHeight();
            });
        },
        async performSearch(query) {
            const response = await fetch(this.SEARCH_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: query,
                    api_key: process.env.VUE_APP_API_KEY
                })
            });
            return await response.json();
        },
        async getAIResponse(chatWindow, prompt) {
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
                            { role: 'system', content: `你是一个友善的助手` },
                            ...chatWindow.currentSession,
                            { role: 'user', content: prompt }
                        ],
                        model: chatWindow.selectedModel,
                        temperature: 0.5,
                        presence_penalty: 2
                    })
                }
            );

            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return data.choices[0].message.content;
            } else {
                throw new Error('Unexpected response format');
            }
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
    margin-bottom: 10px;
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

.chat-windows.mobile.layout-2 {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
}

.chat-windows.mobile.layout-3 {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
}
.chat-windows.mobile.layout-4 {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
}

.chat-window {
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.empty-window {
    visibility: hidden;
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
    margin-top: 10px;
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
    padding: 1px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 13px;
    word-wrap: break-word;
    white-space: normal;
    max-width: 100%;
    line-height: 1.1;
}

.user .content {
    background-color: #e0f7fa;
    color:#505050;
    border-bottom-right-radius: 4px;
}

.assistant .content {
    background-color: #e0f7fa;
    color: #505050;
    border-bottom-left-radius: 4px;
}

.search-toggle {
    display: flex;
    align-items: center;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-left: 10px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
    transform: translateX(26px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.search-results {
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
}

.search-result-item {
    margin-bottom: 10px;
}

.search-result-item h3 {
    margin: 0;
    font-size: 16px;
}

.search-result-item p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #666;
}

@media (max-width: 768px) {
    .container {
        height: 100vh;
    }

    .main {
        height: 100%;
    }

    .chat-windows {
        height: calc(100% - 160px);
        margin-bottom: 10px;
    }

    .input-area {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        margin-top: 10px;
        z-index: 1000;
    }
}
</style>
