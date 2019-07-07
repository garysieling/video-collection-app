import { getFileInformation, download, uploadFolder, deleteObject } from './src/s3';
import { queueCompletedMessage } from './src/sqs';
import { getDestinationBucket, getFfmpegParameters } from './src/env';
import { ffprobe, ffmpeg } from './src/ffmpeg';
 
export const main = async (event, context, callback) => {
  const {eventName, bucket, key} = getFileInformation(event)

  console.log(`Received ${eventName} for item in bucket: ${bucket}, key: ${key}`)

  try {
    const destPath = await download(bucket, key)
    await ffprobe(destPath)
    const outputPath = await ffmpeg(destPath, 'jpg', getFfmpegParameters())
    await uploadFolder(getDestinationBucket(), key, outputPath)

    await queueCompletedMessage(destPath)
  } catch (error) {
    callback(error)
  }

}

export const completed = () => queueCompletedMessage('test');