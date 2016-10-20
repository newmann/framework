package com.beiyelin.service.footstone.secure.filter;

import com.beiyelin.service.footstone.constant.SecureCST;
import com.beiyelin.service.footstone.secure.realm.StatelessToken;
import com.beiyelin.service.footstone.secure.realm.StatelessTokenUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.web.filter.authz.HttpMethodPermissionFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by xinsheng.hu on 2016/10/2.
 */

public class NoSesstionHttpMethodPermissionFilter extends HttpMethodPermissionFilter {

    private static Logger logger = LoggerFactory.getLogger(NoSesstionHttpMethodPermissionFilter.class);

    /**
     * 当访问被拒绝时，调用这个方法，这里返回401页面
     */
    @Override
    protected boolean onAccessDenied(ServletRequest request,
                                     ServletResponse response) throws IOException {
        logger.info("执行onAccessDenied...");
//        HttpServletRequest req = (HttpServletRequest) request;
//        logger.info("request Body--> " + req.getParameter("username") + req.getParameter("password"));
//        HttpServletResponse res = (HttpServletResponse) response;
//        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return false;
    }

    @Override
    public boolean isAccessAllowed(ServletRequest request,
                                   ServletResponse response, Object mappedValue) throws IOException {
        boolean result = false;
        logger.info("执行isAccessAllowed过程...");
        HttpServletRequest req = (HttpServletRequest) request;
        //客户端提交的用户和token
        String token = req.getHeader(SecureCST.REQUEST_TOKEN);
        String userID = req.getHeader(SecureCST.REQUEST_USER);
        logger.info("request param--> userID:" + userID + "  token:" + token);
        String[] perms = (String[]) mappedValue;
        if ((perms != null) && (perms.length> 0)) {
            logger.info("request mappedValue ->" + perms[0]);
        }
        if(userID != null && token != null){
            StatelessTokenUtils tokenUtils = new StatelessTokenUtils();
            try {
                result = tokenUtils.validateToken(token);
            } catch (Exception e) {
                logger.warn(e.getMessage());
                result = false;
            }
            if (result) {
                result = super.isAccessAllowed(request, response, mappedValue);
                logger.info("调用super.isAccessAllowed，结果:" + result);
            }

        }
        //根据结果统一反馈令牌错误
        if(!result){
            onLoginFail(response); //6、登录失败
        }
        return result;

//        StatelessToken token = new StatelessToken();

        // 如果是带验证的，则进行验证，否则没有验证，只能进行一般的请求
//        if (applyToken != null) {
//            token.setPrincipal(new UserPrincipal(name, UserPrincipal.PrincipType.USER));
//            token.setPassword(pass);
//            try {
//                getSubject(request, response).login(token);
//                // 如果认证成功，则增加request的属性，用于@CurrentUser注解使用
//                User user = token.getUser();
//                request.setAttribute(Contants.CURRENT_USER, user);
//
//            } catch (AuthenticationException e) {
//                logger.info(.g"认证失败! "+eetClass().getSimpleName());
//            } catch (Exception e) {
//                logger.info("其他认证失败! "+e.getClass().getSimpleName());
//                e.printStackTrace();
//            }

//        }


    }
    //登录失败时默认返回401状态码
    private void onLoginFail(ServletResponse response) throws IOException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        httpResponse.getWriter().write("token验证错误，请提交正确的Token。");
    }


}
