package com.beiyelin.service.footstone.secure.realm;

import com.beiyelin.service.footstone.constant.SecureCST;
import io.jsonwebtoken.*;

import java.text.ParseException;
import java.util.Date;

/**
 * Created by xinsheng.hu on 2016/10/13.
 */
public class StatelessTokenUtils {

    public String createToken(String userID){
        return Jwts.builder()
                .setSubject(userID)
                .setIssuer(SecureCST.TOKEN_ISSURE)
                .setIssuedAt(new Date())
                .signWith(SecureCST.SIGNATURE_ALGORITHM,SecureCST.SHARE_KEY)
                .compact();
    }

    public boolean validateToken(String token){
        try{
            Jws<Claims> claims = Jwts.parser()
                    .requireIssuer(SecureCST.TOKEN_ISSURE)
                    .setSigningKey(SecureCST.SHARE_KEY)
                    .parseClaimsJws(token);

        }catch (MissingClaimException  ex){
            return  false;
        }catch (Exception ex){
            return  false;
        }
        return true;
    }
}
