package com.beiyelin.app.Response;

/**
 * Created by xinsheng.hu on 2016/10/12.
 */
public abstract class ResponseBaseStructure {
    private String status;
    private Object result;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }
}
