#!/bin/bash

source .venv/bin/activate
python -m PyInstaller --onefile --paths src src/app/main.py
cp dist/main ui/bin/
