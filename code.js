function cellCompete(states, days) {
  // WRITE YOUR CODE HERE
  // loop over each day
  let result = [];

  for (let i = 0; i < days; i++) {
    for (let j = 0; j < states.length; j++) {
      var prev = states[j - 1] || 0;
      var next = states[j + 1] || 0;

      if (prev === next) {
        result[j] = 0;
      } else {
        result[j] = 1;
      }
    }
    states = result;
  }

  return result;
}
const states = [1, 1, 1, 0, 1, 1, 1, 1];
console.log(cellCompete(states, 2));
