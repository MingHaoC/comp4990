package com.server.constant;

public class Route {

    // User endpoints
    public static final String USER = "/user";
    public static final String REGISTER = "/register";
    public static final String LOGIN = "/login";
    public static final String EDIT = "/edit";
    public static final String EDIT_NAME = "/name";
    public static final String EDIT_ADDRESS = EDIT +"/address";
    public static final String EDIT_PHONE_NUMBER = EDIT + "/phonenumber";
    public static final String REGISTER_EXPO_TOKEN = REGISTER + "/expoToken";

    // Event endpoints
    public static final String EVENT = "/event";
    public static final String EVENT_LIST = "/list";
    public static final String NEW_EVENT = "/register";
    public static final String CANCEL_EVENT = "/cancel";

    // admin endpoint
    public static final String ADMIN = "/admin";
    public static final String HEALTH = "/health";
    public static final String TEST = "/test";
}
