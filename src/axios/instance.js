//支持本地静态文件，路径前加"#"

export function localDataHttp(config) {
    if(config.url.startsWith('#')){
        delete config.baseURL
        return config.url.substring(1)
    }
    return config.url
}