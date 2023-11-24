<script setup>
import { ref } from "vue";
import myButton from './components/button.vue';
import myButton2 from './components/button2.vue';
const demo = ref('el-primary data数据')
</script>

<template>
  <div class="el-primary button" @click="handleAdd">el-primary div模板</div>
  <div class="demo-primary button el-x">测试postcss</div>
  <myButton></myButton>
  <myButton2></myButton2>
  <el-button>element组件</el-button>
  <p>
    {{ demo }}
  </p>
</template>

<style>
.el-primary {
  background-color: #6161d3;
}

.el-x {
  color: white;
}

.test-primary {
  background-color: rgb(36, 168, 133);
}

.button {
  width: 200px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid black;
  line-height: 30px;
  text-align: center;
}

.button+.button {
  margin-top: 6px;
}
</style>
<style lang="scss">
@import '@/test.scss'

</style>