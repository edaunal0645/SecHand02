from django.contrib import admin
from .models import Product, Sale, UserProfile, Order, OrderItem
import requests
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'sold', 'created_at')
    search_fields = ('title',)
    list_filter = ('sold',)

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'sold_at')
    list_filter = ('sold_at',)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'birth_date', 'phone', 'address')
    search_fields = ('user__username', 'full_name', 'phone')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'order_date', 'status')
    list_filter = ('status', 'order_date')
    search_fields = ('user__username',)

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity')

def send_sms(phone, message):
    # Örnek: Twilio veya Netgsm API ile SMS gönderimi
    api_url = "https://api.smsprovider.com/send"
    api_key = "API_KEY"
    payload = {
        "to": phone,
        "message": message,
        "api_key": api_key
    }
    response = requests.post(api_url, data=payload)
    return response.status_code == 200

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, full_name=instance.username)
    instance.userprofile.save()

def send_order_confirmation(user_email, order):
    subject = "Siparişiniz Alındı"
    message = f"Sayın {order.user.userprofile.full_name}, siparişiniz başarıyla alındı!"
    send_mail(subject, message, None, [user_email])
