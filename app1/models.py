from django.db import models
import datetime 
from django.utils import timezone



class Employee(models.Model):

    full_name = models.CharField(max_length=100) 

    role = models.CharField(max_length=200)    

    Project_name = models.CharField(max_length=200)

    email = models.CharField(max_length=255)

    address = models.CharField(max_length=300) 

    creation_date = models.DateTimeField(auto_now_add=True,) 

    casual_leave_entitlement = models.IntegerField(default=10)

    def total_leave_days(self, leave_type):
        total_days = 0
        leave_requests = Leave_Request.objects.filter(employee=self, leave_type=leave_type, status='Approved')
        for leave_request in leave_requests:
            total_days += leave_request.get_duration_in_days()
        return total_days 
    
    def total_casual_leave_days(self):
        return self.total_leave_days('Casual Leave')
    
    def total_sick_leave_days(self):
        return self.total_leave_days('Sick Leave') 
    
    def total_emergency_leave_days(self):
        return self.total_leave_days('Emergency Leave') 
    
    def total_leaves_taken(self):
        return self.total_casual_leave_days()+self.total_sick_leave_days()+self.total_emergency_leave_days()
    
    def remaining_casual_leave(self):
        total_casual_leave_taken = self.total_leave_days('Casual Leave')
        casual_leave_entitlement = self.casual_leave_entitlement
        return casual_leave_entitlement - total_casual_leave_taken



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
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_duration_in_days(self):
        if self.start_date and self.end_date:
            duration = self.end_date - self.start_date
            return duration.days
        else:
            return None