package com.beiyelin.service.footstone.secure.authority.interceptor;

import com.beiyelin.service.footstone.constant.SecureCST;
import com.beiyelin.service.footstone.secure.authority.annotation.PermissionControl;
import com.beiyelin.service.footstone.secure.realm.StatelessTokenUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by xinsheng.hu on 2016/10/18.
 */
public class PermissionControlInterceptor extends HandlerInterceptorAdapter {
    private final static Logger logger = LoggerFactory.getLogger(PermissionControl.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info("开始处理身份认证判断");
        //客户端提交的用户和token
        String token = request.getHeader(SecureCST.REQUEST_TOKEN);
        String userID = request.getHeader(SecureCST.REQUEST_USER);
        logger.info("request param--> userID:" + userID + "  token:" + token);
        if ((userID ==null) || (token == null)){
            responseTokenFail(response);
            return false;
        }
        if (!checkToken(token)){
            responseTokenFail(response);
            return false;
        }
        logger.info("开始处理权限判断");
        if(handler.getClass().isAssignableFrom(HandlerMethod.class)){
            PermissionControl permissionControl = ((HandlerMethod) handler).getMethodAnnotation(PermissionControl.class);
            //没有声明需要权限,或者声明不验证权限
            if(permissionControl == null || permissionControl.value().length == 0)
                return super.preHandle(request, response, handler);
            else{
                //在这里实现自己的权限验证逻辑
                boolean isPermitted = true;
                for(int i = 0 ; i < permissionControl.value().length ;i++){
                    logger.info("开始判断权限：" + permissionControl.value()[i]);

                }
                return super.preHandle(request, response, handler);
//                else//如果验证失败
//                {
//                    //返回登录权限错误的json包
//                    response.sendRedirect("account/login");
//                    return false;
//                }
            }
        }else {
            return super.preHandle(request, response, handler);
        }
    }
    //登录失败时默认返回401状态码
    private void responseTokenFail(HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("token验证错误，请提交正确的Token。");
    }

    //登录失败时默认返回401状态码
    private void responsePermissionFail(HttpServletResponse response,String perm) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("没有权限 + "+ perm);
    }

    private boolean checkToken(String token){
        StatelessTokenUtils tokenUtils = new StatelessTokenUtils();
        try {
            return  tokenUtils.validateToken(token);
        } catch (Exception e) {
            logger.warn(e.getMessage());
            return false;
        }
    }
}
