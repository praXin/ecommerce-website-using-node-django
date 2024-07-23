from django.contrib import admin
from userauths.models import Profile, User

class UserAdmin(admin.ModelAdmin):
    list_display = ['full_name','email','phone']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name','gender','country']
    # list_editable = ['gender','country'] # Don't have first one of display as editable or it will throw an error
    search_fields = ['full_name', 'date']
    list_filter = ['date']
    # Check Django documentation for configuring admin section to know more such fields, filters etc.

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)