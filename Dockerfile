# Base image
FROM node:22-alpine AS base

# Tạo thư mục làm việc
WORKDIR /app

# Copy cấu hình package
COPY package*.json ./

# Cài dependencies
RUN npm install 

# Copy toàn bộ mã nguồn (sau khi cài để tránh cache lại khi source code thay đổi)
COPY . .

# Stage cho production: chỉ cài dependencies cần thiết
FROM base AS prod

# Build TypeScript
RUN npm run build

# Expose cổng chạy app
EXPOSE 5173

# Stage cho development
FROM base AS dev

# Expose cổng chạy app
EXPOSE 5173

# Start ở chế độ dev
CMD ["npm", "run", "dev"]
