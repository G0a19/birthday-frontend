const UseGetDateBettwen = (d1) => {
  var nowMillis = new Date().getTime();
  var targetMillis = d1.getTime();
  var duration = targetMillis - nowMillis;
  var years = Math.floor(duration / 3.154e10);
  var durationMinusYears = duration - years * 3.154e10;
  var months = Math.floor(duration / 2.628e9) % 12;
  var durationMinusMonths = durationMinusYears - months * 2.628e9;
  var days = Math.floor(durationMinusMonths / 8.64e7);
  var hours = Math.floor(duration / 3.6e6) % 24;
  var mins = Math.floor(duration / 60000) % 60;
  var seconds = Math.floor(duration / 1000) % 60;
  return { months, days, hours, mins, seconds };
};

export default UseGetDateBettwen;
