from django.contrib import admin
from .models import Meeting
# Register your models here.
class MeetingAdmin(admin.ModelAdmin):
    list_display = ("subject","date","start","end","participants",)
    list_display_links = ("subject","date",)
    search_fields = ("subject","date",)

    
admin.site.register(Meeting, MeetingAdmin)
