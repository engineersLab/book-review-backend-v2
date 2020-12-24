To create a docker image for deployment
Install the docker cli in server
Go to the project directory and run the below command to build docker image
$ docker build -t book-review-backend .
To deploy the built image run the below command
$ docker run -it -p 3000:8080 book-review-backend
