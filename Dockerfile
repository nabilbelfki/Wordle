# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Clone the repository
RUN apk add --no-cache git && \
    git clone https://github.com/nabilbelfki/Wordle.git . && \
    rm -rf .git

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
