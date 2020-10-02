const TimeEpochPlugin = {
  command: 'mint time epoch',
  description: 'This command returns the current time in epoch format.',
  callback: () => console.log(+(new Date()))
}

export default TimeEpochPlugin