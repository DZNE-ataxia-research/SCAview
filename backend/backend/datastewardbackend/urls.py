from django.urls import include, path
from . import views


urlpatterns = [
    path('upload/datamodel', views.datamodel_upload),
    path('upload/datapoints', views.datapoints_upload),
    path('get/attributes/all', views.get_attr),
    path('get/attributes/all/json', views.get_attributes_all_json),
    path('get/sources/all/json', views.get_sources_all_json),
    path('get/attribute-mappings/all/json', views.get_attribute_mappings_all_json),
    path('get/sources/all', views.get_sources),
    path('get/attribute-mappings/all', views.get_attr_mappings),
    path('get/codes/all', views.get_all_codes),
    path("get/code-mappings/all", views.get_all_code_mappings),
    path("get/calculations/all", views.get_all_calulations),
    path('get/attribute', views.get_attr_information),
    path('post/attribute', views.post_create_attr),
    path('post/mapping', views.post_create_mapping),
    path('get/datamodel-file', views.get_datamodel_as_excel),
    path('post/source', views.post_create_src),
    path('get/fulltext', views.get_fulltext),
    path('get/check-attr', views.check_attr_exists),
    path('get/attribute-mapping', views.get_attr_mapping_info),
    path('post/semantic-asset', views.post_semantic_asset),
    path('get/semantic-assets-all', views.get_sematic_assets_all),
    path('get/owl', views.get_owl),
    path('post/owl', views.post_owl_file),
    path('post/measurement', views.post_measurement),
    path('post/code', views.post_create_code),
    path('get/units', views.get_units_all),
    path('post/unit', views.post_create_unit),
    path('get/cache', views.get_chache_by_id)
]