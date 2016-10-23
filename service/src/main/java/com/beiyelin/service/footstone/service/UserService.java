package com.beiyelin.service.footstone.service;

import java.util.HashMap;
import java.util.UUID;

import com.beiyelin.service.footstone.secure.realm.StatelessTokenResponse;
import com.beiyelin.service.footstone.secure.realm.StatelessTokenUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.beiyelin.service.footstone.dao.PermissionMapper;
import com.beiyelin.service.footstone.dao.RoleMapper;
import com.beiyelin.service.footstone.dao.RoleUserMapper;
import com.beiyelin.service.footstone.dao.UserMapper;
import com.beiyelin.service.footstone.model.RoleUser;
import com.beiyelin.service.footstone.model.User;

@Service
public class UserService implements IUserService {
	private final static Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private RoleMapper roleMapper;
	
	@Autowired
	private RoleUserMapper roleUserRecordMapper;
	
	@Autowired
	private PermissionMapper permissionMapper;
	@Autowired
	private PasswordHelper passwordHelper;
	
	
	/**
	 * 对用户的密码进行加密
	 * @param userRecord
	 */
	public void encryptUserPassword(User userRecord){
		HashMap<String,String> enc = passwordHelper.encryptPassword(userRecord.getPassword());

		userRecord.setPassword(enc.get(passwordHelper.RESULTMAP_PASSWORD_TAG));
		userRecord.setSalt(enc.get(passwordHelper.RESULTMAP_SALT_TAG));
	}
	
	/**
     * Query the roles of a user by user's Primary Key
     * 只提取用户的基本信息，不含角色、权限等
     * @param id ,user primary key
     * @return set of role
     */
    @Override
    public User selectSimpleUserByPrimaryKey(String id){
    	
    	return userMapper.selectByPrimaryKey(id);
    	
    };
    /**
     * 将用户的所有信息提取出来
     * @param id
     * @return
     */
    @Override
    public User selectUserByPrimaryKey(String id){
    	User user = new User();
    	user= userMapper.selectByPrimaryKey(id);
    	if (user != null) {
			user.setRoleList(roleMapper.selectRolesByUserPrimaryKey(id));

			user.setPermissionList(permissionMapper.selectPermissionsByUserPrimaryKey(id));
		}
    	return user;
    };

    @Override
    @Transactional
    public int insertSimpleUser(User user){
    	if ((user.getSalt() == null) || (user.getSalt().length() == 0)) {
			encryptUserPassword(user);
		}
    	return userMapper.insert(user);
    }
    
    @Override
    @Transactional
    public int insertUserRole(String userID, String roleID){
    	RoleUser record;
    	record = new RoleUser();
    	record.setId(UUID.randomUUID().toString());
    	record.setUserid(userID);
    	record.setRoleid(roleID);
    	return roleUserRecordMapper.insert(record);
    }
	@Override
	@Transactional
	public int deleteSimpleUserByPrimaryKey(String userID){
		return  userMapper.deleteByPrimaryKey(userID);
	}
	/**
	 * 登录判断
	 * @param userName
	 * @param password
	 * @return
	 */
    @Override
    public boolean login(String userName, String password){
		User user = userMapper.selectByUserName(userName);
		logger.info("user:" + user.toString());
		if(user != null){
			Boolean result =passwordHelper.assertPasswordEqual(password,user.getPassword(),user.getSalt());
			logger.info("密码验证结果：" + result.toString());

			return  result;
		}
		return false;
	}

	/**
	 * 登录判断，如果登录成功，则返回userid和token
	 * @param userName
	 * @param password
	 * @return
	 */
	@Override
	public StatelessTokenResponse loginAndGetToken(String userName, String password) {
		StatelessTokenResponse tokenResponse;
		StatelessTokenUtils tokenUtils;
		User user = userMapper.selectByUserName(userName);
		logger.info("user:" + user.toString());
		if(user != null){
			Boolean check =passwordHelper.assertPasswordEqual(password,user.getPassword(),user.getSalt());
			logger.info("密码验证结果：" + check.toString());
			if (check){
				tokenUtils = new StatelessTokenUtils();

				tokenResponse = new StatelessTokenResponse(user.getId(),tokenUtils.createToken(user.getId()));

				return tokenResponse;
			} else {
				return  null;
			}

		}

		return null;
	}

	@Override
	public User selectUserByPhone(String phone) {

		return userMapper.selectByPhone(phone);
	}
}
