from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http.response import FileResponse, JsonResponse
import pandas as pd
import uuid


#############################################
## Dummy method to start with for @bradley ##
#############################################



@api_view(["POST"])
def extract_datamodel(request):
    data = request.data
    random_id = uuid.uuid1()
    df = pd.DataFrame(columns=["test", "test1"])

    ##################################################
    ## Here you can do the datamodel stuff in padas ##
    ##################################################




    #########################################################
    ## Here the file gets written to disk and the returned ##     
    ## from the  server as a FILE-RESPONSE                 ##
    #########################################################
    df.to_excel("data/datamodel_extracted_" + random_id, index=False)
    return FileResponse(open('data/datamodel_extracted_' + random_id, 'rb'))