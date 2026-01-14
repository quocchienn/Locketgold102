const url = $request.url;

// Xóa các header có thể bị Locket phát hiện
const deleteHeaders = [
    'x-envoy-attempt-count',
    'x-envoy-upstream-service-time',
    'via',
    'x-timer',
    'cf-ray',
    'x-shadowrocket',
    'mitm',
    'x-mitm',
    'proxy-connection',
    'x-forwarded-for',
    'x-real-ip'
];

let headers = $response.headers;

// Xóa các header đáng ngờ
deleteHeaders.forEach(header => {
    delete headers[header];
});

// Thêm header giả mạo để trông giống request bình thường
headers['Connection'] = 'keep-alive';
headers['Accept-Encoding'] = 'gzip, deflate, br';

$done({ headers });
