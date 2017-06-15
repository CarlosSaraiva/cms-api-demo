# CMS-API-DEMO

Simple CMS API for the challenge proposed by the guys from 'Just Digital' https://github.com/justdigital/desafios/blob/master/cms/README.md.

## Requirements for this project

* Git
* Any device running Docker/Docker Compose

## How to run:

1. First clone this project:
  >`git clone https://github.com/CarlosSaraiva/cms-api-demo.git`

2. Run docker compose:
  >`docker-compose up`

## Services:

After docker prepare all the images and containers, it will start two containers: one that will serving a Mongo DB and another serving  CMS-Api-Demo (Node.js).
Mongo DB will be running at the port: **2707**.
CMS-Api-Demo at the port **3000**.

## API endpoints:

You can render this list on this path: http://localhost:3000

Method | Endpoint | Details
------ | -------- | -------
GET | /api/v1/posts | Get all posts
GET | /api/v1/post/:id | Get a post by id
POST | /api/v1/post/:id | Create a new blog post
PUT | /api/v1/post/:id | Update a blog post by id
DELETE | /api/v1/post/:id | Delete a post by id
