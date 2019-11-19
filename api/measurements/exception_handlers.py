from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from social_core.exceptions import AuthForbidden

def auth_forbidden_exception_handler(exception, context):
    response = exception_handler(exception, context)
    if type(exception)==AuthForbidden:
        response = Response(status=status.HTTP_401_UNAUTHORIZED)       
    return response
