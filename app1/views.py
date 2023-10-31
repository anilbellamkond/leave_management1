from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from . models import Employee,Leave_Request
from django.http import HttpResponse
from django.core.mail import send_mail 





def view_record_update_status(request,id,pk):
    employ_details = Employee.objects.get(id=pk)
    record_details = Leave_Request.objects.get(id=id)
    if request.method == "POST":
        status = request.POST.get('status')
        if status == "Approve":
           record_details.status = 'Approved'
           record_details.save()
           send_mail(
                        "Leave Approved",
               'Take a leave ',
        'anilbellamkonda8@gmail.com',
        [record_details.employee.email],
        fail_silently=False,
          )
           
        else :
            record_details.status = 'Rejected'
            record_details.save() 
            send_mail(
                        "Leave Rejected",
               'Sorry ',
        'anilbellamkonda8@gmail.com',
        [record_details.employee.email],
        fail_silently=False,
            )
        
        return pending_request(request,pk)
    return render(request,'register/view_update.html',{'record_details':record_details,'employ_details':employ_details})






k=0
@csrf_exempt
@login_required
def employee(request,id):
    employ_detail = Employee.objects.get(id=id)
    print(employ_detail.full_name)
    return render(request,'register/employ.html',{'employ_detail':employ_detail})

@login_required
def admins(request,id):
    pending_request = Leave_Request.objects.filter(status='pending')
    approved_request = Leave_Request.objects.filter(status='Approved')
    rejected_request = Leave_Request.objects.filter(status='Rejected')
    a = approved_request.count() 
    r = rejected_request.count()
    p = pending_request.count()
    employ_detail = Employee.objects.get(id=id)
    return render(request,'register/admin.html/',{'employ_detail':employ_detail,'p':p,'a':a,'r':r})
 
@login_required
def pending_request(request,id):
    pending_request = Leave_Request.objects.filter(status='pending')
    employ_detail = Leave_Request.employee
    employ_details = Employee.objects.get(id=id)
    return render(request,'register/prequest.html',{'pending_request':pending_request,'id':id,'employ_details':employ_details})
@login_required
def approved_request(request,id):
    approved_request = Leave_Request.objects.filter(status='Approved').order_by('-created_at')
    employ_details = Employee.objects.get(id=id)
    return render(request,'register/arequest.html',{'approved_request':approved_request,'id':id,'employ_details':employ_details}) 
@login_required
def rejected_request(request,id):
    rejected_request = Leave_Request.objects.filter(status='Rejected').order_by('-created_at')
    employ_details = Employee.objects.get(id=id)
    return render(request,'register/Rrequest.html',{'rejected_request':rejected_request,'id':id,'employ_details':employ_details})



     
@login_required
def leave_request(request,pk):
    
    employ_detail = Employee.objects.get(id=pk) 
    id = employ_detail.id
    if request.method=="POST":
        employee = Employee.objects.get(id=pk)
        full_name = request.POST.get('employee_name')
        leave_type = request.POST.get('leave_type')
        print(leave_type) 
        from_date = request.POST.get('from_date')
        to_date = request.POST.get('to_date')
        reason = request.POST.get('reason') 
        file = request.FILES.get('file')
         
        leave_req = Leave_Request.objects.create(employee=employee,
                                                 full_name= full_name,
                                                 leave_type=leave_type,
                                                 start_date=from_date,
                                                 end_date=to_date,
                                                 reason = reason,
                                                 file =file,
                                                 status = 'pending')
        
        
        return render(request,'register/employ.html',{'employ_detail':employ_detail})

    
    return render(request,'register/leave_request.html',{'pk':pk,'employ_detail':employ_detail})


@login_required
def leave_history(request,pk):
    employ_detail = Employee.objects.get(id=pk) 

    leave_record = Leave_Request.objects.filter(employee=pk).order_by('-created_at')
    
    return render(request,'register/leave_history.html',{'pk':pk,'employ_detail':employ_detail,'leave_record':leave_record})




def logins(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        print(email)
        user = authenticate(request,email=email,password=password) 
        if user is not None:
            login(request,user)
            if user.is_superuser:
                employ_details = Employee.objects.get(email=email)
                return redirect('admins', employ_details.id)
            else :
                employ_details = Employee.objects.get(email=email)
                print(employ_details.id)
                return redirect('employ', employ_details.id)
      

    return render(request, 'register/login.html')

def user_logout(request):
    auth.logout(request)
    return redirect("logins")

    