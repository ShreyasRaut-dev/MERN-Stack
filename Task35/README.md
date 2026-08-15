# Student Learning Diary - Task 35 MERN Integration

I am writing this diary to show how I built the To-Do list using MERN stack.

## Step 1: Backend Folders
I made folders for models, routes, controllers, and services. At first, I had everything in server.js, but the refactor was needed.
I had a huge bug with app.pst! It was a typo of app.post and nothing worked. Express threw an error: "TypeError: app.pst is not a function".
Resolution: Fixed to app.post.

## Step 2: Database Connection
Connected mongoose to my local mongodb: mongodb://localhost:27017/todolist_task35.
Had connection problems because mongodb wasn't running. I had to start the service on windows.

## Step 3: Frontend Search and Loader
Added a simple search bar to filter the tasks on frontend. I also added a loading state. When fetching starts, setLoading is true. When it finishes, setLoading is false.

## Postman Testing Evidence:
I tested the endpoints using Postman. Here are the copy-pasted responses:

1. GET http://localhost:5000/api/todo
Status: 200 OK
Response Body:
[
  {
    "_id": "64bf2a09c2a12a3456789abc",
    "title": "finish task 35",
    "completed": false
  }
]

2. POST http://localhost:5000/api/todo
Body: { "title": "Buy milk" }
Status: 201 Created
Response Body:
{
  "_id": "64bf2a89c2a12a3456789abd",
  "title": "Buy milk",
  "completed": false
}
