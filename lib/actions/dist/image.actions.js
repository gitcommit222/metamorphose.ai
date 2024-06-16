"use server";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getAllImages = exports.getImageById = exports.deleteImage = exports.updateImage = exports.addImage = void 0;
var cache_1 = require("next/cache");
var mongoose_1 = require("../database/mongoose");
var utils_1 = require("../utils");
var user_model_1 = require("../database/models/user.model");
var image_model_1 = require("../database/models/image.model");
var navigation_1 = require("next/navigation");
var cloudinary_1 = require("cloudinary");
var populateUser = function (query) {
    return query.populate({
        path: "author",
        model: "User",
        select: "_id firstname lastname clerkId"
    });
};
// ADD IMAGE
function addImage(_a) {
    var image = _a.image, userId = _a.userId, path = _a.path;
    return __awaiter(this, void 0, void 0, function () {
        var author, newImage, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, user_model_1["default"].findById(userId)];
                case 2:
                    author = _b.sent();
                    if (!author) {
                        throw new Error("User not found");
                    }
                    return [4 /*yield*/, image_model_1["default"].create(__assign(__assign({}, image), { author: author._id }))];
                case 3:
                    newImage = _b.sent();
                    cache_1.revalidatePath(path);
                    return [2 /*return*/, JSON.parse(JSON.stringify(newImage))];
                case 4:
                    error_1 = _b.sent();
                    utils_1.handleError(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addImage = addImage;
// UPDATE IMAGE
function updateImage(_a) {
    var image = _a.image, userId = _a.userId, path = _a.path;
    return __awaiter(this, void 0, void 0, function () {
        var imageToUpdate, updatedImage, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, image_model_1["default"].findById(image._id)];
                case 2:
                    imageToUpdate = _b.sent();
                    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
                        throw new Error("Unauthorized or image not found");
                    }
                    return [4 /*yield*/, image_model_1["default"].findByIdAndUpdate(imageToUpdate._id, image, { "new": true })];
                case 3:
                    updatedImage = _b.sent();
                    cache_1.revalidatePath(path);
                    return [2 /*return*/, JSON.parse(JSON.stringify(updatedImage))];
                case 4:
                    error_2 = _b.sent();
                    utils_1.handleError(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateImage = updateImage;
// DELETE IMAGE
function deleteImage(imageId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, image_model_1["default"].findByIdAndDelete(imageId)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    utils_1.handleError(error_3);
                    return [3 /*break*/, 5];
                case 4:
                    navigation_1.redirect("/");
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.deleteImage = deleteImage;
// GET IMAGE
function getImageById(imageId) {
    return __awaiter(this, void 0, void 0, function () {
        var image, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, populateUser(image_model_1["default"].findById(imageId))];
                case 2:
                    image = _a.sent();
                    if (!image) {
                        throw new Error("Image not found");
                    }
                    return [2 /*return*/, JSON.parse(JSON.stringify(image))];
                case 3:
                    error_4 = _a.sent();
                    utils_1.handleError(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getImageById = getImageById;
// GET ALL IMAGES
function getAllImages(_a) {
    var _b = _a.limit, limit = _b === void 0 ? 9 : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, _d = _a.searchQuery, searchQuery = _d === void 0 ? "" : _d;
    return __awaiter(this, void 0, void 0, function () {
        var expression, resources, resourceIds, query, skipAmount, images, totalImages, savedImages, error_5;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, mongoose_1.connectToDatabase()];
                case 1:
                    _e.sent();
                    cloudinary_1.v2.config({
                        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                        secure: true
                    });
                    expression = "folder=metamorphose.ai";
                    if (searchQuery) {
                        expression += " AND " + searchQuery;
                    }
                    return [4 /*yield*/, cloudinary_1.v2.search
                            .expression(expression)
                            .execute()];
                case 2:
                    resources = (_e.sent()).resources;
                    resourceIds = resources.map(function (resource) { return resource.public_id; });
                    query = {};
                    if (searchQuery) {
                        query = {
                            publicId: {
                                $in: resourceIds
                            }
                        };
                    }
                    skipAmount = (Number(page) - 1) * limit;
                    return [4 /*yield*/, populateUser(image_model_1["default"].find(query))
                            .sort({
                            updatedAt: -1
                        })
                            .skip(skipAmount)
                            .limit(limit)];
                case 3:
                    images = _e.sent();
                    return [4 /*yield*/, image_model_1["default"].find(query).countDocuments()];
                case 4:
                    totalImages = _e.sent();
                    return [4 /*yield*/, image_model_1["default"].find(query).countDocuments()];
                case 5:
                    savedImages = _e.sent();
                    return [2 /*return*/, {
                            data: JSON.parse(JSON.stringify(images)),
                            totalPage: Math.ceil(totalImages / limit),
                            savedImages: savedImages
                        }];
                case 6:
                    error_5 = _e.sent();
                    utils_1.handleError(error_5);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getAllImages = getAllImages;
