/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable camelcase */
import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { User } from "./retrieve-users";

export interface Template {
  template: string;
  user: string;
}

export default (user: User): Template => {
  // format the phone number
  if (user.AddressPhone) {
    const phone = parsePhoneNumberFromString(user.AddressPhone, "US");
    if (typeof phone !== "undefined") {
      // eslint-disable-next-line no-param-reassign
      user.AddressPhone = phone.formatNational();
    }
  }

  const companyPhone = parsePhoneNumberFromString(user.CompanyPhone, "US");
  if (typeof companyPhone !== "undefined") {
    // eslint-disable-next-line no-param-reassign
    user.CompanyPhone = `Office ${companyPhone.formatNational()}`;
  }

  return {
    template: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <style type="text/css">
    body {
      font-size: 10pt;
      font-family: Tahoma, sans-serif;
    }
  </style>
  <body>
    <div>
      <font face="tahoma, sans-serif">
        <span class="fName lName tahoma black"><b>${
          user.employeeName
        }&nbsp;|&nbsp;</b></span><span class="jobtitle tahoma black"><b>${
      user.EmployeeType
    }</b></span><br />
        <span class="office">${
          user.CompanyName === "DAZSER Management"
            ? "Jani-King | DAZSER Management"
            : user.CompanyName
        }</span><br />
        <span class="address1">${
          user.AddressLine1
        }</span>&nbsp;|&nbsp;<span class="address2">${
      user.AddressLine2
    }</span>&nbsp;|&nbsp;<span class="phone">${user.CompanyPhone}</span>${
      user.AddressPhone
        ? `&nbsp;|&nbsp;<span class='cell'>Cell ${user.AddressPhone}</span>`
        : ""
    }<br />
        <span class="email"><a href="mailto:${user.emailAddress}">${
      user.emailAddress
    }</a></span><br /><br />
      </font>
      <img src="https://d3bog92s18hu5m.cloudfront.net/email_${
        user.Company.charAt(0).toUpperCase() + user.Company.slice(1)
      }.png" />
    </div>
  </body>
</html>`,
    user: user.g_suite_user,
  };
};
