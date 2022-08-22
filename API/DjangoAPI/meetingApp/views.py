from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from . models import Meeting
from . serializers import MeetingSerializer


# Create your views here.
@csrf_exempt
def meetingApi(request,id=0):
    if request.method=='GET':
        meeting = Meeting.objects.all()
        meeting_serializer = MeetingSerializer(meeting,many=True)
        return JsonResponse(meeting_serializer.data,safe=False)
    elif request.method=='POST':
        meeting_data=JSONParser().parse(request)
        meeting_serializer=MeetingSerializer(data=meeting_data)
        if meeting_serializer.is_valid():
            meeting_serializer.save()
            return JsonResponse("Başarıyla Eklendi!",safe=False)
        return JsonResponse("Eklenirken Hata Oluştu!",safe=False)
    elif request.method=='PUT':
        meeting_data=JSONParser().parse(request)
        meeting=Meeting.objects.get(meetingid=meeting_data['meetingid'])
        meeting_serializer=MeetingSerializer(meeting,data=meeting_data)
        if meeting_serializer.is_valid():
            meeting_serializer.save()
            return JsonResponse("Başarıyla Güncellendi!",safe=False)
        return JsonResponse("Güncelleme Başarısız!")
    elif request.method=='DELETE':
        meeting=Meeting.objects.get(meetingid=id)
        meeting.delete()
        return JsonResponse("Başarıyla Silindi!",safe=False)