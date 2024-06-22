<template>

        <div class="about-content">
            <h1>关于我们</h1>
            <h2>LLMSTALKS多模型群聊助手</h2>
            <blockquote>
                本项目完全开源
                <br>
                如果觉得不错麻烦帮忙点一次 Star ⭐️
            </blockquote>
            <h3>作者：MistPeak</h3>
            <h3>项目简介</h3>
            <p>
                本项目是一个参考了 Chathub 插件的 UI 逻辑以及 MarkMap-OpenAi-ChatGpt 的 vue 调用 API 逻辑，调用大模型 API。结合了 Vue 和 LLMAS 的多模型并行回答助手。用户可以同时调用相同或者不同的大模型并行进行回答。
            </p>

        </div>

</template>

<script>
export default {
    name: 'About'
};
</script>

<style scoped>

.about-content {
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

h1, h2, h3, p {
    margin: 10px 0;
}

img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    display: block;
    margin: 10px 0;
}

blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    border-left: 5px solid #eee;
    background-color: #f9f9f9;
}
</style>
