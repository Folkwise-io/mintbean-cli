import moment from "moment"

const TimeFormattedPlugin = {
    command: 'mint time [format]',
    description: 'This command returns the current time in the format provided.',
    callback: (argv) => {
      console.log(moment().format(argv.format))
    }
}

export default TimeFormattedPlugin