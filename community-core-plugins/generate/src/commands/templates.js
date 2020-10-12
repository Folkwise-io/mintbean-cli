import fs from 'fs-extra'
import path from 'path'
import { newProject } from "../handlers/index";

const TEMPLATE_CHOICES = fs.readdirSync(path.resolve(__dirname, "../../templates"));

const commandCreator = (templateName) => {
    return {
      command: `mint generate ${templateName} [projectName]`,
      description: `This command will generate a new ${templateName} project. If a project name is not given one will be generated for you`,
      handler: (argv) => newProject(argv, templateName),
    };
}


export default [...TEMPLATE_CHOICES.map(commandCreator)]
