set -e

aws cloudformation validate-template --template-body file://cloudformation.yaml 
aws cloudformation create-stack --stack-name video-player --template-body file://cloudformation.yaml 
#aws cloudformation update-stack --stack-name video-player --template-body file://cloudformation.yaml 

