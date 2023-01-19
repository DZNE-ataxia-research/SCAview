export SCA_VIEW_EAV_PATH=../data/virtual_cohort.pkl
export SCA_VIEW_DMODEL_PATH=../dmodels/Datamodel_reduced.xlsx
PORT=8001
export SCA_VIEW_PATH=$PORT
SCA_VIEW_PROD_URL=http://idsn.dzne.de/clinical-backend/
python manage.py runserver 0.0.0.0:$PORT


