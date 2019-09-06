import query from "./database.mysql";

export default async function() {

  const sql = `SELECT e.FirstName, e.LastName, t.EmployeeType, e.AddressPhone, e.g_suite_user,
  e.email_address, IF(t.EmployeeTypeID = 1,"Jani-King",b.CompanyName) AS CompanyName,
  CONCAT_WS(", ",b.AddressLine1, b.AddressLine2) AS AddressLine1,
  CONCAT(b.AddressCity,", ",b.AddressState,"  ",b.AddressZip) AS AddressLine2,
  CONCAT("Office ",b.PhoneNumber) AS CompanyPhone, b.SCHEMA_NAME AS Company
FROM gen_employee e
LEFT OUTER JOIN gen_employeetypes t
  ON e.EmployeeType_fk = t.EmployeeTypeID
LEFT OUTER JOIN gen_branchdata b
  ON e.BranchID_fk = b.CompanyID
WHERE inactive = 0 AND e.g_suite_user IS NOT NULL`;

  return query(sql);

}
