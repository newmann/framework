package com.beiyelin.service.footstone.model;

public class RoleUser {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the footstone column frroleuser.ID
     *
     * @mbg.generated Sun Sep 25 21:06:02 CST 2016
     */
    private String id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the footstone column frroleuser.UserID
     *
     * @mbg.generated Sun Sep 25 21:06:02 CST 2016
     */
    private String userid;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the footstone column frroleuser.RoleID
     *
     * @mbg.generated Sun Sep 25 21:06:02 CST 2016
     */
    private String roleid;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the footstone column frroleuser.ID
     *
     * @return the value of frroleuser.ID
     *
     * @mbg.generated Sun Sep 25 21:06:02 CST 2016
     */
    public String getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the footstone column frroleuser.ID
     *
     * @param id the value for frroleuser.ID
     *
     * @mbg.generated Sun Sep 25 21:06:02 CST 2016
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the footstone column frroleuser.UserID
     *
     * @return the value of frroleuser.UserID
     *
     * @mbg.generated Sun Sep 25 21:06:02 CST 2016
     */
    public String getUserid() {
        return userid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the footstone column frroleuser.UserID
     *
     * @param userid the value for frroleuser.UserID
     *
     * @mbg.generated Sun Sep 25 21:06:02 CST 2016
     */
    public void setUserid(String userid) {
        this.userid = userid == null ? null : userid.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the footstone column frroleuser.RoleID
     *
     * @return the value of frroleuser.RoleID
     *
     * @mbg.generated Sun Sep 25 21:06:02 CST 2016
     */
    public String getRoleid() {
        return roleid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the footstone column frroleuser.RoleID
     *
     * @param roleid the value for frroleuser.RoleID
     *
     * @mbg.generated Sun Sep 25 21:06:02 CST 2016
     */
    public void setRoleid(String roleid) {
        this.roleid = roleid == null ? null : roleid.trim();
    }
}