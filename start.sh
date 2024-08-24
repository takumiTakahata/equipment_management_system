cd equipment_management
gunicorn equipment_management.wsgi:application --bind 0.0.0.0:8000
