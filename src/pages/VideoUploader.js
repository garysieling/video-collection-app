import React from 'react';

import AWS from 'aws-sdk';

const bucketName = 'video-player-s3bucket-1qg8yyxbt0cke';
const bucketRegion = 'us-east-1';
const IdentityPoolId = 'IDENTITY_POOL_ID';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: bucketName}
});

/*
TODO: take the video file as an arg
TODO: upload it
TODO: take the tags as args and apply them on S3
TODO: transfer acceleration
TODO: signed urls
TODO: make sure this is authenticated correctly
TODO: how to put secrets in this page securely
*/
export default () => (
    <div>
        <button>Upload</button>
    </div>
)