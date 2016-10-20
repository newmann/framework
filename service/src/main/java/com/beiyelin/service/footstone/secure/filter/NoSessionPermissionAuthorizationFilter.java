package com.beiyelin.service.footstone.secure.filter;

import org.apache.shiro.web.filter.authz.AuthorizationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * Created by xinsheng.hu on 2016/10/17.
 */
public class NoSessionPermissionAuthorizationFilter extends AuthorizationFilter {
    private final static Logger logger = LoggerFactory.getLogger(NoSessionPermissionAuthorizationFilter.class);

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        logger.info("进入NoSessionPermissionAuthorizationFilter.isAccessAllowed");

        String[] perms = (String[]) mappedValue;
        if((perms != null) && (perms.length >0)) {
            logger.info(perms[0]);
        }

        return false;
    }
}
