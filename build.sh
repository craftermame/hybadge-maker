#!/bin/bash

PATH_SEP=":"
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  PATH_SEP=";"
fi

python -m PyInstaller \
  --paths src \
  --add-data "assets/fonts${PATH_SEP}assets/fonts" \
  --name "hybadge-maker" \
  --onefile \
  --noconfirm \
  --clean \
  src/app/main.py

mkdir -p ui/bin/
mv -f dist/hybadge-maker* ui/bin/  # windows では dist/hybadge-maker.exe になる
