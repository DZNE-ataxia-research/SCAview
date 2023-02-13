




export SCA_VIEW_EAV_PATH=/Users/wegnerp/Desktop/git/ataxia-research/SCAview/backend/scripts/eav_with_inas_count.pickle
export SCA_VIEW_DMODEL_PATH=../dmodels/Datamodel_reduced.xlsx
PORT=8001
export SCA_VIEW_PATH=$PORT
export SCA_VIEW_DEBUG=FALSE
export SCA_VIEW_BASE_PATH=clinical-backend/
export SCA_VIEW_PROD_URL=https://idsn.dzne.de/$SCA_VIEW_BASE_PATH
python manage.py runserver 0.0.0.0:$PORT


