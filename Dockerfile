# ---- Base Stage ----
# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# ---- Dependencies Stage ----
FROM base AS dependencies
# Copy package.json and package-lock.json
COPY package*.json ./
# Install app dependencies
RUN npm ci

# ---- Build Stage ----
FROM dependencies AS build
# Copy the rest of the application files
COPY . .

# ---- Production Stage ----
FROM base AS production
ENV NODE_ENV=production
# Copy dependencies from the 'dependencies' stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# Copy application code from the 'build' stage
COPY --from=build /usr/src/app/src ./src

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD [ "node", "src/index.js" ]