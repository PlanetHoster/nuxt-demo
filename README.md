# Nuxt 3 Minimal Starter with N0C Deploy Script :rocket:

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

If your looking to deploy your Nuxt.js application on a N0C hosting, follow along. 

:point_down:

## Requirements

- Node
- NPM

## Setup

1. Clone the repository. [Learn more](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)
2. Install the dependencies:
```bash
# npm
npm install

```
3. Configure SSH connection to your N0C hosting. [Learn more](https://kb.n0c.com/en/knowledge-base/how-to-create-an-ssh-key-and-connect-to-an-account/)
4. Create and configure your Node.js application on your N0C hosting. [Learn more](https://kb.n0c.com/en/knowledge-base/nodejs-application-management/)

**Important: Specifying the below javascript entry file at the application creation step is vital.**

`server/server.js`

5. Copy and rename the `.env-example` as `.env`
6. Enter variabel values 
7. Run the deploy command.
`npm run deploy`

## Things to Know About the Deploy Script

- git status
- build command
- environment variables
- restart the application
