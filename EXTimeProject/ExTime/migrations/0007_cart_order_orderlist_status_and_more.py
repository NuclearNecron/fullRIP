# Generated by Django 4.1.2 on 2022-11-24 01:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ExTime', '0006_rename_developer_id_games_developer_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
            ],
            options={
                'db_table': 'cart',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'order',
            },
        ),
        migrations.CreateModel(
            name='orderlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField()),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='ExTime.order')),
            ],
            options={
                'db_table': 'orderlist',
            },
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'status',
            },
        ),
        migrations.RenameField(
            model_name='service',
            old_name='gameid',
            new_name='game',
        ),
        migrations.RenameField(
            model_name='service',
            old_name='type_id',
            new_name='type',
        ),
        migrations.RenameField(
            model_name='service',
            old_name='user_id',
            new_name='user',
        ),
        migrations.DeleteModel(
            name='Reviewscreenshot',
        ),
        migrations.AddField(
            model_name='orderlist',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='ExTime.service'),
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='ExTime.status'),
        ),
        migrations.AddField(
            model_name='order',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='ExTime.user'),
        ),
        migrations.AddField(
            model_name='cart',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='ExTime.service'),
        ),
        migrations.AddField(
            model_name='cart',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='ExTime.user'),
        ),
    ]