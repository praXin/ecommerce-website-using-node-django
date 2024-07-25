from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from userauths.models import User, Profile
from userauths.serializer import MyTokenObtainPairSerializer, RegisterSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    # Read this page for more info: https://www.django-rest-framework.org/api-guide/generic-views/#genericapiview
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny, ) # AllowAny so that users that are not logged in can access this view to register themselves