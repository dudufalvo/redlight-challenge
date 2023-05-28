from rest_framework import serializers
from applicants.models import Applicant, Role, ApplicantRole

class ApplicantsSerializer(serializers.ModelSerializer):
    class Meta:
        model= Applicant
        fields = '__all__'

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model= Role
        fields = '__all__'

class ApplicantRoleSerializer(serializers.ModelSerializer):
    applicant = ApplicantsSerializer(read_only=True)
    role = RolesSerializer(read_only=True)

    class Meta:
        model= ApplicantRole
        fields = ['applicant', 'role', 'status', 'id']
