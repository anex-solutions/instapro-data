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
                        echo 'Build :latest'
                    } else {
                        echo 'Build :testing'
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
