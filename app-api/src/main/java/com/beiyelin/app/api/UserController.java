package com.beiyelin.app.api;

import javax.annotation.Resource;

import com.beiyelin.app.Response.*;
import com.beiyelin.service.footstone.constant.UserPermissionCST;
import com.beiyelin.service.footstone.secure.authority.annotation.PermissionControl;
import com.beiyelin.service.footstone.secure.realm.StatelessTokenResponse;
import com.beiyelin.service.footstone.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import com.beiyelin.service.footstone.model.User;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {
	private  static Logger logger = LoggerFactory.getLogger(UserController.class);

	@Resource
	private IUserService userService;

	@PermissionControl(UserPermissionCST.READ)
	@RequestMapping(value="/get/{userID}",method=RequestMethod.GET)
	public ResponseBaseStructure getUserbyID(@PathVariable("userID") String userID){
        logger.info("开始取用户数据-->userID:" + userID);
		ResponseBaseStructure result;
		User user= userService.selectUserByPrimaryKey(userID);
		if(user == null){
			result = new ResponseNotFound("用户：" + userID +" 不存在。");
		}else{
			result = new ResponseOK(user);
		}
		
		return result;
	}

	@RequestMapping(value="/checkSigninPhone/{phone}",method=RequestMethod.GET)
	public ResponseBaseStructure checkSigninPhone(@PathVariable("phone") String phone){
		logger.info("开始验证手机号-->signin phone:" + phone);
		ResponseBaseStructure result;
		User user= userService.selectUserByPhone(phone);
		if(user == null){
			result = new ResponseNotFound("手机号[" + phone +"]没有被使用。");
		}else{
			result = new ResponseOK("手机号[" + phone +"]已经被使用。");
		}
		return result;
	}

	@PostMapping(value="/login")
	public ResponseBaseStructure login(@RequestBody User loginUser){
		logger.info("开始登录验证，提交的数据为: " ,loginUser);

		StatelessTokenResponse tokenResponse = userService.loginAndGetToken(loginUser.getUserName(),loginUser.getPassword());

		if (tokenResponse != null) {
			return new ResponseOK(tokenResponse);
		}else {
			return new ResponseLoginFailor();
		}

	}

	@PostMapping(value="/signin")
	public ResponseBaseStructure signin(@RequestBody User user){
		logger.info("开始注册账户，提交的数据为-->signinForm:", user);
		try {
//			User user = new User();
			user.setId(UUID.randomUUID().toString());
//			user.setUserName(signinForm.getUserName());
//			user.setEmail(signinForm.getEmail());
//			user.setPassword(signinForm.getPassword());

			int addResponse = 0;
			addResponse = userService.insertSimpleUser(user);


			if (addResponse == 1) {
				return new ResponseOK("注册成功！");
			} else {
				return new ResponseError("注册失败，原因未知。。。");
			}
		}catch (Exception ex){
			return new ResponseError(ex.getMessage());
		}

	}

}
