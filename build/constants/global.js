"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = exports.MediaType = exports.FOLLOWINGSTATUS = exports.Status = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));
var Status;
(function (Status) {
    Status["blocked"] = "blocked";
    Status["accepted"] = "accepted";
    Status["pending"] = "pending";
})(Status || (exports.Status = Status = {}));
var FOLLOWINGSTATUS;
(function (FOLLOWINGSTATUS) {
    FOLLOWINGSTATUS["FOLLOWING"] = "FOLLOWING";
    FOLLOWINGSTATUS["REQUESTED"] = "REQUESTED";
    FOLLOWINGSTATUS["NOTCONNECTED"] = "NOTCONNECTED";
})(FOLLOWINGSTATUS || (exports.FOLLOWINGSTATUS = FOLLOWINGSTATUS = {}));
var MediaType;
(function (MediaType) {
    MediaType["PROFILE_IMAGE"] = "PROFILE_IMAGE";
    MediaType["ARTICLE_IMAGE"] = "ARTICLE_IMAGE";
})(MediaType || (exports.MediaType = MediaType = {}));
var Environment;
(function (Environment) {
    Environment["DEVELOPMENT"] = "DEVELOPMENT";
    Environment["PRODUCTION"] = "PRODUCTION";
    Environment["TEST"] = "TEST";
})(Environment || (exports.Environment = Environment = {}));
