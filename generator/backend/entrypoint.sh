#!/bin/bash
# entrypoint.sh

python -m gunicorn -c config/gunicorn.config.py 'main:app'