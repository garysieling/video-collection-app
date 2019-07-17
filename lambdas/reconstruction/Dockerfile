FROM ubuntu:16.04

#Prepare and empty machine for building:
RUN apt-get update -qq && apt-get install -qq
RUN apt-get -y install build-essential git mercurial cmake libpng-dev libjpeg-dev libtiff-dev libglu1-mesa-dev libxmu-dev libxi-dev

#Eigen (Required)
RUN hg clone https://bitbucket.org/eigen/eigen#3.2 && \
    mkdir eigen_build && cd eigen_build && \
    cmake . ../eigen && \
    make && make install 

#Boost (Required)
RUN apt-get -y install libboost-iostreams-dev libboost-program-options-dev libboost-system-dev libboost-serialization-dev

#OpenCV (Required)
RUN apt-get -y install libopencv-dev

#CGAL (Required)
RUN apt-get -y install libcgal-dev libcgal-qt5-dev

#VCGLib (Required)
RUN git clone https://github.com/cdcseacave/VCG.git vcglib

#Ceres (Required)
RUN apt-get -y install libatlas-base-dev libsuitesparse-dev
RUN git clone https://ceres-solver.googlesource.com/ceres-solver ceres-solver
RUN mkdir ceres_build && cd ceres_build && \
    cmake . ../ceres-solver/ -DMINIGLOG=ON -DBUILD_TESTING=OFF -DBUILD_EXAMPLES=OFF && \
    make -j2 && make install

#GLFW3 (Optional)
RUN apt-get -y install freeglut3-dev libglew-dev libglfw3-dev

#OpenMVS
RUN git clone https://github.com/cdcseacave/openMVS.git openMVS
RUN mkdir openMVS_build && cd openMVS_build && \
    cmake . ../openMVS -DCMAKE_BUILD_TYPE=Release -DVCG_ROOT="/vcglib" && \
    make -j2 && make install
#If you want to use OpenMVS as shared library, add to the CMake command:
#-DBUILD_SHARED_LIBS=ON

#Install OpenMVS library (optional):
ENTRYPOINT bash
