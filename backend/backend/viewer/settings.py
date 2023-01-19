"""
Django settings for viewer project.

Generated by 'django-admin startproject' using Django 2.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


BASEPATH = os.environ.get("SCA_VIEW_BASE_PATH")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'p1bn9df+a5acg1b&-19qe!c(q*zpqsgo!t2b9=w&%+edm2cc79'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

PORT = os.environ.get("SCA_VIEW_PATH")
PRODUCTION_URL = os.environ.get("SCA_VIEW_PROD_URL")

if DEBUG:
    BASE_HTTP_URL = f"http://localhost:{PORT}/clinical-backend/"
else:
    BASE_HTTP_URL = PRODUCTION_URL



#ASGI_APPLICATION = 'viewer.routing.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient"
        },
        "KEY_PREFIX": "data"
    }
}


ALLOWED_HOSTS = ['idsn-platform.scai.fraunhofer.de', 'idsn.dzne.de','localhost', '0.0.0.0','*']

WITH_AUTH=False


MODEL_LOCATION = "data"
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}

# Application definition

INSTALLED_APPS = [
    'upload.apps.UploadConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'dynamic_models',
    #'channels',
    'django_memcached',
    'users',
    'api',
    'rest_framework',
    'rest_framework.authtoken',
    
    'graphene_django',
     'corsheaders',
     'djoser',
     'datastewardbackend'


]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    #'django_keycloak.middleware.KeycloakMiddleware',
    #'api.middleware.KeycloakMiddleware',
    #'django_keycloak.middleware.BaseKeycloakMiddleware',


]

CORS_ORIGIN_ALLOW_ALL=True
CORS_ALLOW_CREDENTIALS = True

GRAPHENE = {
    'SCHEMA': 'api.schema.schema'
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        
    ),
}

USER_CREATE_PASSWORD_RETYPE=True



AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',

]

AUTH_USER_MODEL ="users.CustomUser"

ROOT_URLCONF = 'viewer.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'viewer.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
        
        'default': {
            'ENGINE': 'djongo',
            'ENFORCE_SCHEMA': False,
            'NAME': 'viewerDB',
            'HOST': 'localhost',
            'PORT': 27017,
            'USER': 'idsn',
            'PASSWORD': 'viewer_pwd_123',
            'AUTH_SOURCE': 'viewerDB',
           # 'AUTH_MECHANISM': 'SCRAM-SHA-1',
        },
        'visits-sqlite':{
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }


#DATABASES = {}

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Berlin'

USE_I18N = True

USE_L10N = True

USE_TZ = True

USE_X_FORWARDED_HOST = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL ="/"  + BASEPATH + 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
SITE_ROOT = os.path.dirname(os.path.realpath(__file__))
STATICFILES_DIRS = (
  os.path.join(SITE_ROOT, 'static/'),
)


# MS Excel file support

FILE_UPLOAD_HANDLERS = ("django_excel.ExcelMemoryFileUploadHandler",
                        "django_excel.TemporaryExcelFileUploadHandler")

from django.contrib.messages import constants as messages


MESSAGE_TAGS = {
    messages.DEBUG: 'info',
    messages.INFO: 'info',
    messages.SUCCESS: 'success',
    messages.WARNING: 'warning',
    messages.ERROR: 'error',
}

# Store Data

SESSION_ENGINE = "django.contrib.sessions.backends.signed_cookies"
SESSION_SAVE_EVERY_REQUEST = True

DATA_LOCATION = 'uploaded_data'
OWL_LOCATION = 'data'

# For Websocket Testing


## APIs

APILIST = [
    ('GET : DataPointsVisit', "/" + BASEPATH + 'api/get/datapoints', "GET : Nor args just retrieve all possible Visit Data as an json"),
    ('POST : GeneticPush', "/" + BASEPATH + 'api/post/genetic-data', "POST args: data_id = An unique idientifier for your genetic dataset to query the data later; genetic_data = the genetic data as json ;username = your keycloak username, password = your keycloak password"),
    ('GET : Genetic GET', '/' + BASEPATH + 'api/get/genetic-data', 'GET args : none for all data ; data_id = id for specific data'),
    ('POST: Access Token', '/' + BASEPATH + 'api/access-token', "POST args : username = your keycloak username ; password = your keycloak apssword"),
    ('GRAPH : Graphene Endpoint', "/" + BASEPATH + "api/graphql", "This is the endpoint for the Graphne engine"),
    ('GET: GetData', '/' + BASEPATH + "api/getdata", "Get Data Endpoint"),
    ('POST : Initialize', '/' + BASEPATH + "api/init", "Initialize Session"),
    ('GET : Filter Plot', '/' + BASEPATH + "api/filter-plot", "Filter Plot"),
    ('GET : Filter Reset', "/" + BASEPATH + "api/filter-reset", "Endpoint for resetting filters"),
    ('GET : Filter Edit', "/" + BASEPATH + "api/filter-edit","Endpoint for editing the filter"),
    ('GET : Filter Recall', "/" + BASEPATH + "api/filter-recall", "Endpoint for filter recall"),
    ('GET : Filter Concept', "/" + BASEPATH + "api/filter-concept", "Endpoint for filter concept"),
    ('GET : Subgroup Define', "/" + BASEPATH + "api/subgroup-define","Endpoint for defining subgroup")
]
