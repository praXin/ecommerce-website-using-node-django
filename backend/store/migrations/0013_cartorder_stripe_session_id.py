# Generated by Django 5.0.7 on 2024-10-21 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0012_cartorderitem_coupon'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartorder',
            name='stripe_session_id',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
