# Stage 1: Build the React frontend
FROM node:18-alpine as build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve with Express backend
FROM node:18-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Copy the built frontend from Stage 1 into the backend folder
# We'll serve it from an internal "dist" folder
COPY --from=build /app/frontend/dist /app/backend/public

# Expose port (Cloud Run sets the PORT env variable natively)
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
