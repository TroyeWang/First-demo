/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

// 银行卡
export function validateBankCard(cardNo) {
    return /^(\d{16}|\d{19})$/.test(cardNo);
}

// 中文名
export function validateName(name) {
    return /^[\u4e00-\u9fa5]{2,4}$/.test(name);
}
// 可以有字母的名字
export function validateanyName(name) {
    return /^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(name);
}

// 手机号码
export function validateMobile(mobile) {
    return /^1[3|4|5|7|8]\d{9}$/.test(mobile);
}

// 判断金额
export function validateMoney(money) {
    return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(money);
}

// 判断整型
export function validateInt(number) {
    return /(^0$)|(^[1-9](\d+)?$)/.test(number)
}
