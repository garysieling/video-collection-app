python /opt/dpg/pipeline.py --input /images --output /output --sfm-type incremental --run-openmvg --flength 28
python /opt/dpg/pipeline.py --input /images --output /output --sfm-type global --run-openmvs --flength 28 --dpreset ULTRA --debug
