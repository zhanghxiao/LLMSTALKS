<template>
    <div>
        <h1>关于我们</h1>
        <div v-html="renderedMarkdown"></div>
    </div>
</template>
<script>
import marked from 'marked';

export default {
    name: 'About',
    data() {
        return {
            markdownContent: `
# LLMSTALKS多模型群聊助手

> 本项目完全开源
> 如果觉得不错麻烦帮忙点一次Star⭐️

## 项目简介
本项目是一个参考了Chathub插件的UI逻辑以及MarkMap-OpenAi-ChatGpt的vue调用API逻辑，调用大模型api。结合了Vue和LLMAS的多模型并行回答助手。用户可以同时调用相同或者不同的大模型并行进行回答

## 效果演示
![image](https://github.com/zhanghxiao/LLMSTALKS/assets/137479165/46d2c46e-aa04-43ad-9ccc-8e584cc54bab)
`
        };
    },
    computed: {
        renderedMarkdown() {
            return marked(this.markdownContent);
        }
    }
};
</script>
<style scoped>
h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
}

div {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    border-left: 5px solid #eee;
    background-color: #f9f9f9;
}

img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    display: block;
    margin: 0 auto;
}
</style>
