# #!/usr/bin/env python
# """Django's command-line utility for administrative tasks."""
# import os
# import sys

# def main():
#     """Run administrative tasks."""
#     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'equipment_management.settings')

#     # Check if 'runserver' is in sys.argv and set the port accordingly
#     if 'runserver' in sys.argv:
#         port_index = sys.argv.index('runserver') + 1
#         if port_index < len(sys.argv):
#             sys.argv[port_index] = f"0.0.0.0:{os.getenv('PORT', '8000')}"
#         else:
#             sys.argv.append(f"0.0.0.0:{os.getenv('PORT', '8000')}")

#     try:
#         from django.core.management import execute_from_command_line
#     except ImportError as exc:
#         raise ImportError(
#             "Couldn't import Django. Are you sure it's installed and "
#             "available on your PYTHONPATH environment variable? Did you "
#             "forget to activate a virtual environment?"
#         ) from exc
#     execute_from_command_line(sys.argv)


# if __name__ == '__main__':
#     main()

import os
import sys

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'equipment_management.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
