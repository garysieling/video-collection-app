set -e
set -o xtrace
cd ..

#gatsby build 

cd cf

STACK_NAME=video-player
REGION=us-east-1
UNAUTH_ROLE=$1
AUTH_ROLE=$2

if [ -z $UNAUTH_ROLE ]; then 
  UNAUTH_ROLE="Cognito_Auth0Unauth_Role"
fi

if [ -z $AUTH_ROLE ]; then 
  AUTH_ROLE="Cognito_Auth0Auth_Role"
fi

if [ -z $PASSWORD ]; then 
  PASSWORD=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
fi

# ParameterKey=DomainName,ParameterValue=videoclips.garysieling.com
PARAMETERS="--parameters ParameterKey=UnauthenticatedUserRole,ParameterValue=$UNAUTH_ROLE ParameterKey=AuthenticatedUserRole,ParameterValue=$AUTH_ROLE ParameterKey=DatabasePassword,ParameterValue=$PASSWORD"

aws cloudformation validate-template --template-body file://cloudformation.yaml || exit
#aws cloudformation create-stack --stack-name $STACK_NAME --template-body file://cloudformation.yaml $PARAMETERS
aws cloudformation update-stack --stack-name $STACK_NAME \
  $PARAMETERS \
  --template-body file://cloudformation.yaml || exit

cfn-tail --region $REGION $STACK_NAME

S3_BUCKET=$(aws cloudformation list-stack-resources --stack-name $STACK_NAME \
  | jq '.StackResourceSummaries | .[] | select(.LogicalResourceId | test("^WebsiteBucket$"))' \
  | jq -cr .PhysicalResourceId )
echo $S3_BUCKET

aws s3 sync ../public s3://$S3_BUCKET

echo "http://$S3_BUCKET.s3-website-$REGION.amazonaws.com/"
