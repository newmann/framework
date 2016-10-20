package com.beiyelin.app.api;

/**
 * Created by xinsheng.hu on 2016/10/8.
 */
public class LoginForm {
    private String userName;
    private String password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String toString(){
        return "userName:" + userName + "  password:" + password;
    }
}
