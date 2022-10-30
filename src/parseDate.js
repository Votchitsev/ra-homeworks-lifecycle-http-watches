function parseDate(datetime) {
  const date = new Date(datetime);
  const hour = String(date.getHours()).length === 2 ? `${date.getHours()}` : `0${date.getHours()}`;
  const minutes = String(date.getMinutes()).length === 2 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  const seconds = String(date.getSeconds()).length === 2 ? `${date.getSeconds()}` : `0${date.getSeconds()}`;

  return `${hour}:${minutes}:${seconds}`;
}

export default parseDate;