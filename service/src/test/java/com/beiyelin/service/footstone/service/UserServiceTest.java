package com.beiyelin.service.footstone.service;

import static org.junit.Assert.*;

import com.beiyelin.service.footstone.constant.GenderCST;
import com.beiyelin.service.footstone.constant.UserCertificateTypeCST;
import com.beiyelin.service.footstone.model.User;
import com.beiyelin.test.TestConstant;
import org.junit.Test;

import com.beiyelin.test.BaseTest;

import javax.annotation.Resource;
import java.util.Date;
import java.util.UUID;

public class UserServiceTest extends BaseTest {
	@Resource
	private IUserService userService;

	@Test
	public void testselectSimpleUserByPrimaryKey() throws Exception {
		User user;
		user = userService.selectSimpleUserByPrimaryKey(TestConstant.testUserID);
		assert(user != null);

	}

	@Test
	public void testinsertSimpleUser() throws Exception {
		User user;

		String userID;
		int i;
		user = userService.selectSimpleUserByPrimaryKey(TestConstant.testUserID);
		if(user ==null){
			logger.info("开始添加缺省用户kidson");
			user = new User();
			user.setId(TestConstant.testUserID);
			user.setNickName("kidson");
			user.setUserType(UserCertificateTypeCST.IDCard);
			user.setUserName("kidson");
			user.setTrueName("胡新生");
			user.setSex(GenderCST.Male);
			user.setCreateTime(new Date());
			user.setPassword("kidson");
			i = userService.insertSimpleUser(user);
			assert(i == 1);
		}else{

			userID = UUID.randomUUID().toString();
			user = new User();
			user.setId(userID);
			user.setNickName("TestMan01");
			user.setUserType(UserCertificateTypeCST.IDCard);
			user.setUserName("huxinsheng");
			user.setTrueName("huxinsheng");
			user.setSex(GenderCST.Female);
			user.setCreateTime(new Date());
			user.setPassword("huxinshen");
			logger.info("开始添加测试用户"+user.getId());
			userService.insertSimpleUser(user);

			User user2;
			user2 = userService.selectSimpleUserByPrimaryKey(userID);
			assertEquals(user2.getId(), user.getId());
			userService.deleteSimpleUserByPrimaryKey(userID);

		}

		user = userService.selectSimpleUserByPrimaryKey(TestConstant.testUserID);
		assert(user != null);

	}

//	@Test
//	public void test() {
//		fail("Not yet implemented");
//	}

}
