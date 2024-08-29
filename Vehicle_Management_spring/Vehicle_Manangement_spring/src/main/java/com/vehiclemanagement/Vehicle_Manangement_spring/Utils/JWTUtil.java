package com.vehiclemanagement.Vehicle_Manangement_spring.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTUtil {

    private final String base64SecretKey = "aGVsbG9fYmFzZTY0X3NlY3JldF9rZXk=";

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 *24;


    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Updated to match AuthController
    public String generateToken(Map<String, Object> extraClaims,UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims) // Add custom claims here if needed
                .setSubject(userDetails.getUsername()) // Set the subject (usually the username or user ID)
                .setIssuedAt(new Date()) // Set the issued date
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 *60 * 24)) // Set expiration date
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Sign the token
                .compact(); // Build and return the token
    }

    private String generateTokenWithClaims(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims) // Add custom claims here if needed
                .setSubject(userDetails.getUsername()) // Set the subject (usually the username or user ID)
                .setIssuedAt(new Date()) // Set the issued date
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 *60 * 24 )) // Set expiration date
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Sign the token
                .compact(); // Build and return the token
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(base64SecretKey);
        return key; //Keys.secretKeyFor(SignatureAlgorithm.HS256);
        //return Keys.hmacShaKeyFor(keyBytes);
    }
}
