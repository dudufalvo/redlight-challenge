from django.db import models

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Role(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Applicant(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    #avatar = models.CharField(max_length=100)
    roles = models.ManyToManyField(Role, through='ApplicantRole')

    def __str__(self):
        return self.name


class ApplicantRole(models.Model):
    APPLICANT_STATUS_CHOICES = [
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
        ('Under Analysis', 'Under Analysis'),
    ]
    applicant = models.ForeignKey(Applicant, on_delete=models.CASCADE, related_name='applicant_role')
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='applicant_role')
    status = models.CharField(max_length=20, choices=APPLICANT_STATUS_CHOICES)

    def __str__(self):
        return f"{self.applicant.name} - {self.role.name} - Status: {self.status}"