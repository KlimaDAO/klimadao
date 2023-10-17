import { DateField, DateFieldParam, Status } from "./types";

export interface DateFieldMapperItem {
  field: DateField;
  fieldLt: DateFieldParam;
  fieldGt: DateFieldParam;
}
const dateFieldMapper = {
  bridged: {
    field: "bridged_date",
    fieldLt: "bridged_date_lt",
    fieldGt: "bridged_date_gt",
  },
  retired: {
    field: "retirement_date",
    fieldLt: "retirement_date_lt",
    fieldGt: "retirement_date_gt",
  },
  all_retired: {
    field: "retirement_date",
    fieldLt: "retirement_date_lt",
    fieldGt: "retirement_date_gt",
  },
  deposited: {
    field: "deposited_date",
    fieldLt: "deposited_date_lt",
    fieldGt: "deposited_date_gt",
  },
  issued: {
    field: "issuance_date",
    fieldLt: "issuance_date_lt",
    fieldGt: "issuance_date_gt",
  },
  redeemed: {
    field: "redeemed_date",
    fieldLt: "redeemed_date_lt",
    fieldGt: "redeemed_date_gt",
  },
} as Record<Status, DateFieldMapperItem>;

export function statusToDateField(status: Status): DateField {
  return dateFieldMapper[status].field;
}
export function statusToDateFieldLt(status: Status): DateFieldParam {
  return dateFieldMapper[status].fieldLt;
}
export function statusToDateFieldGt(status: Status): DateFieldParam {
  return dateFieldMapper[status].fieldGt;
}
