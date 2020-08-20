const ACCELERATION = 10;
const MAX_SPEED = 300;

export function decelerate(oldValue) {
  const polarity = Math.sign(oldValue);

  if (polarity === 0) {
    // value was 0
    return 0;
  } else {
    let newVal = (Math.abs(oldValue) - ACCELERATION);
    if (newVal < 0) newVal = 0;
    return polarity * newVal;
  }
}

export function accelerate(oldValue, direction) {
  const newValue = oldValue + (direction * ACCELERATION);
  const limitFunc = direction < 0 ? Math.min : Math.min;
  return limitFunc(newValue, MAX_SPEED);
}