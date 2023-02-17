const VerifyWeekend = (date: string) => {
  const auxDate = date.split('-');
  const auxYear = auxDate[0] as unknown as number;
  const auxMonth = auxDate[1] as unknown as number;
  const auxDay = auxDate[2] as unknown as number;

  var auxThisDayIsWeekend = new Date(auxYear, auxMonth - 1, auxDay); // -1 because months are 0 indexed

  var thisDayIsWeekend: boolean =
    auxThisDayIsWeekend.getDay() === 0 || auxThisDayIsWeekend.getDay() === 6;

  if (thisDayIsWeekend) {
    return true;
  }
  return false;
};
export default VerifyWeekend;
