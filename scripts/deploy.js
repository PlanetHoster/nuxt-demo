import * as dotenv from "dotenv";
import { execSync } from 'child_process';

dotenv.config();

const USERNAME = process.env.USERNAME;
const IP = process.env.IP;
const PORT = process.env.PORT;
const APPLICATION_NAME = process.env.APPLICATION_NAME;
const NODE_VERSION = process.env.NODE_VERSION;
const DIRECTORY_PATH = process.env.DIRECTORY_PATH;
const STARTUP_FILE = process.env.STARTUP_FILE;

console.log('Deploying the project...🚀');
checkEnvironmentVariables();
console.log('Environment variables are set. ✅');
checkIfSSHAccess();
console.log('SSH key is added to the server. ✅');
checkIfApplicationExists();
console.log('Application exists on the server. ✅');
checkIfDirectoryExists();
console.log('Directory exists on the server. ✅');
buildProject();
console.log('Project is built. 👷');
removePackageJsonFromServerFolder();
console.log('package.json is removed from the build folder. 📁');
addStartupFile();
console.log('Startup file is added to the build folder. 📁');
rsyncBuildFolder();
console.log('Build folder is rsynced to the server. 🚚');
restartApplication();
console.log('Application is restarted. 🔄');

/**
 * Important: Environment variables must be set before deploying
 */
function checkEnvironmentVariables() {
    if (!USERNAME || !IP || !PORT || !APPLICATION_NAME || !NODE_VERSION || !DIRECTORY_PATH || !STARTUP_FILE) {
        const missingVariables = [];
        if (!USERNAME) missingVariables.push('USERNAME');
        if (!IP) missingVariables.push('IP');
        if (!PORT) missingVariables.push('PORT');
        if (!APPLICATION_NAME) missingVariables.push('APPLICATION_NAME');
        if (!NODE_VERSION) missingVariables.push('NODE_VERSION');
        if (!DIRECTORY_PATH) missingVariables.push('DIRECTORY_PATH');
        if (!STARTUP_FILE) missingVariables.push('STARTUP_FILE');
        console.error('Environment variables are not set. Please set the following environment variables: ', missingVariables.join(', '));
        process.exit(1);
    }
}

/**
 * Important: SSH key must be added to the server before deploying
 */
function checkIfSSHAccess() {
    try {
        execSync(`ssh -o BatchMode=yes -p ${PORT} ${USERNAME}@${IP} "exit"`);
    } catch (error) {
        console.error('SSH key is not added to the server. Please add the SSH key to the server. Refer to the Readme for more information.');
        process.exit(1);
    }
}

/**
 * Important: Application must be created on the server before deploying
 */
function checkIfApplicationExists() {
    const output = execSync(`ssh -p ${PORT} ${USERNAME}@${IP} "cloudlinux-selector get --json --interpreter nodejs --user ${USERNAME}"`).toString();

    const cloudlinuxSelectorResult = JSON.parse(output)
    const availableVersions = cloudlinuxSelectorResult["available_versions"];
    const availableVersionKeys = Object.keys(availableVersions);

    const version = availableVersionKeys.find((version) => version.startsWith(NODE_VERSION));

    const userApplications = availableVersions[version]["users"][USERNAME]["applications"];
    const userApplicationKeys = Object.keys(userApplications);

    if (!userApplicationKeys.includes(APPLICATION_NAME)) {
        console.error(`Application ${APPLICATION_NAME} must exist on the server. Please create it. Refer to the Readme for more information.`);
        process.exit(1);
    }

    const startupFile = userApplications[APPLICATION_NAME]["startup_file"];
    if (startupFile !== STARTUP_FILE) {
        console.error(`Startup file must be ${STARTUP_FILE}. Please update the application. Refer to the Readme for more information.`);
        process.exit(1);
    }
}

/**
 * Important: Directory must exist on the server before deploying
 */
function checkIfDirectoryExists() {
    try {
        execSync(`ssh -p ${PORT} ${USERNAME}@${IP} "cd ${DIRECTORY_PATH}"`);
    } catch (error) {
        console.error(`Directory ${DIRECTORY_PATH} does not exist on the server. Please create it. Refer to the Readme for more information.`);
        process.exit(1);
    }
}

/**
 * Build the project
 */
function buildProject() {
    execSync('npm run build');
}

/**
 * Remove package.json from the build server folder
 */
function removePackageJsonFromServerFolder() {
    execSync(`rm .output/server/package.json`);
}

/**
 * Add startup file to build folder
 */
function addStartupFile() {
    execSync(`touch .output/${STARTUP_FILE} `);
    execSync(`echo "import('./index.mjs');" > .output/${STARTUP_FILE}`);
}

/**
 * Rsync the build folder to the server
 */
function rsyncBuildFolder() {
    execSync(`rsync -avz --delete -e 'ssh -p ${PORT}' .output/ ${USERNAME}@${IP}:${DIRECTORY_PATH}`);
}

/**
 * Restart the application
 */
function restartApplication() {
    execSync(`ssh -p ${PORT} ${USERNAME}@${IP} "cloudlinux-selector restart --json --interpreter nodejs --user ${USERNAME} --app-root ${APPLICATION_NAME}"`)
}