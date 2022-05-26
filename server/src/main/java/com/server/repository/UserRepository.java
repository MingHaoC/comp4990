package com.server.repository;

import com.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>  {

    Optional<User> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.address = :address WHERE u.id = :userId")
    void updateAddress(@Param("address") String address, @Param("userId") Integer userId);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.firstName = :firstName, u.lastName = :lastName WHERE u.id = :userId")
    void updateName(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("userId") Integer userId);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.phoneNumber = :phoneNumber WHERE u.id = :userId")
    void updatePhoneNumber(@Param("phoneNumber") String phoneNumber, @Param("userId") Integer userId);

}
