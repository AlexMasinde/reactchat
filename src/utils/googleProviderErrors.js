export default function googleProviderErrors(err, errors, captureException) {
  switch (err.code) {
    case "auth/cancelled-popup-request":
      return {
        ...errors,
        auth: "Request Already Sent",
      };
    case "auth/popup-blocked":
      return {
        ...errors,
        auth: "Popup blocked by browser",
      };
    case "auth/popup-closed-by-user":
      return {
        ...errors,
        auth: "Popup closed by user",
      };
    case "auth/user-mismatch":
      return {
        ...errors,
        auth: "Wrong user selected",
      };
    default:
      captureException(err);
      return {
        ...errors,
        auth: "Unknown Error! Try again",
      };
  }
}
