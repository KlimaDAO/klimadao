import { urls } from "lib/constants";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  quantity: number;
  email: string;
  phone_number?: string;
  company_name: string;
  job_title?: string;
  first_name: string;
  last_name: string;
  beneficiary_name?: string;
  beneficiary_address?: string;
  project_name: string;
  retirement_message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    quantity,
    email,
    phone_number,
    company_name,
    job_title,
    first_name,
    last_name,
    beneficiary_name,
    beneficiary_address,
    project_name,
    retirement_message = "",
  } = req.body as RequestBody;

  try {
    const response = await fetch(urls.payViaBankForm, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          {
            name: "retirement_amount",
            objectTypeId: "0-1",
            value: quantity,
          },
          {
            name: "email",
            objectTypeId: "0-1",
            value: email,
          },
          {
            name: "phone",
            objectTypeId: "0-1",
            value: phone_number,
          },
          {
            name: "company",
            objectTypeId: "0-1",
            value: company_name,
          },
          {
            name: "jobtitle",
            objectTypeId: "0-1",
            value: job_title,
          },
          {
            name: "firstname",
            objectTypeId: "0-1",
            value: first_name,
          },
          {
            name: "lastname",
            objectTypeId: "0-1",
            value: last_name,
          },
          {
            name: "who_will_this_retirement_be_credited_to_",
            objectTypeId: "0-1",
            value: beneficiary_name,
          },
          {
            name: "beneficiary_wallet_address",
            objectTypeId: "0-1",
            value: beneficiary_address,
          },
          {
            name: "project_names___volumes_of_interest",
            objectTypeId: "0-1",
            value: project_name,
          },
          {
            name: "retirement_message",
            objectTypeId: "0-1",
            value: retirement_message,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).send(
        JSON.stringify({
          status: "error",
          message: "Something went wrong",
        })
      );
    }

    return res.status(200).send(
      JSON.stringify({
        status: "ok",
        message: data.inlineMessage,
      })
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to submit bank details");
  }
}
