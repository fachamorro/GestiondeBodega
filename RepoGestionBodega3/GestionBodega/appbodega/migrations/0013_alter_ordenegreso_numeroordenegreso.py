# Generated by Django 3.2.5 on 2022-11-10 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appbodega', '0012_alter_ordencompra_numeroordencompra'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordenegreso',
            name='numeroOrdenEgreso',
            field=models.IntegerField(null=True, unique=True),
        ),
    ]
