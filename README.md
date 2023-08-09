# Retroactive Public Goods Funding (RPGF) Voting Experience

# Purpose
Badgeholders (voters in RetroPGF) need to be able to discover and vote on nominated projects. A good voting experience is core to supporting the work of badgeholders and ensuring an accurate RetroPGF process. This build seeks to empower badgeholders to find projects of various disciplines that have produced meaningful impact in the ecosystem that deserve to be promoted with funding.

# Features of this build
- Searchable, filterable and sortable view of all projects
- Sign in with your wallet to see your allocation of votes
- Ability to allocate to projects in any quantity within your limit
- Badgeholders can create curated project lists with advised allocations to help raise awareness of projects in a self-defined grouping
- Searchable, filterable and sortable view of all curated lists
- Final ballot review before submission
- Ability to share your submission on social media

# Guiding principles and materials
[RFP: RetroPGF 3 Discovery & Voting ](https://github.com/ethereum-optimism/ecosystem-contributions/issues/104)
[Extra Reading](https://docs.google.com/document/d/1ZjjJkVIhOMgEDVRN24uvxVEOREFQeJCQp4I1XPX2_8k/edit)

# Technology
##  🏗 Scaffold-ETH 2
Popular front end tool, Scaffold-ETH 2 has been used for it's easily forkable components designed with interacting with onchain data in mind. Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.
[Scaffold-ETH 2 Repo](https://github.com/scaffold-eth/scaffold-eth-2)

## MongoDB
For all the data housing needs to make project discovery and list curation as seamless and friction-free as possible.

# Getting set up with the project
## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)


## Quickstart

To get started with this project, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/OP-RetroPGF3-Discovery-Voting.git
cd OP-RetroPGF3-Discovery-Voting
yarn install
```
2. TODO: Set up mongodb connection

3. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

4. On a second terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`.

5. Give yourself funds

TODO - Will we run a script or... ?

## Deploying to Vercel

**Hint**: We recommend connecting your GitHub repo to Vercel (through the Vercel UI) so it gets automatically deployed when pushing to `main`.

If you want to deploy directly from the CLI, run `yarn vercel` and follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

**Make sure to check the values of your Scaffold Configuration before deploying your NextJS App.**

### Scaffold App Configuration

You can configure different settings for your dapp at `packages/nextjs/scaffold.config.ts`.

```ts
export type ScaffoldConfig = {
  targetNetwork: chains.Chain;
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  walletAutoConnect: boolean;
  // your dapp custom config, eg:
  // tokenIcon : string;
};
```

The configuration parameters are described below, make sure to update the values according to your needs:

- **targetNetwork**  
  Sets the blockchain network where your dapp is deployed. Use values from `wagmi/chains`.

- **pollingInterval**  
  The interval in milliseconds at which your front-end application polls the RPC servers for fresh data. _Note that this setting does not affect the local network._

- **alchemyApiKey**  
  Default Alchemy API key from Scaffold ETH 2 for local testing purposes.  
  It's recommended to obtain your own API key from the [Alchemy Dashboard](https://dashboard.alchemyapi.io/) and store it in an environment variable: `NEXT_PUBLIC_ALCHEMY_API_KEY` at `\packages\nextjs\.env.local` file.

- **walletConnectProjectId**  
  WalletConnect's default project ID from Scaffold ETH 2 for local testing purposes.
  It's recommended to obtain your own project ID from the [WalletConnect website](https://cloud.walletconnect.com) and store it in an environment variable: `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` at `\packages\nextjs\.env.local` file.

- **onlyLocalBurnerWallet**  
  Controls the networks where the Burner Wallet feature is available. This feature provides a lightweight wallet for users.

  - `true` => Use Burner Wallet only on hardhat network.
  - `false` => Use Burner Wallet on all networks.

- **walletAutoConnect**  
  Set it to `true` to activate automatic wallet connection behavior:
  - If the user was connected into a wallet before, on page reload it reconnects automatically.
  - If user is not connected to any wallet, on reload, it connects to the burner wallet if it is enabled for the current network. See `onlyLocalBurnerWallet`

You can extend this configuration file, adding new parameters that you need to use across your dapp **(make sure you update the above type `ScaffoldConfig`)**:

```ts
  tokenIcon: "💎",
```

To use the values from the `ScaffoldConfig` in any other file of your application, you first need to import it in those files:

```ts
import scaffoldConfig from "~~/scaffold.config";
```
A multitude of more detailed information related to Scaffold-ETH 2 can be found at the [Scaffold-ETH 2 Repo](https://github.com/scaffold-eth/scaffold-eth-2)

## Contributing to OP-RetroPGF3-Discovery-Voting

We welcome contributions to OP-RetroPGF3-Discovery-Voting!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/OP-RetroPGF3-Discovery-Voting/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to OP-RetroPGF3-Discovery-Voting.
