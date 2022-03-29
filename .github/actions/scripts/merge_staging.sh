#!/bin/bash

MAIN=$PRODUCTION_BRANCH
STAGING=$STAGING_BRANCH

git checkout $STAGING
git pull 

git checkout $MAIN
git pull

if git merge-base --is-ancestor HEAD "$STAGING"; then
  echo "🌳 🌴 🌱 🌿 Merge with $STAGING can fast-forward 🌳 🌴 🌱 🌿"
else
  echo "🦀 🦑 🐙 🦐 Merge with $STAGING cannot fast-forward - EXIT 🦀 🦑 🐙 🦐"
  exit 1
fi

git merge --ff-only $STAGING
git status
git push origin $MAIN