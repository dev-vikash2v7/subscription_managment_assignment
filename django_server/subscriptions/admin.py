from django.contrib import admin
from .models import Customer, Product, Subscription

admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Subscription)
