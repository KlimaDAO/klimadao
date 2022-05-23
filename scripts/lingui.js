// Wrapper around lingui command that exits with a non zero value if an error is detected
const { exec } = require("child_process");

const args = process.argv.splice(2);
const command = `NODE_ENV=test npx lingui ${args.join(" ")}`;

const handle_rollback_command = function (error, stdout, stderr) {
  if (error) {
    // Handle exec command error (git command not found?)
    console.log(`error: ${error}`);
    throw error;
  }
  // We rollbacked, that means failure
  process.exit(1);
};

const handle_lingui_command = function (error, stdout, stderr) {
  if (error) {
    // Handle exec command error (lingui command not found?)
    console.log(`error: ${error}`);
    throw error;
  }
  // Display command standard output
  console.log(`stdout: ${stdout}`);
  let has_errors = false;
  if (stderr) {
    // Display command standard error
    console.log(`stderr: ${stderr}`);
    // This signals that something wrong happened during the lingui command execution (BEWARE OF CHANGES IN LINGUI OUTPUT)
    if (stderr.includes("Cannot process file")) {
      // Rollback changes
      exec("git checkout locale", handle_rollback_command);
      has_errors = true;
    }
  }
  if (!has_errors) {
    process.exit(0);
  }
};
exec(command, handle_lingui_command);
