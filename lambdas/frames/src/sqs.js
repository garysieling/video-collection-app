import AWS from 'aws-sdk';
import _ from 'lodash';

export async function queueCompletedMessage(message) {
    const sqs = new AWS.SQS();
  
    const data = await sqs.listQueues({QueueNamePrefix: 'VideosToIndex'}).promise();
    const { QueueUrls } = data;

    return sqs.sendMessage({
      MessageBody: message,
      QueueUrl: QueueUrls[0]
    }).promise();
  }