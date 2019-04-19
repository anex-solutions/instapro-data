pipeline {
    agent any

    stages {
        stage('test') {
            steps {

                echo 'add tests..'
            }
        }
        stage('Build Image') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        sh "npm install \n
                            npm test \n
                            docker build -t localhost:5000/instapro_data:latest . \n
                            docker push localhost:5000/instapro_data:latest"
                    } else {
                        sh "npm install \n
                            npm test \n
                            docker build -t localhost:5000/instapro_data:testing . \n
                            docker push localhost:5000/instapro_data:testing"
                    }
                }
            }
        }
        // docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD
        stage('Deploy') {
            steps {
                    if (env.BRANCH_NAME == 'master') {
                        echo 'deploy app:latest to k8s ascess at latest.anex-solutions.co.uk/instapro'
                    } else {
                        echo 'deploy app:latest with data-ms swapped to :testing to k8s ascess at testing.anex-solutions.co.uk/instapro-' + env.BRANCH_NAME
                    }
                }
            }
        }
    }
}
