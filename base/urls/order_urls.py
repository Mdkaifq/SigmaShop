from django.urls import path
from base.views.order_views import *




urlpatterns = [
    path('', getOrders, name='orders'),
    path('add/', addOrderItems, name='orders-add'),
    path('myorders/', getMyOrders, name='my-orders'),
    path('create-payment-intent/<str:pk>/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('<str:pk>/', getOrderById, name='orders-by-id'),
    path('<str:pk>/pay/', updateOrderPaid, name='pay'),
    path('<str:pk>/deliver/', updateOrderToDelivered, name='delivered'),

]
