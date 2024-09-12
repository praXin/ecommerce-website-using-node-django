from django.urls import path

from userauths import views as userauths_views
from store import views as store_views

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('user/token/', userauths_views.MyTokenObtainPairView.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view()),
    path('user/register/', userauths_views.RegisterView.as_view()),
    path('user/password-reset/<email>/', userauths_views.PasswordResetEmailVerify.as_view()), # important: check email in the url here
    path('user/password-change/', userauths_views.PasswordChangeView.as_view(), name='password_change'),

    # store endpoints
    path('category/', store_views.CategoryListAPIView.as_view()),
    path('products/', store_views.ProductListAPIView.as_view()),
    path('products/<slug>/', store_views.ProductDetailAPIView.as_view()), # which is better - accessing products using queryset in views.py with id here i.e. <int:pk> or with slug here i.e. <slug>
    path('cart-view/', store_views.CartAPIView.as_view()),
    path('cart-list/<str:cart_id>/<int:user_id>/', store_views.CartListView.as_view()),
    path('cart-list/<str:cart_id>/', store_views.CartListView.as_view()), # in case user isn't logged in or does not exist
    path('cart-detail/<str:cart_id>/', store_views.CartDetailView.as_view()),
]