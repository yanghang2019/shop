 function ajax(options) {
     const url = options.url || null;
     if (url === null || url.length) {
         new Error("url not Empty");
     }
     const method = options.method || "get";
     const async = options.async || false;
     const data = options.data || null;
     let xhr = null;
     if (window.XMLHttpRequest) {
         xhr = new XMLHttpRequest();
     } else if (window.ActiveXObject) {
         xhr = new ActiveXObject("Microsoft.XMLHTTP");
     }
     return new Promise((resolve, reject) => {
         xhr.ontimeout = () => reject && reject("请求超时");
         xhr.onreadystatechange = () => {
             if (xhr.readyState === 4) {
                 if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                     resolve && resolve(xhr.responseText);
                 } else {
                     reject && reject();
                 }
             }
         }
         xhr.onerror = err => reject && reject(err);
         let paramArr = [];
         if (method === "get") {
             if (url.indexOf("?") === -1) {
                 url += "?";
             } else {
                 url += "&";
             }
             url += encodeParams(data);
         }
         xhr.open(method, url, async);
         if (method === "get") {
             xhr.send(null);
         } else {
             // xhr.setRequestHeader
             xhr.send(encodeData);
         }
     })
 }


 function encodeParams(data) {
     if (data instanceof Object) {
         for (let key in data) {
             //对参数进行编码
             paramArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
         }
         return paramArr.join("&");
     }
     return null;
 }