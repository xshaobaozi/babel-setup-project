<template>
  <div id="app">
    <div class="el-primary button" @click="handleAdd">el-primry div样式</div>
    <myButton></myButton>
    <myButton2></myButton2>
    <el-button type="primary" style="margin-top: 6px;">element组件</el-button>
    <p>
      {{ demo }}
    </p>
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
      demo: 'el-primary data的'
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
