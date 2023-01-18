echo "Starting all Services in [django,]..."

apt-get update 
 
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

echo "172.21.20.50 idsn.dzne.de" >> /etc/hosts


python3.8 manage.py migrate
 

python3.8 manage.py runserver 0.0.0.0:8001
#gunicorn -b 0.0.0.0:8001 viewer.wsgi
