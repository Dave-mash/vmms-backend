#!/bin/bash
set -e

yarn prisma migrate deploy
yarn prisma generate

exec "$@"
