<template>
    <div class="container">
        <div class="main">
            <div class="chat-window" ref="chatWindow">
                <div class="chat-header">
                    <select v-model="selectedModel">
                        <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
                    </select>
                    <div class="search-toggle">
                        <span>搜索功能</span>
                        <label class="switch">
                            <input type="checkbox" v-model="isSearchEnabled" @change="toggleSearch">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
                <div class="chat-body">
                    <div v-for="message in messages" :key="message.id" :class="['message', message.role]">
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
            <div class="input-container">
                <input type="text" v-model="userInput" placeholder="输入消息..." @keypress.enter="sendMessage">
                <button class="input-button" @click="sendMessage">发送</button>
            </div>
        </div>
    </div>
</template>

<script>
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

export default {
    name: 'SingleModelChat',
    components: {
        MarkdownRenderer
    },
    data() {
        return {
            userInput: '',
            messages: [],
            models: this.getModelsFromEnv(),
            selectedModel: 'gpt-4o-mini',
            isSearchEnabled: false,
            currentSession: []
        };
    },
    methods: {
        getModelsFromEnv() {
            const modelsEnv = process.env.VUE_APP_MODELS || '';
            return modelsEnv.split(',').map(model => model.trim());
        },
        adjustChatWindowHeight() {
            const chatWindow = this.$refs.chatWindow;
            if (chatWindow) {
                const inputContainerHeight = this.$el.querySelector('.input-container').offsetHeight;
                const chatWindowOffsetTop = chatWindow.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                chatWindow.style.height = `${windowHeight - chatWindowOffsetTop - inputContainerHeight}px`;
            }
        },
        toggleSearch() {
            const toggleMessage = this.isSearchEnabled
                ? "搜索功能已开启，我现在可以上网查资料啦！😎"
                : "搜索功能已关闭，接下来就看我自由发挥了";
            this.addMessage('assistant', toggleMessage);
        },
        addMessage(role, content, searchResults = null) {
            const message = { id: Date.now(), role, content };
            if (searchResults) {
                message.searchResults = searchResults;
            }
            this.messages.push(message);
            if (role !== 'system') {
                this.currentSession.push({ role, content });
            }
            this.$nextTick(() => {
                const chatBody = this.$el.querySelector('.chat-body');
                chatBody.scrollTop = chatBody.scrollHeight;
            });
        },
        async sendMessage() {
            if (!this.userInput.trim()) return;

            this.addMessage('user', this.userInput);
            const userMessageContent = this.userInput;
            this.userInput = '';

            try {
                let aiResponse;
                if (this.isSearchEnabled) {
                    const searchResponse = await this.performSearch(userMessageContent);
                    if (searchResponse.search_results && searchResponse.search_results.length > 0) {
                        const summaryPrompt = `基于以下搜索结果回答用户的问题：
搜索结果：${JSON.stringify(searchResponse.search_results)}
用户问题：${userMessageContent}`;
                        aiResponse = await this.getAIResponse(summaryPrompt);
                        this.addMessage('assistant', aiResponse, searchResponse.search_results);
                    } else {
                        aiResponse = "抱歉，我没有找到相关的搜索结果。让我试试直接回答你的问题。";
                        this.addMessage('assistant', aiResponse);
                    }
                } else {
                    aiResponse = await this.getAIResponse(userMessageContent);
                    this.addMessage('assistant', aiResponse);
                }

                // 保持最多6组上下文
                if (this.currentSession.length > 12) {
                    this.currentSession = this.currentSession.slice(-12);
                }
            } catch (error) {
                console.error('Error:', error);
                this.addMessage('assistant', '对不起，我无法处理您的请求。');
            }
        },
        async performSearch(query) {
            const response = await fetch('https://mistpe-search.hf.space/search', {
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
        async getAIResponse(prompt) {
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
                            ...this.currentSession,
                            { role: 'user', content: prompt }
                        ],
                        stream: true,
                        model: this.selectedModel,
                        temperature: 0.5,
                        presence_penalty: 2
                    })
                }
            );

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let result = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n').filter(line => line.trim());
                for (const line of lines) {
                    if (line === 'data: [DONE]') return result;
                    if (line.startsWith('data: ')) {
                        const data = JSON.parse(line.slice(6));
                        if (data.choices[0].delta && data.choices[0].delta.content) {
                            result += data.choices[0].delta.content;
                        }
                    }
                }
            }

            return result;
        }
    },
    mounted() {
        this.adjustChatWindowHeight();
        window.addEventListener('resize', this.adjustChatWindowHeight);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.adjustChatWindowHeight);
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.main {
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    height: 80vh;
}

.chat-window {
    flex-grow: 1;
    width: 100%;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
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

.input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-top: 10px;
}

.input-container input {
    flex-grow: 1;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-left: 10px;
}

.input-button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #87cefa;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.message {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    max-width: 100%;
}

.user {
    align-items: flex-end;
}

.assistant {
    align-items: flex-start;
}

.content {
    padding: 10px;
    border-radius: 13px;
    word-wrap: break-word;
    white-space: normal;
    max-width: 80%;
    line-height: 1.4;
}

.user .content {
    background-color: #e0f7fa;
    color: #505050;
    border-bottom-right-radius: 4px;
}

.assistant .content {
    background-color: #f0f0f0;
    color: #505050;
    border-bottom-left-radius: 4px;
}

.search-toggle {
    display: flex;
    align-items: center;
    margin-left: 10px;
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
    border-radius: 34px;
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
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:checked + .slider:before {
    transform: translateX(26px);
}

.search-results {
    margin-top: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 10px;
}

.search-results summary {
    cursor: pointer;
    color: #2196F3;
}

.search-result-item {
    margin-top: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.search-result-item:last-child {
    border-bottom: none;
}

.search-result-item h3 {
    margin: 0;
    font-size: 1em;
}

.search-result-item a {
    color: #1a0dab;
    text-decoration: none;
}

.search-result-item p {
    margin: 5px 0 0;
    font-size: 0.9em;
    color: #545454;
}
</style>
