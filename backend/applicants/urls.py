from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from applicants.api import viewsets
from django.conf.urls.static import static
from django.conf import settings


app_name = 'applicants'

urlpatterns = [
    path('', viewsets.get_routes),
    path('applicants/', viewsets.applicants_list),
    path('applicants/<int:id>/', viewsets.applicant),
    path('roles/', viewsets.roles_list),
    path('roles/<int:id>', viewsets.role),
    
    path('status/', viewsets.approles_list, name='applicant_roles'),
    path('status/<int:id>/', viewsets.approle, name='applicant_role_detail')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)