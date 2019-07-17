mkdir -p images
mkdir -p output
aws s3 sync "s3://gsieling-images-bucket/9CE3642D-B516-6BE9-9B07-22E0E6B62616 (1) (1).webm" images/
docker run --rm -it -v $(pwd)/images:/images -v $(pwd)/output:/output garysieling/micmac 
