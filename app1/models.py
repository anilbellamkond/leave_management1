from django.db import models
import datetime 



class Employee(models.Model):

    full_name = models.CharField(max_length=100) 

    role = models.CharField(max_length=200)    

    Project_name = models.CharField(max_length=200)

    email = models.CharField(max_length=255)

    address = models.CharField(max_length=300) 

    creation_date = models.DateTimeField(auto_now_add=True) 


LEAVE_TYPE_CHOICES = (
    ('Sick Leave', 'Sick Leave'),
    ('Emergency Leave', 'Emergency Leave'),
    ('Casual Leave', 'Casual Leave'),
)


class Leave_Request(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    leave_type = models.CharField(max_length=255, choices=LEAVE_TYPE_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField()  
    duration = models.IntegerField(blank=True, null=True)
    reason = models.TextField()  
    file = models.FileField(upload_to='uploads/')
    status = models.CharField(max_length=255, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    