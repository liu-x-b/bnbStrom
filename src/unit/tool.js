export function NumSplic(val,len) {
    var f = parseFloat(val);
    if (isNaN(f)) {
        return false;
    }
    var s=val.toString();
    if(s.indexOf(".")>0){
        let f = s.split(".")[1].substring(0,len)
        s=s.split(".")[0]+"."+f
    }
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + len) {
        s += '0';
    }
    return s;
}