const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');

const PACKAGE_JSON = path.join(__dirname, '..', 'package.json');

function serverStatus() {
  const memory = process.memoryUsage();
  return {
    node: process.version,
    platform: `${os.platform()} / ${os.arch()}`,
    hostname: os.hostname(),
    uptime: Math.round(process.uptime()),
    cpu: os.cpus().length,
    memory: Math.round(memory.rss / 1024 / 1024),
    freeMemory: Math.round(os.freemem() / 1024 / 1024),
    pid: process.pid,
    now: new Date().toISOString()
  };
}

function runNodeProbe() {
  return new Promise((resolve, reject) => {
    execFile(process.execPath, ['-e', 'console.log(JSON.stringify({ childProcess: true, value: 6 * 7 }))'], (error, stdout) => {
      if (error) return reject(error);
      resolve(JSON.parse(stdout));
    });
  });
}

async function nodePowers() {
  const child = await runNodeProbe();
  return {
    fileSystem: { file: path.basename(PACKAGE_JSON), bytes: fs.statSync(PACKAGE_JSON).size, readable: fs.accessSync(PACKAGE_JSON, fs.constants.R_OK) === undefined },
    childProcess: child,
    environment: { nodeEnv: process.env.NODE_ENV || 'development', cwd: process.cwd() }
  };
}

module.exports = { serverStatus, runNodeProbe, nodePowers };
