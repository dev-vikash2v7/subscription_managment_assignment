from django.urls import path
from . import views

urlpatterns = [
    path('add_subscription/', views.add_subscription, name='add_subscription'),
    path('extend_subscription/<int:subscription_id>', views.extend_subscription, name='extend_subscription'),
    path('end_subscription/<int:subscription_id>', views.end_subscription, name='end_subscription'),
    path('revenue/', views.get_revenue, name='get_revenue'),
    path('customers/', views.customers, name='customers'),
    path('products/', views.products, name='products'),
    path('all-subscriptions/', views.subscriptions, name='all-subscriptions'),
]