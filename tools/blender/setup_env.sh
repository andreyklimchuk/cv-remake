#!/bin/sh
python3 -c "import bpy" 2>/dev/null && exit 0
pip3 install -q bpy==5.1.2 2>&1 | tail -1
sudo dnf install -y -q mesa-libGL mesa-libEGL libXi libXrender libXxf86vm libxkbcommon libSM >/dev/null 2>&1
python3 -c "import bpy; print('bpy', bpy.app.version)"
