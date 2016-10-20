package com.beiyelin.app.Response;

import com.beiyelin.app.constant.ApiResultCST;

/**
 * Created by xinsheng.hu on 2016/10/12.
 */
public class ResponseError extends ResponseBaseStructure {
    public ResponseError(){
        setStatus(ApiResultCST.RESULT_ERROR);
    }

    public ResponseError(Object object){
        setStatus(ApiResultCST.RESULT_ERROR);
        setResult(object);
    }

}
