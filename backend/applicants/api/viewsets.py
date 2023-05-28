from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView
from applicants.api.serializers import ApplicantsSerializer, RolesSerializer, ApplicantRoleSerializer
from applicants.models import Applicant, Role, ApplicantRole
import json


# routes view
@api_view(['GET'])
def get_routes(request, format=None):
    '''view that returns all the routes of the api'''
    routes = [
        'applicants: http://127.0.0.1:8000/api/applicants/',
        'roles: http://127.0.0.1:8000/api/roles/'
    ]
    return Response(routes)

# applicants views
@api_view(['GET', 'POST'])
def applicants_list(request, format=None):
    ''' view that gives us the possibility of get a 
        list of all applicants and/or add new ones '''

    if request.method == 'GET':
        # get all the applicants on the data base and serialize the data to return it
        applicant=Applicant.objects.all()
        serializer=ApplicantsSerializer(applicant, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        # create a new applicant and serialize it manually due to the many to many relationship

        roles_json = request.data.get('roles', '[]')
        roles = json.loads(roles_json)

        new_applicant = Applicant.objects.create(
            name=request.data['name'],
            phone_number=request.data['phone_number'],
            email=request.data['email'],
            avatar=request.data['avatar']
        )

        new_applicant.save()

        for role in roles:
            role_object = Role.objects.get(name=role['name'])
            new_applicant.roles.add(role_object, through_defaults={'status': role['status']})

        serializer = ApplicantsSerializer(new_applicant)
        
        # verifies if the serialized data is valid and, if yes, save it
        try:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
def applicant(request, id, format=None):
    ''' view that manipulates a specific applicant, selected by it's id,
        in a way that is possible to get it's data, update or delete it'''

    # verifies if the applicant exists through it's id and return a 404 ERROR if not
    try:
        applicant = Applicant.objects.get(pk=id)
    except Applicant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # serialize the applicant and returns it's data
        serializer = ApplicantsSerializer(applicant)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        # updates the data of an existing apaplicant and verifies if it still valid
        serializer = ApplicantsSerializer(applicant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # delete the applicant and returns a no content error
        applicant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# roles views 
@api_view(['GET', 'POST'])
def roles_list(request, format=None):
    ''' view that gives us the possibility of get a 
        list of all roles and/or add new ones '''

    if request.method == 'GET':
        # get all the roles on the data base and serialize the data to return it
        role=Role.objects.all()
        serializer=RolesSerializer(role, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        # create a new role and serialize it
        serializer=RolesSerializer(data=request.data)
        
        # verifies if the serialized data is valid and, if yes, save it
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
def role(request, id, format=None):
    ''' view that manipulates a specific role, selected by it's id,
        in a way that is possible get it's data, update or delete it'''

    # verifies if the role exists through it's id and return a 404 ERROR if not
    try:
        role = Role.objects.get(pk=id)
    except Role.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # serialize the role and returns it's data
        serializer = RolesSerializer(role)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        # updates the data of an existing role and verifies if it still valid
        serializer = RolesSerializer(role, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # delete the role and returns a no content error
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# approles views 
@api_view(['GET', 'POST'])
def approles_list(request, format=None):
    ''' view that gives us the possibility of get a 
        list of all approles and/or add new ones '''

    if request.method == 'GET':
        # get all the roles on the data base and serialize the data to return it
        applicant_roles = ApplicantRole.objects.all()
        serializer = ApplicantRoleSerializer(applicant_roles, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        # create a new role and serialize it
        
        applicant_role = ApplicantRole.objects.create(applicant=applicant, role=role, status=status)
        serializer = ApplicantRoleSerializer(applicant_role)
        
        # verifies if the serialized data is valid and, if yes, save it
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PATCH', 'DELETE'])
def approle(request, id, format=None):
    ''' view that manipulates a specific role, selected by it's id,
        in a way that is possible get it's data, update or delete it'''

    # verifies if the role exists through it's id and return a 404 ERROR if not
    try:
        applicant_roles = ApplicantRole.objects.get(pk=id)
    except ApplicantRole.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # serialize the role and returns it's data
        serializer = ApplicantRoleSerializer(applicant_roles)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        # updates the data of an existing role and verifies if it still valid
        serializer = ApplicantRoleSerializer(applicant_roles, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # delete the role and returns a no content error
        applicant_roles.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

