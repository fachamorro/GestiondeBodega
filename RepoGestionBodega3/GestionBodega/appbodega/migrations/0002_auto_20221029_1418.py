# Generated by Django 3.2.5 on 2022-10-29 14:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appbodega', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itemordenegreso',
            name='ordenCompra',
        ),
        migrations.AddField(
            model_name='itemordenegreso',
            name='ordenEgreso',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='appbodega.ordenegreso'),
        ),
    ]