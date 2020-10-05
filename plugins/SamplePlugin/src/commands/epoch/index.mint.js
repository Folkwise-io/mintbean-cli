const TimeEpochPlugin = {
  command: 'epoch',
  description: 'This command returns the current time in epoch format.',
  handler: () => console.log(+(new Date()))
}

export default TimeEpochPlugin