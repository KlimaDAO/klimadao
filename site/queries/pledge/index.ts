export const getPledge = (address: string) =>
  fetch(`http://localhost:3000/api/pledge?address=${address}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
