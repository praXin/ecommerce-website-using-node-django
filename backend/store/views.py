from django.shortcuts import render

from store.models import Category, Tax, Product, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem, ProductFaq, Review, Wishlist, Notification, Coupon
from store.serializers import ProductSerializer, CategorySerializer, CartSerializer, CartOrderSerializer, CartOrderItemSerializer
from userauths.models import User

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from decimal import Decimal


'''
CreateAPIView: For creating new objects via POST requests only. No listing functionality.
ListCreateAPIView: Combines listing and creating. Handles GET requests for listing and POST requests for creating new objects.
RetrieveAPIView: For retrieving a single object via a GET request. No creation or listing functionality.
ListAPIView: For listing multiple objects via GET requests. No creation functionality.

https://www.django-rest-framework.org/api-guide/generic-views/
'''


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

        # Applying tax 
        tax = Tax.objects.filter(country=country).first()
        if tax:
            tax_rate = tax.rate / 100
        else:
            tax_rate = 0
        
        cart = Cart.objects.filter(cart_id=cart_id, product=product).first()
        if cart:
            cart.product = product
            cart.user = user
            cart.qty = qty
            cart.price = price
            cart.sub_total = Decimal(price) * int(qty)
            cart.shipping_amount = Decimal(shipping_amount) * int(qty)
            cart.tax_fee = int(qty) * Decimal(tax_rate) # up to your business requirement and country requirement. Here we allow user to pay tax for each item they are ordering
            cart.color = color
            cart.size = size
            cart.country = country
            cart.cart_id = cart_id

            service_fee_percentage = 10 / 100
            cart.service_fee = Decimal(service_fee_percentage) * cart.sub_total

            cart.total = cart.sub_total + cart.shipping_amount + cart.service_fee + cart.tax_fee
            cart.save()

            return Response({'message': 'Cart Updated Successfully'}, status=status.HTTP_200_OK)
        
        else:
            cart = Cart()

            cart.product = product
            cart.user = user
            cart.qty = qty
            cart.price = price
            cart.sub_total = Decimal(price) * int(qty)
            cart.shipping_amount = Decimal(shipping_amount) * int(qty)
            cart.tax_fee = int(qty) * Decimal(tax_rate) # up to your business requirement and country requirement. Here we allow user to pay tax for each item they are ordering
            cart.color = color
            cart.size = size
            cart.country = country
            cart.cart_id = cart_id

            service_fee_percentage = 10 / 100
            cart.service_fee = Decimal(service_fee_percentage) * cart.sub_total

            cart.total = cart.sub_total + cart.shipping_amount + cart.service_fee + cart.tax_fee
            cart.save()

            return Response({'message': 'Cart Updated Successfully'}, status=status.HTTP_201_CREATED)


class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [AllowAny]
    queryset = Cart.objects.all()

    def get_queryset(self):
        cart_id = self.kwargs['cart_id']
        user_id = self.kwargs.get('user_id') # user might or might not exist. Hence, "get"

        if user_id is not None:
            user = User.objects.get(id=user_id)
            queryset = Cart.objects.filter(user=user, cart_id=cart_id)
        else:
            queryset=Cart.objects.filter(cart_id=cart_id)

        return queryset

