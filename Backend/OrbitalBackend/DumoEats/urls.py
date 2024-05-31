from django.urls import path
from .views import MyObtainTokenPairView, RegisterView
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    # path('',views.index, name='index'),
    # path('add/', views.add_person),
    # path('show/', views.get_all_persons),
    # path('delete', views.delete_person)
    path('auth/login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('auth/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    # path('login/', views.login_view),
    # path('logout/', views.logout_view),
    # path('signup/', views.signup_view),
]