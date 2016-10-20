package com.beiyelin.service.footstone.service;

import com.beiyelin.service.footstone.model.User;
import com.beiyelin.service.footstone.secure.realm.StatelessTokenResponse;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by xinsheng.hu on 2016/10/8.
 */
public interface IUserService {
    User selectSimpleUserByPrimaryKey(String id);

    User selectUserByPrimaryKey(String id);

    @Transactional
    int insertSimpleUser(User user);

    @Transactional
    int insertUserRole(String userID, String roleID);

    @Transactional
    int deleteSimpleUserByPrimaryKey(String userID);

    boolean login(String userName, String password);

    StatelessTokenResponse loginAndGetToken(String userName, String password);
}
