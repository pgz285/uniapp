const baseUrl = 'https://center.foshanlepin.com/center/graphql' 
 
 // local 
// const baseUrl = 'http://192.168.1.5:4001/graphql' 
 
const request = (url = '', date = {}, type = 'POST', header = {
}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: baseUrl + url,
            data: date,
            header: {
				"Authorization": uni.getStorageSync('userInfo').token || ''
			},
            dataType: 'json',         
        }).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response;        
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
			uni.hideLoading();
            reject(err)
        })
    });
}
export default request