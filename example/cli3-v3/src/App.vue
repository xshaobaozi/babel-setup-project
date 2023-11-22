<script setup>
import { ref } from "vue";
import myButton from './components/button.vue';
const count = ref(0);
const demo = ref('el-primary')
const handleAdd = () => {
  count.value = count.value + 1;
};
</script>

<template>
  <div class="el-primary button" @click="handleAdd">el-primary 阿a2{{ count }}</div>
  <div class="test-primary button">test-primary </div>
  <div class="demo-primary button">test-primary </div>
  <myButton></myButton>
  {{ demo }}33
</template>

<style>
.el-primary {
  background-color: #6161d3;
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
.button + .button {
  margin-top: 6px;
}
</style>
