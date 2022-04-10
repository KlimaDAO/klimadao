type getPledgeParams = { address: string };

export const getPledge = (params: getPledgeParams) =>
  fetch(`http://localhost:3000/api/pledge?address=${params.address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
