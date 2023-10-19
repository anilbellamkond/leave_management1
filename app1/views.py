from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from . models import Employee,Leave_Request
from django.http import HttpResponse
from django.contrib import messages




k=0
@csrf_exempt
@login_required
def employee(request,id):
    employ_detail = Employee.objects.get(id=id)
    print(employ_detail.full_name)
    return render(request,'register/employ.html',{'employ_detail':employ_detail})

@login_required
def admins(request):
    return HttpResponse("welcome to admin page") 



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
        file = request.POST.get('file')
          
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



def leave_history(request,pk):
    employ_detail = Employee.objects.get(id=pk) 

    leave_record = Leave_Request.objects.filter(employee=pk)
    for i in leave_record:
        print(i)
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
                return admins(request)
            else :
                employ_details = Employee.objects.get(email=email)
                return employee(request,employ_details.id)
      

    return render(request, 'register/login.html')

def user_logout(request):
    auth.logout(request)
    return redirect("logins")

    