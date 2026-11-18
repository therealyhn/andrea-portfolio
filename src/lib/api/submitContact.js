const ENDPOINT = "/api/contact.php";

function contactError(message, code) {
  return Object.assign(new Error(message), { code });
}

/*
  Sends the contact form to the PHP endpoint on this domain (PHPMailer, maestro-cms plan kontakt-forma). `website` is
  the honeypot: the server answers success without sending when it is filled. Throws { message, code } when the
  network fails, the response is not ok or the server does not confirm success.
*/
export async function submitContact(values) {
  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
        website: values.website,
      }),
    });
  } catch {
    throw contactError("The message could not reach the server.", "NETWORK");
  }

  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    throw contactError(result?.error || "The message was not accepted.", response.status);
  }
  return result;
}
