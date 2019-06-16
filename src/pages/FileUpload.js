import React from 'react';

import AWS from 'aws-sdk';

const bucketName = '';
const bucketRegion = '';
const IdentityPoolId = '';

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

function upload(tag) {
  return () => {
    const files = document.getElementById('photoupload').files;
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    const file = files[0];
    const fileName = file.name;

    const fileKey = tag + "/" + fileName;
    s3.upload({
      Key: fileKey,
      Body: file,
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
TODO: take the video file as an arg
TODO: upload it
TODO: take the tags as args and apply them on S3
TODO: transfer acceleration
TODO: signed urls
TODO: make sure this is authenticated correctly
TODO: how to put secrets in this page securely
*/
export default ({tag}) => (
    <div>
        <input id="photoupload" type="file" accept="image/*"></input>
        <button onClick={upload(tag)}>Upload</button>
    </div>
)