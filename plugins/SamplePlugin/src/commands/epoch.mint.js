const TimeEpochPlugin = {
  command: 'mint time epoch',
  description: 'This command returns the current time in epoch format.',
  handler: () => console.log(+(new Date()))
}

export default TimeEpochPlugin