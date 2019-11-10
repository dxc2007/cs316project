# Dockerfile

# Pull base image
FROM python:3.6

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /cs316code

# Install dependencies
RUN pip install pipenv
COPY Pipfile Pipfile.lock /cs316code/
RUN pipenv install --system

# Copy project
COPY . /cs316code/
