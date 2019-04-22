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
                        sh "docker build -t localhost:5000/instapro_data:latest ."
                        sh "docker push localhost:5000/instapro_data:latest"
                    } else {
                        sh "docker build -t localhost:5000/instapro_data:testing ."
                        sh "docker push localhost:5000/instapro_data:testing"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        echo 'deploy app:latest to k8s ascess at latest.anex-solutions.co.uk/instapro'
                        kubernetesDeploy configs: "k8s/*.yaml", kubeconfigId: 'kmaster'
                    } else {
                        echo 'deploy app:latest with data-ms swapped to :testing to k8s ascess at testing.anex-solutions.co.uk/instapro-' + env.BRANCH_NAME
                    }
                }
            }
        }
    }
}