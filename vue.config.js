module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    publicPath:'/dist',
    devServer: {
        proxy: {
            '/hoffice': {
                target: 'http://dghealth.medstarcorp.com',
                pathRewrite: {'^/hoffice' : '/hoffice'}
            },
            '/collection': {
                target: 'http://localhost:8082/collection',
                pathRewrite: {'^/collection' : '/'}
            }
        }
    }
}
