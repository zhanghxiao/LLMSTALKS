<template>
    <div v-html="compiledMarkdown"></div>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
    name: 'MarkdownRenderer',
    props: {
        content: {
            type: String,
            required: true
        }
    },
    computed: {
        compiledMarkdown() {
            const md = new MarkdownIt();
            console.log(md.render(this.content));
            return md.render(this.content);
        }
    }
};
</script>

<style scoped>
/* 在 MarkdownRenderer 组件中 */
.markdown-content {
  line-height: 1.2;
  white-space: normal;
}

/* 如果需要调整段落间距 */
.markdown-content p {
  margin-bottom: 0.5em; /* 调整段落之间的间距 */
}
</style>
