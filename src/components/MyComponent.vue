<!-- MyComponent -->
<template>
  <el-dialog custom-class="car-length-thuck-dialog" :visible.sync="dialogVisible" width="576px">
    <div class="car-length-thuck-cxt">
      <div class="car-type-cxt">
        <div class="title">车长</div>
        <div class="item-cxt">
          <div class="item" :class="[item.h5 ==  itemLength ? 'active' : '', item.isDs == '1'?'disabled':'']"  v-for = "(item,index) in truckLength" :key="index" @click="selectLength(item)"  >{{item.h5}}</div>
          <!--          <div class="item">1.5米</div>-->
          <!--          <div class="item active">4.6米</div>-->
          <!--          <div class="item">6.8米</div>-->
          <!--          <div class="item">7.6米</div>-->
          <!--          <div class="item disabled">9.6米</div>-->
        </div>
      </div>
      <div class="car-type-cxt">

        <div class="title">车型</div>
        <div class="item-cxt">
          <div class="item" v-for = "(item,index) in truckModule" :class="[item.h5 ==  itemType ? 'active' : '']" :key="index" @click="selectType(item)">{{item.h5}}</div>
          <!--          <div class="item">平板</div>-->
          <!--          <div class="item">高栏</div>-->
          <!--          <div class="item active">箱式</div>-->
          <!--          <div class="item disabled">集装箱</div>-->
          <!--          <div class="item">高低板</div>-->
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 已知车长车型数据从此连接获取：https://test-imgt.log56.com/fecdn/lg-element-ui-site/truckCarInfoData.json?t=1664261121024

export default {
  name: 'MyComponent',
  props: {
    content: {
      type: String,
      default: 'default',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit('input', val);
    },
  },
  data() {
    return {
      dialogVisible: false,
      truckLength:[],
      truckModule:[],
      itemLength:'',
      itemType:''
    };
  },
  components: {},
  computed: {},
  mounted() {
    fetch('https://test-imgt.log56.com/fecdn/lg-element-ui-site/truckCarInfoData.json?t=1664261121024')
        .then(response => response.json())
        .then(data => {
          this.truckLength = data.truckLength
          this.truckModule = data.truckModule
          console.log(data,'data')
          // 这里的 'data' 就是你的 JSON 数据
        })
        .catch(error => console.error('Error:', error));
    // importJSON('https://test-imgt.log56.com/fecdn/lg-element-ui-site/truckCarInfoData.json?t=1664261121024').then((data) => {
    //   console.log(data)
    //   this.truckLength = data.truckLength
    //   this.truckModule = data.truckModule
    //   ;
    // })
  },
  methods: {
    selectLength(item) {
      console.log(item)
      this.itemLength = item.h5
      console.log(this.itemLength)
    },
    selectType(item) {
      this.itemType = item.h5
      console.log(this.itemType)
    },
    save() {
      let _this = this;
      let myData = {
        length:_this.itemLength,
        type:_this.itemType
      }
      console.log(myData, ' saveData')
      this.$emit('callback',myData)
      this.dialogVisible = false
    }
  },
};
</script>
<style lang="less" scoped>
.MyComponent {
  width: 100%;
}
</style>
<style lang="less">
.car-length-thuck-dialog {
  .el-dialog__header {
    padding: 10px 20px;
    border-bottom: 1px solid #e4e7ed;
    display: none;
  }
  .el-dialog__footer {
    border-top: 1px solid #e4e7ed;
    padding: 6px 20px;
  }
  .el-dialog__body {
    padding: 10px 20px;
    .car-type-cxt {
      .title {
        font-size: 16px;
        font-weight: bold;
        padding: 10px 0;
      }
      .item-cxt {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 76px;
          padding: 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 32px;
          line-height: 32px;
          text-align: center;
          margin: 10px;
          border: 1px solid #e4e7ed;
          border-radius: 5px;
          cursor: pointer;
          &:hover {
            background-color: #f5f7fa;
            border-color: #9fb1ff;
          }
        }
        .active {
          background-color: #eaeeff;
          border-color: #9fb1ff;
          color: #335aff;
        }
        .disabled {
          background-color: #f5f7fa;
          border-color: #e4e7ed;
          color: #c0c4cc;
          cursor: not-allowed;
          &:hover {
            background-color: #fff;
            border-color: #e4e7ed;
          }
        }
      }
    }
  }
}
</style>
