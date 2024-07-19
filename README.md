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
    cd vue
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
    VUE_APP_MODELS=gpt-4o-mini,讯飞星火v3.5,讯飞星火v3.1,讯飞星火v2.1,谷歌Gemini-pro,通义千问-plus,智谱glm-4,腾讯混元,百度ERNIE-Speed-8K,gpt-4-copilot

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

## 鸣谢参考项目
[chathub]([https://github.com/PastKing/MarkMap-OpenAi-ChatGpt]：(https://github.com/chathub-dev/chathub))：提供UI参考
[mindmap-generator](https://github.com/PastKing/MarkMap-OpenAi-ChatGpt)：提供UI和技术栈参考
[songquanpeng/one-api](https://github.com/songquanpeng/one-api)：提供:了OpenAI 接口管理 & 分发系统

## 鸣谢大佬：
始皇 [Neo](https://linux.do/u/neo) 的New和API站，现在可以白嫖官网gpt4蛋和放心用官转API了
[PastKing](https://linux.do/u/PastKing)大佬提供的[mindmap-generator](https://github.com/PastKing/MarkMap-OpenAi-ChatGpt)项目的启发，以及右上角的那个头像我挺喜欢的就保留了

**项目仓库地址：**
https://github.com/zhanghxiao/LLMSTALKS

**部署方式:**
支持vue框架的部署方式均可，比如vercel，CF PAG，codesandbox.....

**CF PAG部署教程：**

![image|690x331, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/b1021e55-f492-42db-af79-9df6edc11d33)

![image|690x331, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/d9cbf233-88b1-4002-bc88-0f6bb801b421)

![image|636x500, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/a672d807-2b4a-430c-8b62-849774ac457d)

![image|690x381, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/5ef7fdc8-ca02-4122-ac51-a092f97bc22f)

接下来耐心等待：

![image|690x460, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/7a4c924e-6f14-44a4-a874-dcb4c7ecc832)

![image|690x428, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/50d2c432-2d58-4ad0-9e17-788b1e827218)

接下来可以自己选择是否加自定义域名什么的


**Vercel部署教程：**

![image|690x296, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/abfb4caa-8e37-4289-a110-52e9dd879f6a)

![image|690x296, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/6999b36d-7400-4daa-b8b9-6e6514f9f3e1)

![image|690x296, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/b4d2a8d9-87e9-479e-b412-1fc15546e181)


继续等待一下

![image|690x296, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/79babc18-e117-4825-859d-efff9235a8f0)

下面就成功了：

![image|690x308, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/a5c7a585-8885-4333-9a80-d1b2067dc55c)

接下来访问：

![image|690x331, 50%](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/12b5ee6d-e162-4a5b-b854-14882564d963)


**演示站暂时就**：
CF演示站：https://llmstalks1.pages.dev/
Vercel演示站：https://llmstalks.vercel.app/
**学生党开源小项目 API KEY不多，各位轻虐**，推荐自己部署，自主优化，点个star,记着哥们开的小头就行 :rofl:
项目暂时只做成了单轮对话节省API KEY,也还没来得及增加markdown格式文本的识别，有bug见谅，后续暑期抽空解决
