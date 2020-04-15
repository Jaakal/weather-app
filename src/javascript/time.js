const Time = (() => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInAMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const lastLeapYear = 2020;

  const getLocationTime = (offset) => {
    const date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let monthDay = date.getUTCDate();
    let weekDay = date.getUTCDay();
    let hours = date.getUTCHours() + Math.floor(offset / 3600);
    let minutes = date.getUTCMinutes() + ((offset / 60) % 60);

    if ((year - lastLeapYear) % 4 === 0) {
      daysInAMonth[1] = 29;
    }

    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    } else if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    } 
    
    if (hours >= 24) {
      hours -= 24;
      weekDay += 1;
    } else if (hours < 0) {
      hours += 24;
      weekDay -= 1;
    }

    if (weekDay >= 7) {
      weekDay -= 7;
      monthDay += 1;
    } else if (weekDay < 0) {
      weekDay += 7;
      monthDay -= 1;
    }
    
    if (monthDay > daysInAMonth[month]) {
      monthDay -= daysInAMonth[month];
      month += 1;
    } else if (monthDay < 0) {
      monthDay = daysInAMonth[month - 1];
      month -= 1;
    }

    if (month >= 12) {
      year += 1;
      month -= 12;
    } else if (month < 0) {
      year -= 1;
      month = 11;
    }

    return `${weekDays[weekDay]}, ${monthDay} ${months[month]} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  return { getLocationTime };
})();

export default Time;