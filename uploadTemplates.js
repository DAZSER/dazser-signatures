"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const gmail = googleapis_1.google.gmail("v1");
const privatekey = require("./dazser.net_api-project-827784375336-5d7e5980866b.json");
const SCOPES = ["https://www.googleapis.com/auth/gmail.settings.basic"];
async function default_1(template) {
    const jwt = new googleapis_1.google.auth.JWT(privatekey.client_email, undefined, privatekey.private_key, SCOPES, template.user);
    const options = {
        userId: 'me',
        auth: jwt,
        sendAsEmail: template.user,
        fields: 'signature',
        resource: {
            signature: template.template
        }
    };
    const results = await gmail.users.settings.sendAs.update(options);
    return {
        user: template.user,
        result: results.statusText
    };
}
exports.default = default_1;
