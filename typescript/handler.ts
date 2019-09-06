import retrieveUsers from "./retrieveUsers";
import mergeTemplate from "./mergeTemplate";
import uploadTemplates from "./uploadTemplates";

export const runner = async () => {

  // First, I need to pull those users' information from the web app
  // I should use api.dazser.com/v1/employees
  const users: any = await retrieveUsers();

  // Now, I need to generate html templates based on that information
  const templates = [];
  for (const user of users) {
    const item = mergeTemplate(user);
    templates.push(item)

    // We can also update names here.

  }

  // Finally, I need to update those users back on G Suite
  const results = [];
  for (const template of templates) {
    results.push(await uploadTemplates(template));
  }

  return {
    results
  };
};
