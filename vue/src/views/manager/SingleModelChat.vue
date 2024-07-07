<template>
    <div class="container">
        <div class="main">
            <div class="chat-window" ref="chatWindow">
                <div class="chat-header">
                    <select v-model="selectedModel">
                        <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
                    </select>
                </div>
                <div class="chat-body">
                    <div v-for="message in messages" :key="message.id" :class="['message', message.role]">
                        <div class="content">
                            <MarkdownRenderer :content="message.content" />
                        </div>
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
            selectedModel: 'gpt-3.5-turbo-0125' // 默认选择的模型
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
        async sendMessage() {
            if (!this.userInput.trim()) return;

            const userMessage = { id: Date.now(), role: 'user', content: this.userInput };
            this.messages.push(userMessage);
            const userMessageContent = this.userInput;
            this.userInput = '';

            const assistantMessage = { id: Date.now(), role: 'assistant', content: '' };
            this.messages.push(assistantMessage);

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
                                { role: 'system', content: `你是一个友善的助手` },
                                { role: 'user', content: userMessageContent }
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
                        if (line === 'data: [DONE]') return;
                        if (line.startsWith('data: ')) {
                            const data = JSON.parse(line.slice(6));
                            if (data.choices[0].delta && data.choices[0].delta.content) {
                                result += data.choices[0].delta.content;
                                assistantMessage.content = result;
                                this.$forceUpdate();
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                assistantMessage.content = '对不起，我无法处理您的请求。';
            }
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
    color: #505050;
    border-bottom-right-radius: 4px;
}

.assistant .content {
    background-color: #e0f7fa;
    color: #505050;
    border-bottom-left-radius: 4px;
}
</style>
