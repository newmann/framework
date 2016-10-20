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
	@RequestMapping(value="/{userID}",method=RequestMethod.GET)
	public ResponseBaseStructure getUserbyID(@PathVariable("userID") String userID){
        logger.info("开始去用户数据-->userID:" + userID);
		ResponseBaseStructure result;
		User user= userService.selectUserByPrimaryKey(userID);
		if(user == null){
			result = new ResponseNotFound("用户：" + userID +" 不存在。");
		}else{
			result = new ResponseOK(user);
		}
		
		return result;
	}

	@PostMapping(value="/login")
	public ResponseBaseStructure login(@RequestBody LoginForm loginForm){
		logger.info("开始登录验证，提交的数据为-->signinForm:" + loginForm.toString());

		StatelessTokenResponse tokenResponse = userService.loginAndGetToken(loginForm.getUserName(),loginForm.getPassword());

		if (tokenResponse != null) {
			return new ResponseOK(tokenResponse);
		}else {
			return new ResponseLoginFailor();
		}

	}

	@PostMapping(value="/signin")
	public ResponseBaseStructure signin(@RequestBody SigninForm signinForm){
		logger.info("开始登录验证，提交的数据为-->signinForm:" + signinForm.toString());
		try {
			User user = new User();
			user.setId(UUID.randomUUID().toString());
			user.setUsername(signinForm.getUserName());
			user.setEmail(signinForm.getEmail());
			user.setPassword(signinForm.getPassword());

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
