import MyComponent from '@/components/MyComponent';
const components = [MyComponent];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, config) {
  // 判断是否安装
  console.log('-----------install------------', config);
  if (install.installed) return;
  // 遍历注册全局组件
  components.map((component) => {
    console.log('component.name', component.name);
    if (component && component.name) {
      Vue.component(component.name, component);
    }
  });
};

// 判断是否是直接引入文件
function MyComponentComponentInit(config, Vue) {
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue, config);
  } else {
    Vue.use(install, config);
  }
}

export default MyComponentComponentInit;
