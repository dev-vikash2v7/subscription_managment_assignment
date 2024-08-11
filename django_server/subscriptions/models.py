from django.db import models

class Customer(models.Model):
    customer_id = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=50)
    pan = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    product_name = models.CharField(max_length=50, primary_key=True)
    description = models.CharField(max_length=200)
    annual_cost = models.FloatField()

    def __str__(self):
        return self.product_name

class Subscription(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    users = models.IntegerField()

    def __str__(self):
        return f"{self.customer} - {self.product}"
