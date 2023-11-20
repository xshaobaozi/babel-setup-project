<script setup>
import { ref } from "vue";
const count = ref(0);
const handleAdd = () => {
  count.value = count.value + 1;
};
</script>

<template>
  <div class="el-primary button" @click="handleAdd">el-primary {{ count }}</div>
  <div class="test-primary button">test-primary</div>
</template>

<style scoped>
.el-primary {
  background-color: #6161d3;
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
