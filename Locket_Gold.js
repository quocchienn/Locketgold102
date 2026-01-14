const url = $request.url;
const isGetGold = url.includes('/user/') || url.includes('/balance') || url.includes('/profile');
const isUpdate = url.includes('/update') || url.includes('/purchase');

if (isGetGold) {
    try {
        const body = $response.body;
        const obj = JSON.parse(body);
        
        // Giữ nguyên gold hiện tại hoặc set giá trị cao
        if (obj.data && typeof obj.data.balance !== 'undefined') {
            obj.data.balance = 999999;
        } else if (obj.balance !== undefined) {
            obj.balance = 999999;
        } else if (obj.data && obj.data.user && obj.data.user.balance !== undefined) {
            obj.data.user.balance = 999999;
        }
        
        // Đảm bảo các trạng thái không bị reset
        if (obj.data && obj.data.user) {
            obj.data.user.is_premium = true;
            obj.data.user.premium_expires_at = "2099-12-31T23:59:59Z";
        }
        
        $done({ body: JSON.stringify(obj) });
    } catch (error) {
        console.log(`Lỗi xử lý response: ${error}`);
        $done({});
    }
} else if (isUpdate) {
    // Chặn các request update để không bị reset gold
    $done({
        status: 200,
        headers: $response.headers,
        body: JSON.stringify({
            success: true,
            data: { balance: 999999 }
        })
    });
} else {
    $done({});
}
