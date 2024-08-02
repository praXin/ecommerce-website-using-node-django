from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

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
        email = self.kwargs['email']
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