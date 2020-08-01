# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into three parts:
1. [The Simple Frontend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. [Covered in the course]
2. [The RestAPI Backend](https://github.com/udacity/cloud-developer/tree/master/course-02/exercises/udacity-c2-restapi), a Node-Express server which can be deployed to a cloud service. [Covered in the course]
3. [The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code), the final project for the course. It is a Node-Express application which runs a simple script to process images. [Your assignment]

## Tasks

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Create a new endpoint in the server.ts file

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query parameter to download an image from a public URL, filter the image, and return the result.

We've included a few helper functions to handle some of these concepts and we're importing it for you at the top of the `./src/server.ts`  file.

```typescript
import {filterImageFromURL, deleteLocalFiles} from './util/util';
```

### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

#### Project URL
`http://image-filter-dev-dev.us-west-2.elasticbeanstalk.com/`
#### Endpoint URL
`http://image-filter-dev-dev.us-west-2.elasticbeanstalk.com/filteredimage`
###### example
`http://image-filter-dev-dev.us-west-2.elasticbeanstalk.com/filteredimage?image_url=https://www.autotrader.co.uk/used-cars/images/static/value-proposition/VauxhallCorsa@1.5x.png`
#### Deploying steps
##### Config the environment
- Initializes your directory with the EB CLI `eb init`
![image info](./deployment_screenshot/1_eb_init.png)

- Choosing application name
![image info](./deployment_screenshot/2_application_name.png)

- Select the platform
![image info](./deployment_screenshot/3_select_platform.png)

- select code commit and ssh key pair
![image info](./deployment_screenshot/4_codeCommit_select_keypair.png)

- Update the config with deploy artifact to use our Archive.zip directory
![image info](./deployment_screenshot/5_add_deploy_artifact.png)

##### build the project using `NPM`
- `npm run build` 
![image info](./deployment_screenshot/6_build_project.png)


##### Creates a new environment
- Creates environment
![image info](./deployment_screenshot/7_eb_create.png)

##### Validate that the project deployed on `Elastic Beanstalk`
![image info](./deployment_screenshot/8_project_deployed_successfully_on_elastic_beanstalk.png)

##### Testing the endpoint using `Postman`
- Sending image_url param to the endpoint
`http://image-filter-dev-dev.us-west-2.elasticbeanstalk.com/filteredimage?image_url=`
![image info](./deployment_screenshot/10_testing_deployed_project_success_scenario(200)_postman.png)

- Not sending image_url param to the endpoint
![image info](./deployment_screenshot/9_testing_deployed_project_failure_scenario(422)_postman.png)