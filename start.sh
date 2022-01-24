#!/usr/bin/env bash

export BLOCKCHAIN_VOLUME=".blockchain/"
export GANACHE_MNEMONIC=${GANACHE_MNEMONIC:-"taxi music thumb unique chat sand crew more leg another off lamp"}

docker-compose down
docker-compose build --no-cache
docker-compose up