# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# --- Dependency Installation ---
# Copy package files first for better caching
# Bun will install dependencies based on this package.json
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# --- Build ---
# Copy the rest of the source files
COPY . .

# Build the binary. 
# CRITICAL FIX: Targeting the correct entry file src/index.ts
RUN bun build src/index.ts --compile --outfile server

# Final stage (Slimmer base image for production)
FROM debian:bookworm-slim

WORKDIR /app

# Copy only the compiled binary
COPY --from=builder /app/server ./server

# Run the binary
CMD ["./server"]
