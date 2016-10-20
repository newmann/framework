package com.beiyelin.service.footstone.secure.realm;

/**
 * Created by xinsheng.hu on 2016/10/13.
 */
public class StatelessTokenResponse {
    private String userID;
    private String token;
    public  StatelessTokenResponse(){

    }

    public StatelessTokenResponse(String userID,String token){
        this.userID = userID;
        this.token = token;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
