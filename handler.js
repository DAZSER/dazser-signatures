"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const retrieveUsers_1 = __importDefault(require("./retrieveUsers"));
const mergeTemplate_1 = __importDefault(require("./mergeTemplate"));
const uploadTemplates_1 = __importDefault(require("./uploadTemplates"));
exports.runner = async () => {
    const users = await retrieveUsers_1.default();
    const templates = [];
    for (const user of users) {
        const item = mergeTemplate_1.default(user);
        templates.push(item);
    }
    const results = [];
    for (const template of templates) {
        results.push(await uploadTemplates_1.default(template));
    }
    return {
        results
    };
};
