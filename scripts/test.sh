#!/usr/bin/env bash
#
set -e
cd "${0%/*}/.."

echo "Running test before commit"

yarn test
yarn format
yarn lint

echo "Failed" && exit  1
