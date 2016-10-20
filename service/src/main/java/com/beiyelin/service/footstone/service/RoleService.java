package com.beiyelin.service.footstone.service;

import com.beiyelin.service.footstone.dao.RoleMapper;
import com.beiyelin.service.footstone.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleService {
    @Autowired
    private RoleMapper roleMapper;

    /**
     * 给shiro使用，返回角色代码列表
     * @param userID
     * @return
     */
    public List<String> selectRolesNameByUserID(String userID){

        List<String> result = new ArrayList<String>();

        List<Role> roles = roleMapper.selectRolesByUserPrimaryKey(userID);

        for(int i=0; i <= roles.size(); i++){
            Role role = roles.get(i);
            result.add(role.getRolecode());
        }
        return result;
    }
}
