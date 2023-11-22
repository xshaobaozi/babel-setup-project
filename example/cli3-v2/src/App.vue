<template>
  <div id="app">
    <div class="el-primary button" @click="handleAdd">el-primary 阿a2{{ count }}</div>
    <div class="test-primary button">test-primary 23</div>
    <div class="demo-primary button">demo-primary 2</div>
    <myButton></myButton>
    <myButton2></myButton2>
    {{ demo }}33
  </div>
</template>

<script>
import myButton from './components/button.vue'
import myButton2 from './components/button2.vue'

export default {
  name: 'App',
  components: {
    myButton,
    myButton2,
  },
  data() {
    return {
      count: 0,
      demo: 'el-primary'
    }
  },
  methods: {
    handleAdd() {
      this.count++
    }
  }
}
</script>

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

.button+.button {
  margin-top: 6px;
}</style>
