/**
 * 是否测试环境
 * @returns {boolean} true 测试环境， false 非测试环境
 */
export function isTesting() {
    try {
        const NODE_ENV = process.env.NODE_ENV;
        if(NODE_ENV && NODE_ENV === 'test'){
            return true
        }
    }catch (e) {
        return false;
    }
    return false;
}
