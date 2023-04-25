# Getting Started for Windows

I recomend installing WSL if you don't already. Open a terminal and run `wsl --install -d `

# Setting up env

In your terminal, run sudo apt-get install curl. Next, install nvm with `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

Exit and reopen the terminal, and confirm installation with `command -v nvm`

Check that you have two versions of node installed, which should be `16.17.0` and `18.8.0`, with `nvm ls`. They should be the LTS and current versions. Expo, however, uses 14.15.4, so install with `npm install -g node@10.9.0`. You may also want to do this outside of wsl on windows if you are on windows.

If not, run `nvm install --lts` and `nvm install node`, restart terminal and check `nvm ls`

Yarn is the package manager, so yarn will need to be installed as well. Run `npm install --global yarn`

To install packages, make sure you navigate to the `client` folder via `cd client` (assuming you've opened the terminal in the medixly repo)

Run `yarn install`. If you have `Error: EPERM: operation not permitted, copyfile` try running the install on the native CMD if you're on windows and not on WSL. Seems there is a permission issue when run in wsl.

# Using expo

Make sure that you have a simulator setup on your machine, or install expo on your phone. The web app will NOT work because of tensorflow react native.

Unfortunaely, since expo uses your local as a server, you have to run outside of wsl. Open a terminal in client and run the scripts written in package.json for your prefered platform.

If you use the generic `start` script, hit `d` to open the webcontroller in your browser and set the connection to `tunnel`.
