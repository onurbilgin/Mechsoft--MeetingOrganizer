# Generated by Django 3.2.7 on 2022-08-22 14:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meetingApp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meeting',
            old_name='id',
            new_name='meetingid',
        ),
    ]
