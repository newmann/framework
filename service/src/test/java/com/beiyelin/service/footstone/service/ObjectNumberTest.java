package com.beiyelin.service.footstone.service;

import com.beiyelin.test.BaseTest;
import org.junit.Test;

import javax.annotation.Resource;

/**
 * Created by xinsheng.hu on 2016/10/23.
 */
public class ObjectNumberTest extends BaseTest {
    @Resource
    private IObjectNumber objectNumber;

    @Test
    public void newUserNumber() throws Exception {
        logger.info("获取一个User Number：" + objectNumber.newUserNumber());
    }

    @Test
    public void newOrganizationNumber() throws Exception {
        logger.info("获取一个Organization Number：" + objectNumber.newOrganizationNumber());
    }

}