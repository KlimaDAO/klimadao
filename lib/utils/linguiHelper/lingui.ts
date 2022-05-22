// Wrapper around lingui command that exits with a non zero value if an error is detected
import * as child from "child_process";

const args: string[] = process.argv.splice(2);
const command = `NODE_ENV=test npx lingui ${args.join(" ")}`;
child.exec(command, (error, stdout, stderr) => {
  if (error) {
    // Handle exec command error (lingui command not found?)
    console.log(`error: ${error}`);
    throw error;
  }
  if (stderr) {
    // Display command standard error
    console.log(`stderr: ${stderr}`);
    // This signals that something wrong happened during the command (BEWARE OF CHANGES IN LINGUI OUTPUT)
    if (stderr.includes("Cannot process file")) {
      process.exit(1);
    }
    return;
  }
  // Display command standard output
  console.log(`stdout: ${stdout}`);
  process.exit(0);
});
