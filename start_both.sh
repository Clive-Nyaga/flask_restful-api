#!/bin/bash

echo "Starting Flask backend..."
python app.py &
FLASK_PID=$!

echo "Waiting for Flask to start..."
sleep 3

echo "Starting React frontend..."
cd frontend
npm start &
REACT_PID=$!

echo "Both applications are starting..."
echo "Flask backend: http://localhost:5000"
echo "React frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both applications"

cleanup() {
    echo "Stopping applications..."
    kill $FLASK_PID 2>/dev/null
    kill $REACT_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM
wait