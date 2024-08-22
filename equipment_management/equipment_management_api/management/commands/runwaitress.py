from django.core.management.base import BaseCommand
from waitress import serve
from equipment_management.wsgi import application  # プロジェクトの WSGI アプリケーションをインポート

class Command(BaseCommand):
    help = 'Run the Django application using Waitress'

    def add_arguments(self, parser):
        parser.add_argument('--host', default='0.0.0.0', help='Specify the host to bind to')
        parser.add_argument('--port', default='8000', help='Specify the port to bind to')

    def handle(self, *args, **kwargs):
        host = kwargs['host']
        port = int(kwargs['port'])
        self.stdout.write(f'Starting server at http://{host}:{port}...')

        # Waitress でアプリケーションを提供
        serve(application, host=host, port=port)
