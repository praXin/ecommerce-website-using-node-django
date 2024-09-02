from django.contrib import admin
from store.models import Product, Category, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem, ProductFaq, Review, Wishlist, Notification, Coupon

class GalleryInLine(admin.TabularInline):
    model = Gallery
    extra = 0

class SpecificationInLine(admin.TabularInline):
    model = Specification
    extra = 0

class SizeInLine(admin.TabularInline):
    model = Size
    extra = 0

class ColorInLine(admin.TabularInline):
    model = Color
    extra = 0


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'category', 'shipping_amount', 'stock_qty', 'in_stock', 'vendor', 'featured']
    list_editable = ['featured']
    list_filter = ['date']
    search_fields = ['title']
    inlines = [GalleryInLine, SpecificationInLine, SizeInLine, ColorInLine]

# Check self-made mistakes from here

class CartAdmin(admin.ModelAdmin):
    list_display = ['price', 'shipping_amount', 'total', 'size', 'color']
    # list_editable = ['featured']
    list_filter = ['size']
    search_fields = ['color']

class CartOrderAdmin(admin.ModelAdmin):
    list_display = ['buyer', 'shipping_amount', 'total', 'payment_status', 'order_status']
    list_editable = ['payment_status','order_status']
    list_filter = ['full_name']
    search_fields = ['payment_status']

class CartOrderItemAdmin(admin.ModelAdmin):
    list_display = ['tax_fee', 'total', 'service_fee', 'size', 'color']
    list_editable = ['service_fee']
    list_filter = ['size']
    search_fields = ['color']

class ProductFaqAdmin(admin.ModelAdmin):
    list_display = ['user', 'product']

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'product']

class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'product']

class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'vendor', 'order', 'order_item']

class CouponAdmin(admin.ModelAdmin):
    list_display = ['vendor', 'discount']


admin.site.register(Category)
admin.site.register(Product, ProductAdmin) # register ProductAdmin which in turn registers other inline classes

admin.site.register(Cart, CartAdmin)
admin.site.register(CartOrder, CartOrderAdmin)
admin.site.register(CartOrderItem, CartOrderItemAdmin)
admin.site.register(ProductFaq, ProductFaqAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Wishlist, WishlistAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Coupon, CouponAdmin)