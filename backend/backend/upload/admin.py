from django.contrib import admin

from .models import *


class AttributeAdmin(admin.ModelAdmin):
    search_fields = ['Attribute', "Attribute_Description", "Attribute_Tooltip"]
    
class DataPointsVisitAdmin(admin.ModelAdmin):
    search_fields = ["ATTRIBUTE"]


admin.site.register(DatamodelSource)
admin.site.register(DatamodelUnit)
admin.site.register(DatamodelAttribute, AttributeAdmin)
admin.site.register(DatamodelCode)
admin.site.register(DatamodelAttributeMapping)
admin.site.register(DatamodelCodeMapping)
admin.site.register(DataPointsVisit, DataPointsVisitAdmin)
admin.site.register(UserFile)
