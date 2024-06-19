const chalk = require('chalk');
const isTestEnv = process.env.VUE_APP_ENV === 'testing'; // 测试环境
const path = require('path');
const WTYT_CDN_ENV = '';
console.log(chalk.green('当前程序打包运行的环境为==========' + process.env.VUE_APP_ENV));

function resolve(dir) {
  return path.join(__dirname, dir);
}

const pages = {
  'v-project-a': {
    entry: 'src/entry/projecta/main.js',
    template: 'public/projecta/index.html',
    filename: 'v-project-a/index.html',
    // 其他配置项
  },
  'v-project-b': {
    entry: 'src/entry/projectb/main.js',
    template: 'public/projectb/index.html',
    filename: 'v-project-b/index.html',
    // 其他配置项
  }
  // 更多页面
};

const distConfig = {
  outputDir: process.env.VUE_APP_OUTPUT_DIR || 'my-test/dist', // 打包文件夹，默认为dist
  publicPath: process.env.NODE_ENV === 'development' ? '/' : `${WTYT_CDN_ENV}/my-test/dist/`,
  assetsDir: 'V1.0.0',
  productionSourceMap: isTestEnv, // 该配置项用于设置是否为生产环境构建生成 source map，一般在生产环境下为了快速定位错误信息,开发环境或者测试环境为true,线上为false
  pages: process.env.PAGES ? { [process.env.PAGES]: pages[process.env.PAGES] } : pages,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // deServer 配置
    open: false, // 是否自动打开浏览器页面
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
    port: 8500, // 端口地址
    https: false, // 使用https提供服务
    proxy: {
      '/lg-api': {
        target: 'https://test-microservice.log56.com/luge/gateway.do',
        changeOrigin: true,
        pathRewrite: {
          '^/lg-api': '',
        },
      },
    },
  },
  crossorigin: 'anonymous',
  chainWebpack: (config) => {
    config.output.crossOriginLoading('anonymous');
    config.plugins.delete('prefetch').delete('preload');
  },
  css: {
    loaderOptions: {
      less: {},
    },
  },
};

const libConfig = {
  productionSourceMap: false, // 打包后不产生sourcemap
  css: {
    extract: true,
  },
  configureWebpack: {
    output: {
      filename: '[name].js',
      library: '[name]',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
    config.plugins.delete('copy');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.plugins.delete('html');
    config.plugins.delete('hmr');
    config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => {
          options.prettify = false;
          return options;
        });
    config.resolve.alias
        .set('@', resolve('src'));
  },
};

// 导出设置
let config;
if(process.env.VUE_APP_ENV === 'libBuilding'){
  const pageKeys = process.env.PAGES ? [process.env.PAGES] : Object.keys(pages);
  const projectName = pageKeys[0];
  config = {
    ...libConfig,
    configureWebpack: {
      ...libConfig.configureWebpack,
      entry: pages[projectName].entry
    },
  };
}else{
  config = distConfig;
}
module.exports = config;
