# Use the official Node.js image as the base image
FROM --platform=linux/arm64 node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY . ./

# Install the npm dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application will run on
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
