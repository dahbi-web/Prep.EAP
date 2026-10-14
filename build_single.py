#!/usr/bin/env python3
"""Build the same fully offline HTML as the Node entrypoint."""
import pathlib
import subprocess
subprocess.run(['node', str(pathlib.Path(__file__).with_suffix('.js'))], check=True)
