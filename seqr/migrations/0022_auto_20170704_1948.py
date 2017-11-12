# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-04 19:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seqr', '0021_dataset_dataset_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dataset',
            name='dataset_id',
            field=models.TextField(blank=True, db_index=True, null=True),
        ),
        migrations.AlterField(
            model_name='sample',
            name='sample_id',
            field=models.TextField(db_index=True),
        ),
    ]