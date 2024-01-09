import logging
from flask import current_app

class Logger:
    def __init__(self, level='INFO'):
        self.gunicorn_logger = logging.getLogger('gunicorn.access')
        current_app.logger.handlers
        current_app.logger.setLevel(level)

    def info(self, event_name, data={}) -> None:
        self.gunicorn_logger.info(event_name, extra=data)

    def debug(self, event_name, data={}) -> None:
        self.gunicorn_logger.debug(event_name, extra=data)

    def warning(self, event_name, data={}) -> None:
        self.gunicorn_logger.warning(event_name, extra=data)

    def error(self, event_name, data={}) -> None:
        self.gunicorn_logger.error(event_name, extra=data)