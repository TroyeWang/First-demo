// XMLHttpRequest接收二进制数据, 下载excel
import {hostObj} from 'request/config';
import {ssEnv} from 'request/env';

export function downExcel(url, param, header, fileName, cb, errcb) {
    var xhr = new XMLHttpRequest();
    var form = new FormData();
    var host = hostObj[ssEnv];

    for (let key in param) {
        form.append(key, param[key]);
    }

    xhr.open('POST', host + url, true);
    xhr.responseType = "arraybuffer";

    for(let key in header) {
        xhr.setRequestHeader(key, header[key]);
    }

    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                var blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
                fileName += '.csv';

                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, fileName);
                } else {
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                }

                typeof cb === 'function' && cb();
            } else {
                typeof errcb === 'function' && errcb();
            }

        }
    }
    xhr.send(form);
}
