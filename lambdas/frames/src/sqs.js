import AWS from 'aws-sdk';

export async function queueCompletedMessage(message) {
    const sqs = new AWS.SQS();
  
    const queueUrl = await sqs.listQueues({QueueNamePrefix: 'VideosToIndex'});
    console.log(queueUrl);

    return sqs.sendMessage({
      MessageBody: message,
      QueueUrl: queueUrl[0]
    }).promise();
  }