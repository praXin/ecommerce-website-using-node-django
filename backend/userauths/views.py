from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status

from userauths.models import User, Profile
from userauths.serializer import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer

import random
import shortuuid

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    # Read this page for more info: https://www.django-rest-framework.org/api-guide/generic-views/#genericapiview
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny, ) # AllowAny so that users that are not logged in can access this view to register themselves


def generate_otp():
    uuid_key = shortuuid.uuid()
    unique_key = uuid_key[:6]
    return unique_key

class PasswordResetEmailVerify(generics.RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer

    def get_object(self):
        email = self.kwargs['email'] # taken from the url, after password-reset. Ex: http://127.0.0.1:8000/api/v1/user/password-reset/pravinkishore1997@gmail.com/
        user = User.objects.get(email=email)

        print("CHECKING IF USER EXISTS: ", user)
        
        
        if user:
            user.otp = generate_otp()
            user.save()

            uidb64 = user.pk # something in db like the primary key
            otp = user.otp

            link = f"http://localhost:5173/create-new-password?otp={otp}&uidb64={uidb64}"

            print("LINK OF THE USER: "+link)

            # Send email 
        return user
    
class PasswordChangeView(generics.CreateAPIView): # just like RegisterView
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        payload = request.data
        otp = payload['otp']
        uidb64 = payload['uidb64']
        reset_token = payload['reset_token'] # reset_token variable yet to be used
        password = payload['password']

        user = User.objects.get(id=uidb64, otp=otp)
        if user:
            user.set_password(password)
            user.otp = ""
            user.reset_token = ""
            user.save()

            return Response({"message": "Password changed successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
