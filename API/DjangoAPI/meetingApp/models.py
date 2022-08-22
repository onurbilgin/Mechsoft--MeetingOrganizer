from django.db import models

# Create your models here.

class Meeting(models.Model):
    meetingid = models.BigAutoField(primary_key=True, auto_created=True)
    subject = models.CharField(max_length=255, null=True)
    date = models.DateField(auto_now=False, auto_now_add=False, null=True)
    start = models.CharField(max_length=255, null=True)
    end = models.CharField(max_length=255, null=True)
    participants = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f" {self.subject} {self.date} {self.start} {self.end} {self.participants}"