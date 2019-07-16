import React from 'react';

import AWS from 'aws-sdk';

const bucketName = '';
const bucketRegion = '';

// From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function generateGuid() {
  let result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j == 8 || j == 12 || j == 16 || j == 20) 
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}


AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: '',
  })
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: bucketName}
});

function upload(tag, recordedBlobs) {
  return () => {
    const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});

    const fileKey = tag + "/" + generateGuid() + ".webm";
    s3.upload({
      Key: fileKey,
      Body: superBuffer,
      ACL: 'public-read'
    }, function(err, data) {
      if (err) {
        return alert('There was an error uploading your file: ' + err + ' ' + data);
      }
      alert('Successfully uploaded.');
    });   
  }
}

/*
TODO: transfer acceleration
TODO: signed urls
TODO: make sure this is authenticated correctly
TODO: how to put secrets in this page securely
*/
export default ({tag, recordedBlobs}) => (
  <button onClick={upload(tag, recordedBlobs)}>Upload</button>
)