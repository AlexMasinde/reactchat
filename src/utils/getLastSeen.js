export default function getLastSeen(rawDate) {
  const transformedDate = new Date(rawDate);
  const timeOptions = { hour: "numeric", minute: "numeric" };

  const diff = new Date() - new Date(rawDate);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let lastSeen;

  if (days < 1) {
    const time = transformedDate.toLocaleTimeString("en-Uk", timeOptions);
    lastSeen = `Today at ${time}`;
  }

  if (days > 1 && days < 7) {
    const dateOptions = { weekday: "long" };
    const day = transformedDate.toLocaleDateString("en-Uk", dateOptions);
    const time = transformedDate.toLocaleTimeString("en-Uk", timeOptions);
    lastSeen = `${day} at ${time}`;
  }

  if (days > 7 && days < 365) {
    const dateOptions = { month: "short", day: "numeric" };
    const day = transformedDate.toLocaleDateString("en-Uk", dateOptions);
    const time = transformedDate.toLocaleTimeString("en-Uk", timeOptions);
    lastSeen = `${day} at ${time}`;
  }

  if (days > 365) {
    const dateOptions = { month: "short", day: "numeric", year: "numeric" };
    const day = transformedDate.toLocaleDateString("en-Uk", dateOptions);
    lastSeen = `${day}`;
  }

  return lastSeen;
}
