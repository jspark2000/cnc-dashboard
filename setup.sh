#!/bin/bash

set -ex

BASEDIR=$(dirname $(realpath $0))

cd $BASEDIR

if command -v python3 &>/dev/null; then
    echo "Python is installed."
else
    echo "Python is not installed. Please install Python."
    exit 1
fi

if command -v node &>/dev/null; then
    echo "Node.js is installed."
else
    echo "Node.js is not installed. Please install Node.js."
    exit 1
fi

if [ -f package.json ]; then
    echo "Installing Node.js packages..."
    npm install
else
    echo "package.json not found. Skipping npm install."
fi

if [ -f requirements.txt ]; then
    echo "Installing Python packages..."
    pip install -r requirements.txt
else
    echo "requirements.txt not found. Skipping pip install."
fi

echo "Setup complete."
