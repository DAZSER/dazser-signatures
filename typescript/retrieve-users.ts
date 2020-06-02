import mysql from "./database.mysql2";

export interface User {
  AddressLine1: string;
  AddressLine2: string;
  AddressPhone?: string;
  Company: string;
  CompanyName: string;
  CompanyPhone: string;
  EmployeeType: string;
  emailAddress: string;
  employeeName: string;
  // eslint-disable-next-line camelcase
  g_suite_user: string;
}

export default async (): Promise<User[]> => {
  const sql = `SELECT e.g_suite_user, CONCAT_WS(" ",e.FirstName, e.LastName) AS employeeName, t.EmployeeType,
  IF(e.AddressPhone <> "",REGEXP_REPLACE(e.AddressPhone, "[\\]\\\\[!@#$%.&*\`~^_{}:;<>/\\\\|()-]+",""),NULL) AS AddressPhone,
  e.email_address as emailAddress, IF(t.EmployeeTypeID = 1,"Jani-King",b.CompanyName) AS CompanyName,
  CONCAT_WS(", ",b.AddressLine1, b.AddressLine2) AS AddressLine1,
  CONCAT(b.AddressCity,", ",b.AddressState,"  ",b.AddressZip) AS AddressLine2,
  b.PhoneNumber AS CompanyPhone, b.SCHEMA_NAME AS Company
  FROM gen_employee e
  LEFT OUTER JOIN gen_employeetypes t
    ON e.EmployeeType_fk = t.EmployeeTypeID
  LEFT OUTER JOIN gen_branchdata b
    ON e.BranchID_fk = b.CompanyID
  WHERE inactive = 0 AND e.g_suite_user IS NOT NULL`;

  const results = await mysql.query(sql);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return results[0] as User[];
};
