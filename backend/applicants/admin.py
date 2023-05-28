from django.contrib import admin

# Register your models here.
from .models import Applicant, Role, ApplicantRole

admin.site.register(Applicant)
admin.site.register(Role)
admin.site.register(ApplicantRole)