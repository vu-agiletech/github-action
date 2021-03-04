#! usr/bin/env/zsh

echo "Running test before commit"

yarn test
yarn format
yarn lint

echo "Failed" && exit  1
