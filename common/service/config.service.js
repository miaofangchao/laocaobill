let BASE_URL = ''


if (process.env.NODE_ENV == 'development') {
		BASE_URL = 'http://192.168.124.12:58080/monitor' // 开发环境
		// BASE_URL = 'http://39.99.207.197:58080/monitor' // 开发环境
		// BASE_URL = 'http://192.168.124.23:58080/monitor' //测试
} else {
	BASE_URL = 'http://192.168.124.12:58080/monitor' // 生产环境
}
let staticDomainURL = BASE_URL+ '/sys/common/static';

const configService = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL
};

export default configService