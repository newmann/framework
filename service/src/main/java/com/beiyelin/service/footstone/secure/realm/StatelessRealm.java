package com.beiyelin.service.footstone.secure.realm;

import com.beiyelin.service.footstone.secure.codec.HmacSHA256Utils;
import com.beiyelin.service.footstone.service.RoleService;
import com.beiyelin.service.footstone.service.UserService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;

/**
 * Created by xinsheng.hu on 2016/10/1.
 */
public class StatelessRealm extends AuthorizingRealm {
    private static Logger logger = LoggerFactory.getLogger(StatelessRealm.class);

    @Resource
    private RoleService roleService;

    @Override
    public boolean supports(AuthenticationToken token) {
        logger.info("判断是否为StatelessToken...");
        //仅支持StatelessToken类型的Token
        return token instanceof StatelessToken;

    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        logger.info("开始处理验证信息...");
        StatelessToken statelessToken = (StatelessToken) token;
        logger.info("userid: " + statelessToken.getUserID() +" token : " + statelessToken.getToken() );
        return new SimpleAuthenticationInfo(
                statelessToken.getUserID(),
                statelessToken.getToken(),
                getName());

    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        logger.info("开始返回用户权限...");
        //根据用户名查找角色，请根据需求实现
        String userID = (String) principals.getPrimaryPrincipal();
        logger.info("userid：" + userID);
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();

        authorizationInfo.addRoles(roleService.selectRolesNameByUserID(userID));
        authorizationInfo.addStringPermission("user:read");
        logger.info("取出的角色：" + authorizationInfo.getRoles().toString());

        return authorizationInfo;
    }


}
