export const getTodayDate = (e) => {
    var today = new Date();
    var currentMonth = today.getMonth() + 1;
    var currentHour = today.getHours();
    var currentMinute = today.getMinutes();
    var currentDate = today.getDate();
    if (currentMonth < 10) {
      currentMonth = "0" + currentMonth;
    }
    if (currentDate < 10) {
      currentDate = "0" + currentDate;
    }
    if (currentHour < 10) {
      currentHour = "0" + currentHour;
    }
    if (currentMinute < 10) {
      currentMinute = "0" + currentMinute;
    }
    var date = today.getFullYear() + "-" + currentMonth + "-" + currentDate;
    var time = currentHour + ":" + currentMinute;
    return date + "T" + time;
  }