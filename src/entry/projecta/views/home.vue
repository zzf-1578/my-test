<template>
  <div class="project-a-cxt-style">
    <el-page-header @back="goBack" content="多页projectA"></el-page-header>
    <div style="height: 20px"></div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="货物名称">
        <el-input placeholder="请入货物名称" v-model="form.goodName"></el-input>
      </el-form-item>
      <el-form-item label="车长车型">
        <el-input
          @focus="carLengthAndThuckClick"
          data-lgid="btn9-20240521194756"
          readonly
          placeholder="请选择车长车型"
          suffix-icon="el-icon-arrow-down"
          v-model="form.carLengthAndThuck"
        ></el-input>
      </el-form-item>
    </el-form>
    <MyComponent v-model="carLengthAndThuckVisible" @callback="callback"></MyComponent>
  </div>
</template>
<script>
import MyComponent from '../../../components/MyComponent.vue';
import { getUserTokenMsg } from '../../../api/projecta';
export default {
  name: 'ProjectAHome',
  data() {
    return {
      form: {
        goodName: '',
        carLengthAndThuck: '',
      },
      carLengthAndThuckVisible: false,
    };
  },
  components: {
    MyComponent,
  },
  mounted() {
    console.log('mounted===');
    getUserTokenMsg().then((res) => {
      console.log('res===', res);
    });
  },
  methods: {
    goBack() {
      alert('goBack===');
    },
    carLengthAndThuckClick() {
      console.log('carLengthAndThuckClick===');
      this.carLengthAndThuckVisible = true;
    },
    callback(res){
      console.log('getCarData===');
      console.log('getCarData===', res);
    }
  },
};
</script>
<style lang="less" scoped>
.project-a-cxt-style {
  padding: 20px;
  width: 400px;
}
</style>
