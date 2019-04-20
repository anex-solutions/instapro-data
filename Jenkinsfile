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
                        sh "docker build -t localhost:5000/instapro/data:latest ."
                        sh "docker push localhost:5000/instapro/data:latest"
                    } else {
                        sh "docker build -t localhost:5000/instapro/data:${env.BUILD_NUMBER} ."
                        sh "docker image tag localhost:5000/instapro/data:${env.BUILD_NUMBER} localhost:5000/instapro/data:testing"
                        sh "docker push localhost:5000/instapro/data:testing"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
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