module.export = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/commom',
                'components': '@/components',
                'network': '@/network',
            }
        }
    }
}