from django.contrib import admin
from store.models import Product, Category, Gallery, Specification, Size, Color

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

admin.site.register(Category)
admin.site.register(Product, ProductAdmin)