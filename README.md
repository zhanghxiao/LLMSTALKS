# LLMSTALKS多模型群聊助手

> 本项目完全开源
> 如果觉得不错麻烦帮忙点一次`Star⭐️`

## 项目简介
本项目是一个参考了Chathub插件的UI逻辑以及MarkMap-OpenAi-ChatGpt的vue调用API逻辑，调用大模型api。结合了Vue和LLMAS的多模型并行回答助手。用户可以同时调用相同或者不同的大模型并行进行回答

## 效果演示
![image](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/46d2c46e-aa04-43ad-9ccc-8e584cc54bab)


## 技术栈
- **前端框架**：Vue
- **UI组件库**：Element Ui
- **AI模型**：OpenAI API格式的模型均兼容

## 项目结构
```
├── public
│ └── index.html
├── src
│ ├── assets
│ ├── views
│ │ └── MoreModelChat.vue
│ │ └── SingleModelChat
│ │ └── About.vue
│ ├── App.vue
│ └── main.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── vue.config.js
```
## 项目部署教程
1. **克隆项目**：
    ```bash
    git clone https://github.com/zhanghxiao/LLMSTALKS.git
    cd mindmap-generator
    ```

2. **安装依赖**：
    ```bash
    npm install
    ```

3. **配置环境变量**：
    在项目根目录创建一个`.env`文件，并添加以下内容：
    ```
    VUE_APP_API_BASE_URL=https://api.openai.com
    VUE_APP_API_KEY=your_openai_api_key
    VUE_APP_MODELS=gpt-3.5-turbo-0125,讯飞星火v3.5,讯飞星火v3.1,讯飞星火v2.1,谷歌Gemini-pro,通义千问-plus,智谱glm-4,腾讯混元,百度ERNIE-Speed-8K,gpt-4-copilot

    ```

4. **运行项目**：
    ```bash
    npm run serve
    ```

5. **构建项目**：
    ```bash
    npm run build
    ```

6. **部署项目**：
    将`dist`文件夹中的内容上传到你的服务器或静态文件托管服务（如Vercel、Netlify等）。

## 鸣谢
[chathub]([https://github.com/PastKing/MarkMap-OpenAi-ChatGpt](https://github.com/chathub-dev/chathub))
[mindmap-generator](https://github.com/PastKing/MarkMap-OpenAi-ChatGpt)
