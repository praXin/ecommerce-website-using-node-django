from django.shortcuts import render

from store.models import Category, Product, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem, ProductFaq, Review, Wishlist, Notification, Coupon
from store.serializers import ProductSerializer, CategorySerializer, CartSerializer, CartOrderSerializer, CartOrderItemSerializer
from userauths.models import User

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

class CartAPIView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        payload = request.data

        product_id = payload['product_id']
        user_id = payload['user_id']
        qty = payload['qty']
        price = payload['price']
        shipping_amount = payload['shipping_amount']
        country = payload['country']
        size = payload['size']
        color = payload['color']
        cart_id = payload['cart_id']

        product = Product.objects.get(id=product_id)
        if user_id != "undefined":
            user = User.objects.get(id=user_id)
        else:
            user = None
