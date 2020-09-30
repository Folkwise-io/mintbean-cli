import jsonfile from 'jsonfile';
import { Arguments } from 'yargs';
import { MintCommand } from '../../types';

const add: MintCommand = {
  command: 'add [jobName]',
  description: 'Add a job to tracker',
  commands: [],
  options: {},
  callback: (argv: Arguments<unknown>) => {
    console.log('ran');

    jsonfile.readFile(
      '/Users/kyle/Mint_Bean_Work/mintbean-cli/core/test/testData.json',
      (err, obj) => {
        const job = {
          jobId: obj.jobs.length,
          jobName: argv.jobName,
          status: 'pending',
        };
        if (err) console.error(err);
        obj.jobs.push(job);
        jsonfile.writeFile(
          '/Users/kyle/Mint_Bean_Work/mintbean-cli/core/test/testData.json',
          obj,
          err => {
            if (err) console.error(err);
            console.log('Job Logged', job);
          }
        );
      }
    );
  },
};

const samplePlugin: MintCommand = {
  command: 'job',
  description: 'Access Job subcommands',
  commands: [add],
  options: {},
};

export default samplePlugin
