echo "Building Clinical Backend image...\n"

docker build -t idsn-clinical-backend .

echo "Running Clinical Backend image...\n"

docker run -it -d --name clinical-backend-2 -p 8001:8001 --network idsn_container_network -v $(pwd)/uploaded_data:/etc/django_clinical/uploaded_data -v $(pwd)/viewer/settings.py:/etc/django_clinical/viewer/settings.py idsn-clinical-backend:latest 
