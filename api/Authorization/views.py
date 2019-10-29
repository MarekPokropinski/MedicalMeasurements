from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework import status


@api_view(['POST'])
def login_view(request):
    if request.user:
        token = Token.objects.get_or_create(user=request.user)
        return Response(data=token.key, status=status.HTTP_200_OK)

    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
