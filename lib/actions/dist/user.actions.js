"use server";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateCredits = exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = void 0;
var cache_1 = require("next/cache");
var user_model_1 = require("../database/models/user.model");
var mongoose_1 = require("../database/mongoose");
var utils_1 = require("../utils");
// CREATE
function createUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var newUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user_model_1["default"].create(user)];
                case 2:
                    newUser = _a.sent();
                    return [2 /*return*/, JSON.parse(JSON.stringify(newUser))];
                case 3:
                    error_1 = _a.sent();
                    utils_1.handleError(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
// READ
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user_model_1["default"].findOne({ clerkId: userId })];
                case 2:
                    user = _a.sent();
                    if (!user)
                        throw new Error("User not found");
                    return [2 /*return*/, JSON.parse(JSON.stringify(user))];
                case 3:
                    error_2 = _a.sent();
                    utils_1.handleError(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getUserById = getUserById;
// UPDATE
function updateUser(clerkId, user) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedUser, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user_model_1["default"].findOneAndUpdate({ clerkId: clerkId }, user, {
                            "new": true
                        })];
                case 2:
                    updatedUser = _a.sent();
                    if (!updatedUser)
                        throw new Error("User update failed");
                    return [2 /*return*/, JSON.parse(JSON.stringify(updatedUser))];
                case 3:
                    error_3 = _a.sent();
                    utils_1.handleError(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
// DELETE
function deleteUser(clerkId) {
    return __awaiter(this, void 0, void 0, function () {
        var userToDelete, deletedUser, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user_model_1["default"].findOne({ clerkId: clerkId })];
                case 2:
                    userToDelete = _a.sent();
                    if (!userToDelete) {
                        throw new Error("User not found");
                    }
                    return [4 /*yield*/, user_model_1["default"].findByIdAndDelete(userToDelete._id)];
                case 3:
                    deletedUser = _a.sent();
                    cache_1.revalidatePath("/");
                    return [2 /*return*/, deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null];
                case 4:
                    error_4 = _a.sent();
                    utils_1.handleError(error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.deleteUser = deleteUser;
// USE CREDITS
function updateCredits(userId, creditFee) {
    return __awaiter(this, void 0, void 0, function () {
        var updatedUserCredits, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user_model_1["default"].findOneAndUpdate({ _id: userId }, { $inc: { creditBalance: creditFee } }, { "new": true })];
                case 2:
                    updatedUserCredits = _a.sent();
                    if (!updatedUserCredits)
                        throw new Error("User credits update failed");
                    return [2 /*return*/, JSON.parse(JSON.stringify(updatedUserCredits))];
                case 3:
                    error_5 = _a.sent();
                    utils_1.handleError(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateCredits = updateCredits;
