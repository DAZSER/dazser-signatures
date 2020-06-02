"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const retrieve_users_1 = __importDefault(require("./retrieve-users"));
const merge_template_1 = __importDefault(require("./merge-template"));
const upload_templates_1 = __importDefault(require("./upload-templates"));
exports.default = async () => {
    const users = await retrieve_users_1.default();
    const templates = [];
    for (const user of users) {
        const item = merge_template_1.default(user);
        templates.push(item);
    }
    const results = [];
    for (const template of templates) {
        results.push(await upload_templates_1.default(template));
    }
    await Promise.all(results).catch((error) => {
        console.error(error);
    });
    return {
        results,
    };
};
