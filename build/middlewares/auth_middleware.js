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
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const authMiddleware = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = yield User.findById(decoded.id);
                next();
            }
        }
        catch (err) {
            return res.status(401).json({ message: 'Not Authorized token expired, Please Login again' });
        }
    }
    else {
        return res.status(401).json({ message: 'There is no token attached to header' });
    }
}));
const isAdmin = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const adminUser = yield User.findOne({ email: email });
    if (adminUser && adminUser.role === 'admin') {
        next();
    }
    else {
        return res.status(401).json({ message: 'User is not an admin' });
    }
}));
module.exports = { authMiddleware, isAdmin };
