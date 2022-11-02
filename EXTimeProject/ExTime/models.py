from django.db import models

class User(models.Model):
    user_name = models.CharField(unique=True, max_length=50)
    icon = models.CharField(max_length=200,blank=True)
    email = models.CharField(unique=True, max_length=200)
    password = models.CharField(max_length=50)
    is_seller = models.IntegerField(db_column='is-seller')  # Field renamed to remove unsuitable characters.

    class Meta:
        db_table = 'user'


class Developer(models.Model):
    dev_name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True, null=True)
    icon = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'developer'


class Games(models.Model):
    game_name = models.CharField(max_length=50)
    developer = models.ForeignKey(Developer, models.DO_NOTHING, db_column='developer')
    icon = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        db_table = 'games'





class Service(models.Model):
    game = models.ForeignKey(Games, models.DO_NOTHING, db_column='gameid', related_name="services")
    service_name = models.CharField(max_length=50)
    user = models.ForeignKey('User', models.DO_NOTHING, db_column='author')
    amount = models.IntegerField()
    price = models.IntegerField()
    description = models.TextField(max_length=1000, blank=True, null=True)
    type = models.ForeignKey('Servicetype', models.DO_NOTHING, db_column='type')

    class Meta:
        db_table = 'service'


class Reviews(models.Model):
    serviceid = models.ForeignKey('Service', models.DO_NOTHING, db_column='serviceid')
    user_id = models.ForeignKey('User', models.DO_NOTHING, db_column='userid')
    theme = models.CharField(max_length=50)
    review_text = models.TextField(db_column='review text', max_length=1000)  # Field renamed to remove unsuitable characters.
    rating = models.IntegerField()

    class Meta:
        db_table = 'reviews'


class Reviewscreenshot(models.Model):
    reviewid = models.ForeignKey(Reviews, models.DO_NOTHING, db_column='reviewid')
    pic_name = models.CharField(max_length=500)

    class Meta:
        db_table = 'reviewscreenshot'


class Servicescreenshot(models.Model):
    serviceid = models.ForeignKey(Service, models.DO_NOTHING, db_column='serviceid')
    pic_name = models.CharField(max_length=500)

    class Meta:
        db_table = 'servicescreenshot'


class Servicetype(models.Model):
    typename = models.CharField(max_length=50)

    class Meta:
        db_table = 'servicetype'
# Create your models here.
