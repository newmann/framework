package com.beiyelin.service.footstone.constant;

import io.jsonwebtoken.SignatureAlgorithm;

/**
 * 关于安全类的常量
 * Created by xinsheng.hu on 2016/10/2.
 */
public class SecureCST {
    public static final String REQUEST_TOKEN = "token";
    public static final String REQUEST_USER = "userID";
    public final static String TOKEN_ISSURE = "beiyelin";
    public final static String SHARE_KEY = "SEseinasldfaeindgad212234092+@#ccsd";
    public final  static SignatureAlgorithm SIGNATURE_ALGORITHM= SignatureAlgorithm.HS256;
}
