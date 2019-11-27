// 二进制格式转化为base64

const arrayBufferToBase64 = function(buffer) {
    const base64Flag = 'data:image/jpeg;base64,';
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));

    return base64Flag + window.btoa(binary);
}

export default arrayBufferToBase64