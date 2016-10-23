package com.beiyelin.service.footstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.support.atomic.RedisAtomicLong;
import com.beiyelin.service.footstone.constant.ObjectNumberCST;
import org.springframework.stereotype.Service;

/**
 * Created by xinsheng.hu on 2016/10/23.
 */
@Service
public class ObjectNumber implements IObjectNumber {
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public Long newUserNumber(){
        RedisAtomicLong counter = new RedisAtomicLong(ObjectNumberCST.USER_NUMBER_COUNTER, redisTemplate.getConnectionFactory());
        return counter.incrementAndGet();
    }

    @Override
    public Long newOrganizationNumber(){
        RedisAtomicLong counter = new RedisAtomicLong(ObjectNumberCST.ORGANIZATION_NUMBER_COUNTER, redisTemplate.getConnectionFactory());
        return counter.incrementAndGet();
    }

}
