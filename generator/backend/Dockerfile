FROM python:3.11-bullseye

WORKDIR /app

# Ensure gcc is present and runtime for cpp
# RUN apt-get install -y gcc
#
# COPY ./Wizium .
#
# RUN cd ./Wizium/cmake && cmake ../Sources/ && make && make install && cd ../..

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY ./src .

COPY ./libWizium.so .

COPY entrypoint.sh .

CMD ["./entrypoint.sh"]
