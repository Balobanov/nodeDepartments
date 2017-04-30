export default function WindowLocationUrlParser() {
    let location = window.location;
    let params = {};
    let link = "/";
    let parameters = "";

    if (location.hash.indexOf("?") > 0) {
        link = location.hash.split("?")[0].slice(1);

        parameters = location.hash.split("?")[1];

        if (parameters.indexOf("&") > 0) {
            let paramArray = parameters.split("&");
            for (let item of paramArray) {
                let left = item.split("=")[0];
                params[left] = item.split("=")[1];
            }
        }
        else {
            params[parameters.split("=")[0]] = parameters.split("=")[1];
        }
    }
    else {
        link = location.hash.slice(1);
    }
    return {
        href: location.href,
        hash: location.hash,
        host: location.host,
        link: link,
        parameters: parameters,
        params: params
    };
}