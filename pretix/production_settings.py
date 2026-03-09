from pretix.settings import *
LOGGING['handlers']['mail_admins']['include_html'] = True
STORAGES["staticfiles"]["BACKEND"] = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
CSRF_TRUSTED_ORIGINS = [
    'https://tickets.svbahrdorf.de',
    'https://fest.svbahrdorf.de',
]
