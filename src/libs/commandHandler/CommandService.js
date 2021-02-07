class commandService{
  runCommand(command) {
    return command.run();
  }
}

module.exports = commandService;