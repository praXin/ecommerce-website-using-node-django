from django.shortcuts import render

from store.models import Product, Category
from store.serializers import ProductSerializer, CategorySerializer

from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated

class CategoryListAPIView(generics.ListAPIView): # ListAPIView is being used here 
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class ProductDetailAPIView(generics.RetrieveAPIView): # RetrieveAPIView can be used when you want to get one single item
    # queryset = Product.objects.all() # not used
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        slug = self.kwargs['slug']
        return Product.objects.get(slug=slug) # slug = <the variable name above>