rm -rf images
rm -rf output
mkdir -p images
mkdir -p output
#aws s3 sync "s3://gsieling-images-bucket/9CE3642D-B516-6BE9-9B07-22E0E6B62616 (1) (1).webm" images/
youtube-dl --output "video" https://www.youtube.com/watch?v=GHrw2tgAACI
ffmpeg -i video.mkv -r 25 "images/output_%04d.jpg"
docker build -t garysieling/openmvs .
docker run --rm -it -v $(pwd)/images:/images -v $(pwd)/output:/output garysieling/openmvs

#openMVG_main_ConvertList  -i  /images -o ./out/matches -d ~/openMVG/src/software/SfM/cameraSensorWidth/cameraGenerated.txt
#openMVG_main_SfMInit_ImageListing  -i  /images -o /output/matches 
#openMVG_main_ComputeMatches -i /images -o  ./output/matches
#openMVG_main_IncrementalSfM  -i /images -m ./out/matches -o ./output

#python /opt/dpg/pipeline.py --input /images --output /output --sfm-type incremental --run-openmvg
