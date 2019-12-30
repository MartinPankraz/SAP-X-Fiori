FROM nginx

#Install git
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git
#Clone repos from GitHub
RUN git clone https://github.com/MartinPankraz/SAP-X-Fiori.git
#Copy contents of UI5 app to NGINX html folder to serve
COPY webapp /usr/share/nginx/html