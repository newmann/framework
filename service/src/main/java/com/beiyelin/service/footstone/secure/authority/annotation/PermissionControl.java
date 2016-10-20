package com.beiyelin.service.footstone.secure.authority.annotation;


import java.lang.annotation.*;

/**
 * Created by xinsheng.hu on 2016/10/18.
 */
@Documented
@Inherited
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface PermissionControl {
    String[] value();

}
