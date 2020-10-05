import moment from "moment"

const TimeFormattedPlugin = {
    command: '* [format]',
    description: 'This command returns the current time in the format provided.',
    handler: (argv) => {
      console.log(moment().format(argv.format))
    }
}

export default TimeFormattedPlugin