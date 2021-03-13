#!/bin/sh

# Author: im6h
# Copyright by im6h

yarn lint
yarn format
git status
git add .
git commit

