import json 
from upload.models import DatamodelAttribute





_list = []

def xstr(s):
    return '' if s is None else s

for attr in DatamodelAttribute.objects.all():
    _list.append({'topic': xstr(attr.Topic), 'topicDescription': xstr(attr.Topic_Description), 'umbrella': xstr(attr.Umbrella),'umbrellaDescription': xstr(attr.Umbrella_Description), 'attribute': xstr(attr.Attribute), 'attributeDescription': xstr(attr.Attribute_Description), 'attributeTooltip': xstr(attr.Attribute_Tooltip), 'datatype': xstr(attr.Datatype), 'domain': xstr(attr.Domain), 'unit': xstr(attr.Unit.Unit)})

with open("attributes.json", "w") as outfile:  
    json.dump(_list, outfile) 


