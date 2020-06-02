/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { google } from "googleapis";
import type { Template } from "./merge-template";

const gmail = google.gmail("v1");

const privatekey = require("../dazser.net_api-project-827784375336-5d7e5980866b.json");

const SCOPES = ["https://www.googleapis.com/auth/gmail.settings.basic"];

export default async (template: Template) => {
  const jwt = new google.auth.JWT(
    privatekey.client_email,
    undefined,
    privatekey.private_key,
    SCOPES,
    template.user
  );

  const options = {
    auth: jwt,
    fields: "signature",
    resource: {
      signature: template.template,
    },
    sendAsEmail: template.user,
    userId: "me",
  };

  const results = await gmail.users.settings.sendAs.update(options);

  return {
    result: results.statusText,
    user: template.user,
  };
};
