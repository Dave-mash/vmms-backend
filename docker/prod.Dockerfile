FROM node:18-alpine as base

LABEL org.opencontainers.image.description DESCRIPTION
# Set the NODE_ENV to 'build' for the builder stage
ENV NODE_ENV build

# Set a working directory
WORKDIR /app

# Copy package.json, yarn.lock, and TypeScript config files
COPY package*.json yarn.lock tsconfig.build.json nest-cli.json ./

# Copy the Prisma schema folder
COPY prisma ./prisma

# Install the Nest CLI and dependencies, and store them in a directory outside of the WORKDIR
RUN yarn global add @nestjs/cli @prisma/client && \
    yarn install --frozen-lockfile

# Copy your app source code
COPY . .

# Build your Nest app
RUN yarn build

FROM base as production

# Set the NODE_ENV to 'production' for the production stage
ENV NODE_ENV production

# Set a working directory
WORKDIR /app

# Copy package.json, node_modules, and the compiled app
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules/ ./node_modules/
COPY --from=base /app/dist/ ./dist/
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/tsconfig.build.json ./tsconfig.build.json
COPY --from=base /app/prisma/migrations ./prisma/migrations
COPY --from=base /app/run_migrations.sh ./run_migrations.sh

# Run migrations
RUN chmod +x ./run_migrations.sh

# Expose the necessary ports
EXPOSE 3000

# Entry point script
# ENTRYPOINT ["./run_migrations.sh"]

# Run your Nest app in production
CMD [ "node", "dist/main.js"]