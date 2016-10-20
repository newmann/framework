package com.beiyelin.service.footstone.secure.realm;

import org.apache.shiro.authc.AuthenticationToken;

/**
 * token 为jwt生成
 *
 */

public class StatelessToken implements AuthenticationToken{

	private String userID;//登录用户id
	private String token;

	public StatelessToken(String userID,String token){
		this.userID = userID;
		this.token = token;
	}

	@Override
	public Object getPrincipal() {
		return getUserID();
	}

	@Override
	public Object getCredentials() {
		return getToken();
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}
}


