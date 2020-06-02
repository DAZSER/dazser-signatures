/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import retrieveUsers from "./retrieve-users";
import mergeTemplate from "./merge-template";
import uploadTemplates from "./upload-templates";

export default async () => {
  // First, I need to pull those users' information from the web app
  // I should use api.dazser.com/v1/employees
  const users = await retrieveUsers();

  // Now, I need to generate html templates based on that information
  const templates = [];
  for (const user of users) {
    const item = mergeTemplate(user);
    templates.push(item);

    // We can also update names here.
  }

  // Finally, I need to update those users back on G Suite
  const results = [];
  for (const template of templates) {
    results.push(await uploadTemplates(template));
  }

  await Promise.all(results).catch((error) => {
    console.error(error);
  });

  return {
    results,
  };
};
