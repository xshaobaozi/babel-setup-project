<script setup>
import { ref } from "vue";
import Button from './components/button.vue';
const count = ref(0);
const handleAdd = () => {
  count.value = count.value + 1;
};
</script>

<template>
  <div class="el-primary button" @click="handleAdd">el-primary {{ count }}</div>
  <div class="test-primary button">test-primary</div>
  <Button></Button>
</template>

<style>
.el-primary {
  background-color: #6161d3;
}
.test-primary {
  background-color: rgb(36, 168, 133);
}
.button {
  width: 120px;
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
