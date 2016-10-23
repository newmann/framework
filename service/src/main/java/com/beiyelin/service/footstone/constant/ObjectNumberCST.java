package com.beiyelin.service.footstone.constant;

/**对象序号需要全局唯一，通过redis的计数器来生成。在Redis中不同对象的计数器名称在这里维护
 * Created by xinsheng.hu on 2016/10/23.
 */
public class ObjectNumberCST {
    public final static String USER_NUMBER_COUNTER="user-number-counter";
    public final static String ORGANIZATION_NUMBER_COUNTER="organization-number-counter";

}