class CartDetailView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [AllowAny]
    lookup_field = "cart_id" # by default lookup_field is primary key i.e. pk (generated by default in database) but we use the 'cart_id' field in this case

    def get_queryset(self): # just like above
        cart_id = self.kwargs['cart_id']
        user_id = self.kwargs.get('user_id')

        if user_id is not None:
            user = User.objects.get(id=user_id)
            queryset = Cart.objects.filter(user=user, cart_id=cart_id)
        else:
            queryset=Cart.objects.filter(cart_id=cart_id)

        return queryset
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        total_shipping = 0.0
        total_tax = 0.0
        total_service_fee = 0.0
        total_sub_total = 0.0
        total_total = 0.0

        for cart_item in queryset:
            total_shipping += float(self.calculate_shipping(cart_item))
            total_tax += float(self.calculate_tax(cart_item))
            total_service_fee += float(self.calculate_service_fee(cart_item))
            total_sub_total += float(self.calculate_sub_total(cart_item))
            total_total += float(self.calculate_total(cart_item))

        data = {
            'shipping': total_shipping,
            'tax': total_tax,
            'service_fee': total_service_fee,
            'sub_total': total_sub_total,
            'total': total_total,
        } # data will be sent to react/frontend

        return Response(data)

    def calculate_shipping(self, cart_item):
        return cart_item.shipping_amount
    
    def calculate_tax(self, cart_item):
        return cart_item.tax_fee
    
    def calculate_service_fee(self, cart_item):
        return cart_item.service_fee
    
    def calculate_sub_total(self, cart_item):
        return cart_item.sub_total
    
    def calculate_total(self, cart_item):
        return cart_item.total
    

class CartItemDeleteAPIView(generics.DestroyAPIView):
    serializer_class = CartSerializer
    lookup_field = "cart_id"

    def get_object(self):
        cart_id = self.kwargs['cart_id']
        item_id = self.kwargs['item_id']
        user_id = self.kwargs.get('user_id') # user_id may or may not exist
        
        if user_id:
            user = User.objects.get(id=user_id)
            cart = Cart.objects.get(id=item_id, cart_id=cart_id, user=user)
        else:
            cart = Cart.objects.get(id=item_id, cart_id=cart_id)

        return cart # will delete the cart item?!

class CreateOrderAPIView(generics.CreateAPIView):
    serializer_class = CartOrderSerializer
    queryset = CartOrder.objects.all()
    permission_classes = [AllowAny]

    def create(self, request):
        payload = request.data

        full_name = payload['full_name']
        email = payload['email']
        mobile = payload['mobile']
        address = payload['address']
        city = payload['city']
        state = payload['state']
        country = payload['country']
        cart_id = payload['cart_id']
        user_id = payload['user_id']

        try:
            user = User.objects.get(id=user_id)
        except:
            user = None

        total_shipping = Decimal(0.00)
        total_tax = Decimal(0.00)
        total_service_fee= Decimal(0.00)
        total_sub_total= Decimal(0.00)
        total_initial_total = Decimal(0.00)
        total_total = Decimal(0.00)

        order =  CartOrder.objects.create(
            buyer=user,
            full_name=full_name,
            email=email,
            mobile=mobile,
            address=address,
            city=city,
            state=state,
            country=country
        )

        cart_items = Cart.objects.filter(cart_id=cart_id)
        for c in cart_items:
            CartOrderItem.objects.create(
                order=order,
                product=c.product,
                vendor=c.product.vendor,
                qty=c.qty,
                color=c.color,
                size=c.size,
                price=c.price,
                sub_total=c.sub_total,
                shipping_amount=c.shipping_amount,
                service_fee=c.service_fee,
                tax_fee=c.tax_fee,
                total=c.total,
                initial_total=c.total
            )

            total_shipping += Decimal(c.shipping_amount)
            total_tax += Decimal(c.tax_fee)
            total_service_fee += Decimal(c.service_fee)
            total_sub_total += Decimal(c.sub_total)
            total_initial_total += Decimal(c.total)
            total_total += Decimal(c.total)

            order.vendor.add(c.product.vendor) # check


        order.shipping_amount = total_shipping
        order.tax_fee = total_tax
        order.service_fee = total_service_fee
        order.sub_total = total_sub_total
        order.initial_total = total_initial_total
        order.total = total_total

        order.save()

        return Response({"message": "Order Created Successfully", "order_oid": order.oid}, status=status.HTTP_201_CREATED)
    
class CheckoutView(generics.RetrieveAPIView):
    serializer_class = CartOrderSerializer
    lookup_field = 'order_oid'

    def get_object(self):
        order_oid = self.kwargs['order_oid']
        order = CartOrder.objects.get(oid=order_oid)
        return order