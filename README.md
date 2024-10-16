# Jarurat_Care_Assignment

This document explains how to set up and run the Healthcare Services API built using Node.js, Express, and MongoDB.

## Prerequisites

Before starting, make sure you have the following installed:
- **Node.js** (v12 or higher)
- **MongoDB** (running locally or cloud-based)

## Project Setup

### 1. Clone the Repository

To get started, clone the repository from GitHub (or extract the zip file):

```
git clone  https://github.com/srmahitesh/Jarurat_Care_Assignment
```

Navigate into the project directory:


### 2. Install Dependencies

Run the following command to install the required Node.js dependencies:

```
npm install
```

### 3. Configure MongoDB

Make sure MongoDB is running. If you're using a cloud MongoDB instance, update the connection string in the source code (`server.js`).

Example (in `server.js`):
```js
const DBURL = 'mongodb://localhost:27017/HealthCareServices';
```

### 4. Start the Server

Run the following command to start the server:

```
node server.js
```

By default, the API will run on `http://localhost:3000`.

## API Endpoints

Here are the available API endpoints:

### 1. Add a New Service
- **URL**: `/addservice`
- **Method**: `POST`
- **Body Parameters**:
  - `serviceName` (String) - Required
  - `description` (String) - Required
  - `price` (Number) - Required
- **Response**:
  - `200 OK` if successful
  - `500 Internal Server Error` if required fields are missing

### 2. Get All Services
- **URL**: `/allservices`
- **Method**: `GET`
- **Response**: 
  - List of all services

### 3. Update a Service
- **URL**: `/updateservice/:id`
- **Method**: `PATCH`
- **Body Parameters**: Any of the following can be updated:
  - `serviceName` (String)
  - `description` (String)
  - `price` (Number)
- **Response**:
  - `200 OK` if successful
  - `404 Not Found` if service ID is invalid

### 4. Delete a Service
- **URL**: `/deleteservice/:id`
- **Method**: `DELETE`
- **Response**:
  - `200 OK` if successful
  - `404 Not Found` if service ID is invalid



## Testing the API

You can use tools like **Postman** to test the API.

Example request to add a new service:
```bash
curl -X POST http://localhost:3000/addservice -H "Content-Type: application/json" -d '{
  "serviceName": "Consultation",
  "description": "Doctor consultation and advice",
  "price": 100
}'
```

## Running the Project

After cloning and setting up the project, simply run `npm install` to install all necessary dependencies and `npm start` to start the server.

---
