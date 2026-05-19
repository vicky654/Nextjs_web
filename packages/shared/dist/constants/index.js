export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["USER"] = "USER";
})(UserRole || (UserRole = {}));
export const PERMISSIONS = {
    BLOCKS: {
        READ: "blocks:read",
        CREATE: "blocks:create",
        UPDATE: "blocks:update",
        DELETE: "blocks:delete",
    },
    CONTACT: {
        READ: "contact:read",
        UPDATE: "contact:update",
        DELETE: "contact:delete",
    },
    MEDIA: {
        READ: "media:read",
        UPLOAD: "media:upload",
        DELETE: "media:delete",
    },
    SETTINGS: {
        READ: "settings:read",
        UPDATE: "settings:update",
    },
};
//# sourceMappingURL=index.js.map