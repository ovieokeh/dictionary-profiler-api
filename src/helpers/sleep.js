// This is only used to simulate a slow render. Do NOT use in real-world code
export default function sleep( sleepDuration ){
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
