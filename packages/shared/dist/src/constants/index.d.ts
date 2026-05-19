export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare const PERMISSIONS: {
    readonly BLOCKS: {
        readonly READ: "blocks:read";
        readonly CREATE: "blocks:create";
        readonly UPDATE: "blocks:update";
        readonly DELETE: "blocks:delete";
    };
    readonly CONTACT: {
        readonly READ: "contact:read";
        readonly UPDATE: "contact:update";
        readonly DELETE: "contact:delete";
    };
    readonly MEDIA: {
        readonly READ: "media:read";
        readonly UPLOAD: "media:upload";
        readonly DELETE: "media:delete";
    };
    readonly SETTINGS: {
        readonly READ: "settings:read";
        readonly UPDATE: "settings:update";
    };
};
