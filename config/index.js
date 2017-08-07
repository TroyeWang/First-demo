// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        prodEnv: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: './', //生产环境assetsPublicPath: '/'
        staticPath:'./', //生产环境 staticPath:''
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 9528,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        staticPath:'/static/',
        proxyTable: {
            '/mes': {
                target: 'http://192.168.123.69:18888/',
                changeOrigin: true,
                pathRewrite: {
                    '^/mes': ''
                }
            },
            '/mock': {
                target: 'https://api-sit',
                changeOrigin: true,
                pathRewrite: {
                    '^/mock': ''
                }
            }
        },
        cssSourceMap: false
    }
}
