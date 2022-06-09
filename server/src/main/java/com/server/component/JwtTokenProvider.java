package com.server.component;

import com.server.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtTokenProvider implements Serializable {

    private static final String PREFIX = "Bearer ";

    public long JWT_TOKEN_VALIDITY =  3600;

    @Value("${jwt.secret}")
    private String JWT_SECRET;

    public String generateJwtToken(User user) {
        return Jwts.builder()
                .setSubject(Integer.toString(user.getId()))
                .claim("email", user.getEmail())
                .claim("name", user.getFirstName() + " " + user.getLastName())
                .claim("expiresIn", 100000)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    protected Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(JWT_SECRET)
                .parseClaimsJws(token).getBody();
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // retrieve username from jwt token
    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // check if header of the request contains a jwt token
    public boolean checkJWTToken(String header) {
        return header != null && header.startsWith(PREFIX);
    }

    // get the token from the string
    public String getToken(String header) {
        return header.replace(PREFIX, "");
    }

    // retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    // check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    // validate if token is still valid
    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

}
