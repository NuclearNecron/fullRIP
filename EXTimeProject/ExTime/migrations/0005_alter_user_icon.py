# Generated by Django 4.1.2 on 2022-10-19 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ExTime', '0004_alter_servicetype_typename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='icon',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]