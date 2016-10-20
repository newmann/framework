package com.beiyelin.app.Response;

import com.beiyelin.app.constant.ApiResultCST;
import org.springframework.http.HttpStatus;

/**
 * Created by xinsheng.hu on 2016/10/12.
 */
public class ResponseOK extends ResponseBaseStructure {
    public ResponseOK(){
        setStatus(ApiResultCST.RESULT_OK);
    }

    public ResponseOK(Object object){
        setStatus(ApiResultCST.RESULT_OK);
        setResult(object);
    }

}
