from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Customer, Product, Subscription
from datetime import date
from django.views.decorators.csrf import csrf_exempt

from django.db.models import Sum, F, FloatField
from django.utils import timezone

import json

@csrf_exempt 
def add_subscription(request):
    if request.method == 'POST':

        data = json.loads(request.body)

        customer_id = data.get('customer_id')
        product_name = data.get('product_name')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        users = data.get('users') 


        customer = get_object_or_404(Customer, pk=customer_id)
        product = get_object_or_404(Product, pk=product_name)

        existing_subscription = Subscription.objects.filter(
            customer=customer, product=product , end_date__gt=timezone.now().date()
        ).first()

        if existing_subscription:
            return JsonResponse({'message': 'Subscription already exists for this product and customer'}, status=400)

        subscription = Subscription(customer=customer, product=product, start_date=start_date, end_date=end_date, users=users)
        subscription.save()


        return JsonResponse({'message': 'Subscription added successfully'})



@csrf_exempt 
def extend_subscription(request, subscription_id):
    if request.method == 'PUT':
        end_date = json.loads(request.body).get('end_date')
        subscription = get_object_or_404(Subscription, pk=subscription_id)
        subscription.end_date = end_date
        subscription.save()

        return JsonResponse({'message': 'Subscription extended successfully'})



@csrf_exempt 
def end_subscription(request, subscription_id):
    if request.method == 'PUT':
        subscription = get_object_or_404(Subscription, pk=subscription_id)
        subscription.end_date = date.today()
        subscription.save()

        return JsonResponse({'message': 'Subscription ended successfully'})



def get_revenue(request):
    # revenue = Subscription.objects.select_related('product').aggregate(revenue=models.Sum(models.F('users') * models.F('product__annual_cost')))['revenue']
    # return JsonResponse({'revenue': revenue})

    revenue = Subscription.objects.aggregate(
        total_revenue=Sum(
            F('users') * F('product__annual_cost'),
            output_field=FloatField()
        )
    )['total_revenue'] or 0  

    return JsonResponse({'revenue': revenue})



def customers(request):
    if request.method == 'GET':

        customers = Customer.objects.all()  
        customers_list = list(customers.values()) 


        return JsonResponse({'customers': customers_list})


def products(request):
    if request.method == 'GET':
        products = Product.objects.all()  
        products_list = list(products.values()) 


        return JsonResponse({'products': products_list})



def subscriptions(request):
    if request.method == 'GET':
        subscription = Subscription.objects.filter(end_date__gt=timezone.now().date())  
 

        sub_list = list(subscription.values('id','customer__customer_id' ,  'customer__name', 'product', 'start_date', 'end_date', 'users'))



        return JsonResponse({'sub_list': sub_list})


