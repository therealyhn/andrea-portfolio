const ENDPOINT = "https://api.web3forms.com/submit";

function contactError(message, code) {
  return Object.assign(new Error(message), { code });
}

/*
  Sends the contact form through Web3Forms (O05). Throws { message, code } when the key is missing (no request),
  the network fails, the response is not ok or Web3Forms does not confirm success.
*/
export async function submitContact(values) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!accessKey) throw contactError("The contact form is not configured.", "NO_KEY");

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      }),
    });
  } catch {
    throw contactError("The message could not reach the server.", "NETWORK");
  }

  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    throw contactError(result?.message || "The message was not accepted.", response.status);
  }
  return result;
}
