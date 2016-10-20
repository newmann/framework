package com.beiyelin.app.Response;

import com.beiyelin.app.constant.ApiResultCST;

/**
 * Created by xinsheng.hu on 2016/10/12.
 */
public class ResponseLoginFailor extends ResponseBaseStructure {
    public ResponseLoginFailor(){
        setStatus(ApiResultCST.RESULT_ERROR);
        setResult("提交的用户名或密码不正确，请重新登录");
    }
}
