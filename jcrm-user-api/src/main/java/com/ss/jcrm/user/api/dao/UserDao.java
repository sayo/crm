package com.ss.jcrm.user.api.dao;

import com.ss.jcrm.user.api.Organization;
import com.ss.jcrm.user.api.User;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.concurrent.CompletableFuture;

public interface UserDao {

    @NotNull User create(
        @NotNull String name,
        @NotNull String password,
        @NotNull byte[] salt,
        @Nullable Organization organization
    );

    @NotNull CompletableFuture<@NotNull User> createAsync(
        @NotNull String name,
        @NotNull String password,
        @NotNull byte[] salt,
        @Nullable Organization organization
    );

    @Nullable User findByName(@NotNull String name);

    @NotNull CompletableFuture<@Nullable User> findByNameAsync(@NotNull String name);

    @Nullable User findById(long id);

    @NotNull CompletableFuture<@Nullable User> findByIdAsync(long id);

    @NotNull User requireById(long id);

    @NotNull CompletableFuture<@NotNull User> requireByIdAsync(long id);
}
