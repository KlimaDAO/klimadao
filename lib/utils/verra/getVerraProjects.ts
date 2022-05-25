import { VerraProjectDetails } from "../../types/verra";

import { verra } from "../../constants";

export const getVerraProjectByID = async (
  id: string
): Promise<VerraProjectDetails> => {
  try {
    const result = await fetch(verra.projectSearch, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        program: "VCS",
        resourceIdentifier: id,
        resourceStatuses: [
          "VCS_EX_CRD_PRD_VER_REQUESTED",
          "VCS_EX_CRD_PRD_REQUESTED",
          "VCS_EX_REGISTERED",
          "VCS_EX_REG_VER_APPR_REQUESTED",
          "VCS_EX_REGISTRATION_REQUESTED",
          "VCS_EX_REJ",
          "VCS_EX_UNDER_DEVELOPMENT_CLD",
          "VCS_EX_UNDER_DEVELOPMENT_OPN",
          "VCS_EX_UNDER_VALIDATION_CLD",
          "VCS_EX_UNDER_VALIDATION_OPN",
          "VCS_EX_CRED_TRANS_FRM_OTHER_PROG",
          "VCS_EX_WITHDRAWN",
        ],
      }),
    });
    const json = await result.json();
    return json;
  } catch (e) {
    console.error("Failed to getVerraProjectByID", e);
    return Promise.reject(e);
  }
};
