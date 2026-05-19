"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["USER"] = "USER";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.PERMISSIONS = {
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
