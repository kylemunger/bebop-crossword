from flask import Flask
from containers import Core

app = Flask(__name__)

with app.app_context():
    core = Core()
    core.wire(modules=[__name__, 'endpoints', 'services.wiz'])
    import endpoints
