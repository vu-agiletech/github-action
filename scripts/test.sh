#!/bin/sh

echo "Running script ====>"

yarn test
yarn format
yarn lint

echo "Finish!"
