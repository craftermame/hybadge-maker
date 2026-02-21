#!/bin/bash

source .venv/bin/activate
python -m PyInstaller --onefile --paths src --add-data "assets/fonts:assets/fonts" src/app/main.py

cp dist/main ui/bin/
