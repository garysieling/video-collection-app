set -e
set -o xtrace
cd ..
#gatsby build 
cd cf

STACK_NAME=video-player
REGION=us-east-1

PARAMETERS="--parameters ParameterKey=DomainName,ParameterValue=videoclips.garysieling.com"

aws cloudformation validate-template --template-body file://cloudformation.yaml || exit
#aws cloudformation create-stack --stack-name $STACK_NAME --template-body file://cloudformation.yaml $PARAMETERS
aws cloudformation update-stack --stack-name $STACK_NAME $PARAMETERS --template-body file://cloudformation.yaml || exit

S3_BUCKET=$(aws cloudformation list-stack-resources --stack-name $STACK_NAME \
  | jq '.StackResourceSummaries | .[] | select(.LogicalResourceId | inside("WebsiteBucket"))' \
  | jq -cr .PhysicalResourceId )
echo $S3_BUCKET

aws s3 sync ../public s3://$S3_BUCKET

echo "http://$S3_BUCKET.s3-website-$REGION.amazonaws.com/"
