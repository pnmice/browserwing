# Build stage for frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Install pnpm
RUN npm install -g pnpm

# Copy frontend package files
COPY frontend/package.json frontend/pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy frontend source
COPY frontend/ ./

# Build frontend
RUN pnpm build

# Build stage for backend
FROM golang:1.24-alpine AS backend-builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git make

# Copy go mod files
COPY backend/go.mod backend/go.sum ./backend/

# Download dependencies
WORKDIR /app/backend
RUN go mod download

# Copy backend source
COPY backend/ ./

# Copy frontend dist from frontend-builder
COPY --from=frontend-builder /app/frontend/dist ./dist

# Build the application with embedded frontend
RUN CGO_ENABLED=0 GOOS=linux go build -tags embed \
    -ldflags "-s -w -X 'main.Version=docker' -X 'main.BuildTime=$(date -u +%Y-%m-%d_%H:%M:%S)'" \
    -o /app/browserwing .

# Final runtime stage
FROM alpine:3.21

# Install runtime dependencies and Chromium
RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    font-noto-cjk \
    && rm -rf /var/cache/apk/*

# Set Chrome environment variables for go-rod
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/bin/chromium-browser

# Create non-root user
RUN addgroup -g 1000 browserwing && \
    adduser -u 1000 -G browserwing -s /bin/sh -D browserwing

# Create necessary directories
RUN mkdir -p /app/data /app/logs /app/assets /app/chrome_user_data && \
    chown -R browserwing:browserwing /app

WORKDIR /app

# Copy binary from builder
COPY --from=backend-builder /app/browserwing .

# Copy example config
COPY backend/config.example.toml ./config.example.toml

# Set ownership
RUN chown -R browserwing:browserwing /app

# Switch to non-root user
USER browserwing

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Default command
CMD ["./browserwing", "--host", "0.0.0.0", "--port", "8080"]
