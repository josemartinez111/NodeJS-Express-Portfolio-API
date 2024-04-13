// FILE: common/loggers/host-address-logger.ts
// _____________________________________________________________________


// _____________________________________________________________________


import { logWithColor, spacer } from './custom-color-loggers';

export const formattedHostAddress = (port: number) => {
  // Check that the port number is type `number`
  const isNumberPort = `\n\n[ IS_THE_PORT_TYPE_OF_NUMBER ${port}? ]->: ${!!typeof port}\n\n`;
  // `!!(typeof port)` is the same as `typeof port ? true : false`
  logWithColor(isNumberPort, 'dodgerBlue', true);
  
  // Log the host and port the server is running on
  const runningOnPort = `Server is running on http://localhost:${port}`;
  const result = spacer(runningOnPort, 50);
  return result;
};
// _____________________________________________________________________